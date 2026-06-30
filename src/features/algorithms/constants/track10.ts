import type { AlgorithmTrack } from "@/features/algorithms/types";

export const track10MissingSemester: AlgorithmTrack = {
  id: "missing-semester",
  name: "Missing Semester",
  description: "MIT's missing CS curriculum — shell, vim, git, debugging, and dev tools every engineer needs.",
  order: 10,
  language: "Shell",
  chapters: [
    {
      id: "10-1",
      title: "Shell & Scripting",
      topic: "Navigating the filesystem, pipes, redirects, and bash scripting patterns",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "ms-shell-pipes",
          title: "Pipes & redirects",
          difficulty: 1,
          code: `# Count lines matching a pattern
grep -r "TODO" ./src | wc -l

# Redirect stdout and stderr
command > out.txt 2> err.txt

# Append instead of overwrite
echo "done" >> log.txt`,
          explanation: `### Pipes & Redirects
- \`|\` pipes stdout of one command into stdin of the next.
- \`>\` redirects stdout to a file (overwrites). \`>>\` appends.
- \`2>\` redirects stderr (file descriptor 2). \`2>&1\` merges stderr into stdout.`
        },
        {
          id: "ms-shell-find",
          title: "find & xargs",
          difficulty: 2,
          code: `# Find all .ts files modified in last 7 days
find . -name "*.ts" -mtime -7

# Delete all .log files
find . -name "*.log" -delete

# Run a command on each result
find . -name "*.json" | xargs wc -l`,
          explanation: `### find & xargs
- \`find . -name "*.ts"\` recursively searches from \`.\` for files matching the glob.
- \`-mtime -7\` filters to files modified fewer than 7 days ago.
- \`xargs\` converts stdin lines into arguments for another command, avoiding shell argument length limits.`
        },
        {
          id: "ms-shell-script",
          title: "Bash script patterns",
          difficulty: 2,
          code: `#!/usr/bin/env bash
set -euo pipefail

NAME=\${1:-"world"}
echo "Hello, \$NAME"

if [ -f "./config.json" ]; then
  echo "Config found"
fi

for f in *.ts; do
  echo "Processing \$f"
done`,
          explanation: `### Bash Scripting
- \`set -euo pipefail\`: \`-e\` exits on error, \`-u\` errors on unset vars, \`-o pipefail\` catches pipe failures.
- \`\${1:-"world"}\` uses argument \$1 or falls back to "world" if unset.
- \`[ -f file ]\` tests if a file exists. \`-d\` tests for directory.`
        },
        {
          id: "ms-shell-grep",
          title: "grep patterns",
          difficulty: 2,
          code: `# Case-insensitive search
grep -i "error" app.log

# Show line numbers, 3 lines of context
grep -n -C 3 "panic" app.log

# Recursive, show only filenames
grep -rl "TODO" ./src

# Invert match (lines NOT matching)
grep -v "DEBUG" app.log`,
          explanation: `### grep flags
- \`-i\` case-insensitive, \`-n\` show line numbers, \`-r\` recursive through dirs.
- \`-C N\` shows N lines of context before and after each match.
- \`-l\` lists only filenames containing matches. \`-v\` inverts the match.`
        }
      ]
    },
    {
      id: "10-2",
      title: "Vim Essentials",
      topic: "Modal editing, motions, operators, and search/replace",
      estimatedMinutes: 25,
      snippets: [
        {
          id: "ms-vim-modes",
          title: "Modes & basic motions",
          difficulty: 1,
          code: `# Normal mode motions
h j k l       # left down up right
w b e         # word forward, back, end
0 ^ \$         # line start, first char, end
gg G          # file top, file bottom
{ }           # paragraph up/down
Ctrl-d Ctrl-u # half-page down/up`,
          explanation: `### Vim Modes & Motions
- Vim has Normal (navigate), Insert (type), Visual (select), and Command (\`:cmd\`) modes.
- Press \`i\` to enter Insert, \`Esc\` to return to Normal.
- Motions in Normal mode move the cursor. Combine with operators: \`d\` (delete), \`c\` (change), \`y\` (yank/copy).`
        },
        {
          id: "ms-vim-operators",
          title: "Operators & text objects",
          difficulty: 2,
          code: `# Operator + motion combos
dw   # delete word
d3j  # delete 3 lines down
ci"  # change inside quotes
ca(  # change around parens
yi{  # yank inside braces
vip  # visually select paragraph

# Common shortcuts
dd   # delete whole line
yy   # yank whole line
p    # paste after cursor
u    # undo
Ctrl-r  # redo`,
          explanation: `### Operators & Text Objects
- Vim is a language: \`operator + motion\` = action. \`d3j\` = "delete 3 lines down".
- Text objects: \`i\` = inside, \`a\` = around. \`ci"\` = "change inside quotes".
- \`dd\` and \`yy\` are shorthand for operating on the whole current line.`
        },
        {
          id: "ms-vim-search",
          title: "Search & replace",
          difficulty: 2,
          code: `# Search forward / backward
/pattern    # search forward
?pattern    # search backward
n N         # next / previous match
*           # search word under cursor

# Substitute (sed-like)
:%s/old/new/g       # replace all in file
:%s/old/new/gc      # with confirmation
:5,20s/old/new/g    # range only

# Search across files (quickfix)
:vimgrep /TODO/ **/*.ts
:copen`,
          explanation: `### Vim Search & Substitute
- \`/pattern\` starts a forward search. \`n\` jumps to next match, \`N\` to previous.
- \`:%s/old/new/g\`: \`%\` = entire file, \`s\` = substitute, \`g\` = global (all occurrences per line).
- \`c\` flag prompts for confirmation on each replacement.`
        }
      ]
    },
    {
      id: "10-3",
      title: "Git Internals & Advanced Ops",
      topic: "Data model, rebase, bisect, reflog, and stash",
      estimatedMinutes: 30,
      snippets: [
        {
          id: "ms-git-model",
          title: "Git data model",
          difficulty: 1,
          code: `# Git stores snapshots as a DAG of objects
# blob   = file content
# tree   = directory listing
# commit = snapshot + parent + message

# Inspect objects
git cat-file -p HEAD        # current commit
git cat-file -p HEAD^{tree} # root tree object
git log --oneline --graph   # visualize DAG`,
          explanation: `### Git's Data Model
- Git is a content-addressed filesystem. Every object (blob, tree, commit) is stored by its SHA-1 hash.
- A **commit** points to a **tree** (snapshot of all files) and its parent commit(s).
- Branches are just named pointers to commit SHAs — they're extremely cheap to create.`
        },
        {
          id: "ms-git-rebase",
          title: "Interactive rebase",
          difficulty: 2,
          code: `# Rewrite last 4 commits
git rebase -i HEAD~4

# In the editor, use these commands:
# pick   = keep commit as-is
# reword = keep but edit message
# squash = merge into previous commit
# drop   = remove commit entirely
# fixup  = squash, discard message

# Rebase feature onto updated main
git fetch origin
git rebase origin/main`,
          explanation: `### Interactive Rebase
- \`git rebase -i HEAD~N\` opens an editor to rewrite the last N commits before sharing.
- Use \`squash\` to combine messy WIP commits into clean logical units.
- \`rebase origin/main\` replays your branch commits on top of the latest main, keeping a linear history.`
        },
        {
          id: "ms-git-bisect",
          title: "git bisect & reflog",
          difficulty: 3,
          code: `# Binary search for the commit that broke something
git bisect start
git bisect bad              # current commit is broken
git bisect good v1.2.0      # this tag was fine
# Git checks out middle commit; you test and mark:
git bisect good             # or: git bisect bad
# Repeat until git identifies the culprit
git bisect reset            # back to HEAD

# Recover "deleted" commits via reflog
git reflog                  # every HEAD movement
git checkout HEAD@{3}       # jump to 3 moves ago`,
          explanation: `### git bisect & reflog
- \`bisect\` does binary search across commits to find which one introduced a bug. Dramatically faster than manual \`git log\` hunting.
- \`reflog\` logs every position HEAD has ever pointed to, even after resets. The ultimate safety net — nearly nothing in Git is truly deleted for 30 days.`
        },
        {
          id: "ms-git-stash",
          title: "Stash & worktrees",
          difficulty: 2,
          code: `# Stash uncommitted changes
git stash push -m "wip: half-done feature"
git stash list
git stash pop               # apply & remove top stash
git stash apply stash@{2}   # apply without removing

# Work on two branches simultaneously
git worktree add ../hotfix-tree origin/hotfix
cd ../hotfix-tree
# edit, commit — fully separate working dir
git worktree remove ../hotfix-tree`,
          explanation: `### Stash & Worktrees
- \`git stash\` saves dirty state (tracked files) to a stack, cleaning the working tree. Use \`-u\` to also stash untracked files.
- \`git worktree\` lets you check out a second branch in a separate directory — no stash needed when context-switching for hotfixes.`
        }
      ]
    },
    {
      id: "10-4",
      title: "Debugging & Profiling",
      topic: "gdb, strace, perf, valgrind, and print-based debugging patterns",
      estimatedMinutes: 25,
      snippets: [
        {
          id: "ms-debug-gdb",
          title: "gdb basics",
          difficulty: 2,
          code: `# Compile with debug symbols
g++ -g -O0 main.cpp -o main

# Start debugger
gdb ./main

# Key gdb commands:
(gdb) run arg1 arg2   # start program
(gdb) break main      # set breakpoint
(gdb) break file.cpp:42
(gdb) next            # step over
(gdb) step            # step into
(gdb) print var       # inspect variable
(gdb) backtrace       # call stack
(gdb) watch x         # break when x changes
(gdb) quit`,
          explanation: `### gdb Workflow
- Always compile with \`-g\` (debug symbols) and \`-O0\` (no optimizations) for readable debugging.
- \`break\` sets a breakpoint. \`next\` (n) steps over function calls; \`step\` (s) steps into them.
- \`backtrace\` (bt) shows the full call stack — the first thing to do on a segfault.`
        },
        {
          id: "ms-debug-strace",
          title: "strace & system calls",
          difficulty: 2,
          code: `# Trace system calls of a command
strace ls -la

# Attach to running process
strace -p 1234

# Filter to specific syscalls
strace -e openat,read,write ls

# Trace with timestamps
strace -t -e network curl example.com

# Python equivalent: use ltrace for library calls
ltrace ./myprogram`,
          explanation: `### strace
- \`strace\` intercepts and prints every **system call** a process makes (file opens, network, memory).
- Invaluable for diagnosing: "why is my program so slow?", "what file is it failing to open?", "is it making unexpected network calls?".
- \`-e\` filters to specific syscall categories: \`file\`, \`network\`, \`process\`.`
        },
        {
          id: "ms-debug-perf",
          title: "perf & profiling",
          difficulty: 3,
          code: `# CPU profiling — record 30s
perf record -g ./myprogram
perf report

# Quick stats
perf stat ./myprogram

# Python: cProfile
python -m cProfile -s cumtime script.py | head -20

# Valgrind memory check
valgrind --leak-check=full ./myprogram

# Address sanitizer (faster than valgrind)
g++ -fsanitize=address,undefined -g main.cpp -o main
./main`,
          explanation: `### Profiling Tools
- \`perf record -g\` samples the call stack at high frequency to identify hot functions. \`perf report\` shows an interactive breakdown.
- \`-fsanitize=address\` (ASan) detects memory errors at ~2x slowdown — far faster than Valgrind's ~10-50x.
- For Python, \`cProfile -s cumtime\` sorts by cumulative time, showing which functions dominate total runtime.`
        }
      ]
    },
    {
      id: "10-5",
      title: "Command-line Environment",
      topic: "tmux, SSH config, dotfiles, and shell customization",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "ms-cli-tmux",
          title: "tmux session management",
          difficulty: 1,
          code: `# Start / attach to named session
tmux new -s work
tmux attach -t work

# Key bindings (prefix = Ctrl-b)
Ctrl-b c    # new window
Ctrl-b ,    # rename window
Ctrl-b n/p  # next/previous window
Ctrl-b %    # split vertical pane
Ctrl-b "    # split horizontal pane
Ctrl-b o    # cycle panes
Ctrl-b d    # detach (session persists)
Ctrl-b [    # scroll mode (q to exit)`,
          explanation: `### tmux
- tmux = terminal multiplexer. Lets you run multiple terminals in one SSH session and detach/reattach without losing state.
- Sessions persist even after disconnecting from SSH — critical for long-running processes on remote servers.
- \`Ctrl-b d\` detaches. \`tmux attach -t name\` reattaches from anywhere.`
        },
        {
          id: "ms-cli-ssh",
          title: "SSH config & key setup",
          difficulty: 2,
          code: `# Generate an ed25519 key
ssh-keygen -t ed25519 -C "me@example.com"

# Copy public key to remote
ssh-copy-id user@host

# ~/.ssh/config
Host dev
  HostName 192.168.1.100
  User ubuntu
  IdentityFile ~/.ssh/id_ed25519
  ForwardAgent yes

# Now just:
ssh dev

# SSH tunnel (forward remote port locally)
ssh -L 8080:localhost:5432 dev`,
          explanation: `### SSH Config
- \`~/.ssh/config\` stores aliases for SSH connections — no more remembering IPs, usernames, or key paths.
- \`ForwardAgent yes\` forwards your local SSH key to the remote, so you can SSH from the remote to other servers using your local key.
- \`-L local:remote\` creates a tunnel — port 8080 on your machine forwards to port 5432 on the server (useful for DB access).`
        },
        {
          id: "ms-cli-dotfiles",
          title: "Dotfiles & shell config",
          difficulty: 2,
          code: `# ~/.bashrc useful patterns
export PATH="\$HOME/.local/bin:\$PATH"
export EDITOR="vim"

# Aliases
alias ll='ls -lah --color=auto'
alias gs='git status'
alias gd='git diff'
alias ..='cd ..'

# Functions
mkcd() { mkdir -p "\$1" && cd "\$1"; }
hist() { history | grep "\$1"; }

# Better history
HISTSIZE=100000
HISTFILESIZE=200000
shopt -s histappend`,
          explanation: `### Dotfiles
- \`~/.bashrc\` runs for every interactive bash shell. \`~/.bash_profile\` runs at login.
- Keep dotfiles in a Git repo and symlink them — you can bootstrap a new machine in minutes.
- \`HISTSIZE\` and \`histappend\` give you a massive, persistent command history — invaluable for recalling complex commands.`
        }
      ]
    },
    {
      id: "10-6",
      title: "Data Wrangling",
      topic: "awk, sed, jq, and command-line data processing",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "ms-data-sed",
          title: "sed stream editor",
          difficulty: 2,
          code: `# In-place substitution
sed -i 's/foo/bar/g' file.txt

# Delete lines matching pattern
sed '/^#/d' config.txt

# Print lines 10-20
sed -n '10,20p' file.txt

# Insert line after match
sed '/MARKER/a\\new line here' file.txt

# Multiple expressions
sed -e 's/foo/bar/' -e 's/baz/qux/' file.txt`,
          explanation: `### sed
- \`sed\` processes text line-by-line. \`s/old/new/g\` is the most common command (substitute, globally per line).
- \`-i\` edits in-place. Always test without \`-i\` first, or use \`-i.bak\` to create a backup.
- \`-n\` suppresses default output; use with \`p\` to selectively print lines.`
        },
        {
          id: "ms-data-awk",
          title: "awk field processing",
          difficulty: 2,
          code: `# Print 2nd column of space-separated data
awk '{print \$2}' data.txt

# Sum a column
awk '{sum += \$3} END {print sum}' data.txt

# Filter rows where field > threshold
awk '\$3 > 100 {print \$1, \$3}' data.txt

# Use custom delimiter
awk -F',' '{print \$1}' data.csv

# NR = line number, NF = num fields
awk 'NR > 1 {print NF, \$0}' data.txt`,
          explanation: `### awk
- \`awk\` splits each line into fields (\`$1\`, \`$2\`, ...). \`$0\` is the full line.
- Pattern-action model: \`condition { action }\`. \`END\` block runs after all lines.
- \`-F','\` sets field separator to comma (for CSV).`
        },
        {
          id: "ms-data-jq",
          title: "jq JSON processing",
          difficulty: 2,
          code: `# Pretty print
curl api.example.com | jq .

# Extract a field
jq '.name' data.json

# Array of objects — get a field from each
jq '.[].email' users.json

# Filter where condition is true
jq '.[] | select(.age > 25)' users.json

# Transform to new shape
jq '{name: .name, upper: (.name | ascii_upcase)}' data.json

# From shell: pass variable
jq --arg id "\$ID" '.[] | select(.id == \$id)' data.json`,
          explanation: `### jq
- \`jq\` is the standard tool for JSON on the command line. Think of it as SQL for JSON.
- \`.[]\` iterates array elements. \`select(cond)\` filters. \`|@csv\` converts to CSV.
- \`--arg name value\` safely injects shell variables into jq expressions.`
        }
      ]
    },
    {
      id: "10-7",
      title: "Packaging & Docker",
      topic: "Dockerfiles, images, docker-compose, and shipping code",
      estimatedMinutes: 20,
      snippets: [
        {
          id: "ms-docker-basics",
          title: "Dockerfile fundamentals",
          difficulty: 1,
          code: `FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies first (layer cache)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# Build stage
FROM base AS builder
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]`,
          explanation: `### Dockerfile Best Practices
- Copy \`package.json\` and run \`npm ci\` **before** copying source. Docker caches layers — if deps haven't changed, this layer is reused.
- Multi-stage builds (\`AS builder\`, \`AS runner\`) keep the final image small by discarding build tools.
- \`node:alpine\` images are ~5x smaller than the default Debian-based ones.`
        },
        {
          id: "ms-docker-compose",
          title: "docker-compose",
          difficulty: 2,
          code: `# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      retries: 5`,
          explanation: `### docker-compose
- \`depends_on\` with \`condition: service_healthy\` ensures the app only starts after the DB is ready to accept connections.
- Service names (\`db\`) are DNS-resolvable within the compose network — use them as hostnames in connection strings.
- \`docker compose up --build\` rebuilds images; \`docker compose down -v\` also removes volumes.`
        },
        {
          id: "ms-docker-cmds",
          title: "Essential Docker commands",
          difficulty: 1,
          code: `# Build & run
docker build -t myapp:latest .
docker run -p 3000:3000 --rm myapp:latest

# Inspect running containers
docker ps
docker logs -f container_id
docker exec -it container_id sh

# Cleanup
docker system prune -af   # remove unused images/containers
docker volume prune       # remove unused volumes

# Inspect image layers
docker history myapp:latest
docker inspect myapp:latest`,
          explanation: `### Docker CLI Essentials
- \`--rm\` removes the container automatically when it stops. \`-it\` gives an interactive TTY.
- \`docker exec -it id sh\` opens a shell inside a **running** container — the fastest way to debug.
- \`docker system prune\` reclaims disk space. Docker images accumulate quickly during development.`
        }
      ]
    },
    {
      id: "10-8",
      title: "Code Quality & Git Hooks",
      topic: "Linters, formatters, pre-commit hooks, and CI integration",
      estimatedMinutes: 15,
      snippets: [
        {
          id: "ms-quality-precommit",
          title: "pre-commit hooks",
          difficulty: 2,
          code: `# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-merge-conflict

  - repo: https://github.com/psf/black
    rev: 24.3.0
    hooks:
      - id: black

# Install hooks into .git/hooks
pre-commit install

# Run against all files manually
pre-commit run --all-files`,
          explanation: `### pre-commit
- \`pre-commit\` runs checks before every \`git commit\`, blocking commits that fail.
- Hooks are versioned in \`.pre-commit-config.yaml\` alongside your code — every contributor gets the same rules.
- \`pre-commit install\` writes the hooks into \`.git/hooks/pre-commit\`.`
        },
        {
          id: "ms-quality-make",
          title: "Makefile patterns",
          difficulty: 2,
          code: `# Makefile
.PHONY: dev build test lint clean

dev:
	npm run dev

build:
	npm run build

test:
	npm test -- --coverage

lint:
	eslint ./src --ext .ts,.tsx
	tsc --noEmit

clean:
	rm -rf dist .next node_modules

# Run multiple targets
all: lint test build`,
          explanation: `### Makefiles
- \`.PHONY\` declares targets that aren't files — prevents Make from getting confused if a file named \`test\` exists.
- Makefiles standardize project commands across languages. New contributors run \`make dev\` without reading docs.
- Indentation in recipe lines **must** use tabs, not spaces — a classic gotcha.`
        }
      ]
    }
  ]
};
