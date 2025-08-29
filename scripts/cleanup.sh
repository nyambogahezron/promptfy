#!/bin/bash

# Directories to search and delete
DIRS_TO_DELETE=("node_modules" ".turbo" "dist" "temp")

# Find and delete each directory
for dir in "${DIRS_TO_DELETE[@]}"; do
    find . -type d -name "$dir" -prune -exec rm -rf '{}' +
done

echo "Cleanup complete."