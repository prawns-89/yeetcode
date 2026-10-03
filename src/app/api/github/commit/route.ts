import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Map programming languages to their standard file extensions
function getExtension(code: string, language?: string): string {
  if (language) {
    const lang = language.toLowerCase();
    if (lang.includes("c++") || lang === "cpp") return "cpp";
    if (lang.includes("python") || lang === "py") return "py";
    if (lang.includes("javascript") || lang === "js") return "js";
    if (lang.includes("typescript") || lang === "ts") return "ts";
    if (lang.includes("rust") || lang === "rs") return "rs";
    if (lang.includes("go")) return "go";
    if (lang.includes("java")) return "java";
    if (lang.includes("c#") || lang === "cs") return "cs";
  }
  // Guess based on content if language is not provided or custom
  if (code.includes("class Solution:") || code.includes("def ") || code.includes("import ")) {
    return "py";
  }
  if (code.includes("class Solution") || code.includes("#include") || code.includes("vector<") || code.includes("{")) {
    return "cpp";
  }
  return "txt";
}

export async function POST(request: Request) {
  try {
    // 1. Parse request body containing details of the solved snippet
    const body = await request.json();
    const { snippetId, snippetTitle, code, language, netWpm, accuracy } = body;

    if (!snippetId || !code) {
      return NextResponse.json({ error: "Missing snippetId or code content" }, { status: 400 });
    }

    // 2. Fetch GitHub Integration settings from SQLite database
    const settings = await prisma.githubSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings || !settings.enabled || !settings.token) {
      // If integration is not set up or disabled, return early with 200 (noop)
      return NextResponse.json({ success: false, message: "GitHub integration is not enabled" });
    }

    const { token, username, repoName } = settings;
    
    // GitHub API requires a User-Agent header or it will return a 403 Forbidden.
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "YeetCode-Application",
    };

    // 3. Optional Step: Check if the repository exists, and if not, create it!
    console.log(`[GitHub API] Checking repository existence: ${username}/${repoName}`);
    const repoCheckResponse = await fetch(`https://api.github.com/repos/${username}/${repoName}`, { headers });
    
    if (repoCheckResponse.status === 404) {
      console.log(`[GitHub API] Repository not found. Attempting to create: ${repoName}`);
      const createRepoResponse = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: repoName,
          private: true,
          description: "My solutions solved on YeetCode!",
          auto_init: true, // Init with a README so we have a main branch
        }),
      });

      if (!createRepoResponse.ok) {
        const errText = await createRepoResponse.text();
        console.error(`[GitHub API] Failed to automatically create repository: ${errText}`);
        return NextResponse.json({ 
          error: `Could not find or create repository ${repoName}. Make sure your token has 'repo' scopes.` 
        }, { status: 500 });
      }
      
      console.log(`[GitHub API] Repository ${repoName} created successfully.`);
      // Sleep for a second to allow GitHub's backend to finish provisioning the repo
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    // 4. Determine file path and extension
    // E.g., "algorithms/binary-search" becomes "algorithms/binary-search.cpp"
    const extension = getExtension(code, language);
    const path = `${snippetId}.${extension}`;

    // 5. Step 2A: Check if the file already exists on GitHub to obtain its 'sha' hash.
    // If we try to write to an existing file without providing its current 'sha', GitHub returns a 409 Conflict.
    console.log(`[GitHub API] Checking if file exists: ${username}/${repoName}/contents/${path}`);
    const fileCheckResponse = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/contents/${path}`,
      { headers }
    );

    let sha: string | undefined = undefined;
    if (fileCheckResponse.ok) {
      const fileData = await fileCheckResponse.json();
      sha = fileData.sha;
      console.log(`[GitHub API] File exists. Retrieved SHA: ${sha}`);
    } else if (fileCheckResponse.status !== 404) {
      const errText = await fileCheckResponse.text();
      console.warn(`[GitHub API] Unexpected response when checking file existence: ${errText}`);
    }

    // 6. Prepare content and commit details
    // Base64 encode the code content (required by GitHub API contents endpoint)
    const base64Content = Buffer.from(code).toString("base64");
    
    // Construct commit message: e.g. "Solve: Binary Search (65 WPM, 98% Accuracy)"
    const statsText = netWpm !== undefined && accuracy !== undefined 
      ? ` (${netWpm} WPM, ${accuracy}% Accuracy)` 
      : "";
    const commitMessage = `Solve: ${snippetTitle}${statsText}`;

    // 7. Step 2B: PUT the new contents to GitHub
    console.log(`[GitHub API] Uploading file to path: ${path}`);
    const uploadResponse = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: commitMessage,
          content: base64Content,
          sha: sha, // Included if the file already exists
        }),
      }
    );

    if (!uploadResponse.ok) {
      const errText = await uploadResponse.text();
      console.error(`[GitHub API] Upload failed: ${errText}`);
      return NextResponse.json({ error: "Failed to upload file to GitHub" }, { status: uploadResponse.status });
    }

    const uploadData = await uploadResponse.json();
    console.log(`[GitHub API] Commit successful! Commit SHA: ${uploadData.commit.sha}`);

    return NextResponse.json({ 
      success: true, 
      commitSha: uploadData.commit.sha,
      htmlUrl: uploadData.content.html_url 
    });
  } catch (error) {
    console.error("Failed to commit to GitHub:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
