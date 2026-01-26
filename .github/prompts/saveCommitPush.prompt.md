---
name: saveCommitPush
description: Save all changes, stage files, commit with message, and push to remote
argument-hint: Optional commit message (defaults to auto-generated message)
---

Perform a complete git save, commit, and push workflow:

1. Check the current git status to see what files have changed
2. Stage all changes using `git add -A` (includes modified, new, and deleted files)
3. Create a commit with a descriptive message that summarizes the changes
4. Push the committed changes to the remote repository
5. Confirm successful completion with a brief summary

If a commit message is provided as an argument, use that. Otherwise, generate an appropriate commit message based on the types of changes detected (e.g., "Update documentation and layouts", "Add new gallery images and posts", etc.).

Handle any errors gracefully and report them to the user.
