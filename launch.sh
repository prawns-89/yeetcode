#!/bin/bash
# YeetCode launcher — starts dev server and opens the browser

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT=3000
URL="http://localhost:$PORT"

# Check if server is already running
if curl -s --head "$URL" | grep -q "200\|301\|302"; then
    echo "Dev server already running, opening browser..."
    xdg-open "$URL"
    exit 0
fi

# Start dev server in the background
cd "$PROJECT_DIR"
npm run dev &
SERVER_PID=$!

echo "Starting YeetCode dev server (PID $SERVER_PID)..."

# Wait for the server to be ready (up to 30s)
for i in $(seq 1 30); do
    if curl -s --head "$URL" | grep -q "200\|301\|302"; then
        echo "Server ready! Opening browser..."
        xdg-open "$URL"
        exit 0
    fi
    sleep 1
done

echo "Server took too long to start. Try opening $URL manually."
