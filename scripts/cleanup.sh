#!/bin/bash

# Directories to search and delete
DIRS_TO_DELETE=("node_modules" ".turbo" "dist" "temp")

# Find and delete each directory
for dir in "${DIRS_TO_DELETE[@]}"; do
    find . -type d -name "$dir" -prune -exec rm -rf '{}' +
    echo "Deleted directory: $dir"
done

# Remove bun.json files
find . -name "bun.json" -exec rm -f '{}' +
echo "Deleted files: bun.json"

echo "Cleanup complete."