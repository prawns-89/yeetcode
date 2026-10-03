"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function GithubSettings() {
  const [enabled, setEnabled] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [repoName, setRepoName] = useState("yeetcode-solutions");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch("/api/github/settings");
        if (response.ok) {
          const data = await response.json();
          setEnabled(data.enabled);
          setUsername(data.username || "");
          setRepoName(data.repoName || "yeetcode-solutions");
          if (data.hasToken) {
            setToken("••••••••••••••••");
          }
        }
      } catch (err) {
        console.error("Failed to load GitHub settings", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/github/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enabled,
          token,
          username,
          repoName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: "success", text: "Settings saved successfully!" });
        if (data.settings.hasToken) {
          setToken("••••••••••••••••");
        }
      } else {
        const errData = await response.json();
        setMessage({ type: "error", text: errData.error || "Failed to save settings." });
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="lg:col-span-2">
        <p className="text-sm text-muted animate-pulse">Loading GitHub integration settings...</p>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-2">
      <h3 className="font-semibold text-foreground text-lg">GitHub Integration</h3>
      <p className="text-sm text-muted mt-1">
        Automatically upload your code solutions to a GitHub repository the first time you solve a snippet.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="github-enabled"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="h-4 w-4 rounded border-border bg-surface text-accent focus:ring-accent"
          />
          <label htmlFor="github-enabled" className="text-sm font-medium text-foreground cursor-pointer">
            Enable GitHub Auto-Upload
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted block uppercase tracking-wider">
              GitHub Username
            </label>
            <input
              type="text"
              required={enabled}
              disabled={!enabled}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. octocat"
              className="w-full rounded-md border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none disabled:opacity-50"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted block uppercase tracking-wider">
              Repository Name
            </label>
            <input
              type="text"
              required={enabled}
              disabled={!enabled}
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="yeetcode-solutions"
              className="w-full rounded-md border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted block uppercase tracking-wider">
            Personal Access Token (PAT)
          </label>
          <input
            type="password"
            required={enabled && token !== "••••••••••••••••"}
            disabled={!enabled}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onFocus={() => {
              if (token === "••••••••••••••••") setToken("");
            }}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxx"
            className="w-full rounded-md border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none disabled:opacity-50"
          />
          <p className="text-[11px] text-muted">
            Needs a token with <code className="rounded bg-surface px-1 py-0.5 text-foreground font-mono">repo</code> permissions. 
            If the repository does not exist, YeetCode will try to automatically create it as a private repository.
          </p>
        </div>

        {message && (
          <div
            className={`rounded-md p-3 text-sm ${
              message.type === "success" 
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
