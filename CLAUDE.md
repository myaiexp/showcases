# CLAUDE.md

## Branch

Use feature branches for new work. Merge to `main` when complete.

## Package Showcases

When building or adding a package showcase to the app, update `.claude/package-showcase-list.md` and mark the package as **"included"** by changing its list entry. For example:

```
- **Fuse.js** — Fuzzy search, typo-tolerant ✅ included
```

This keeps the reference list in sync with what's actually in the app.

## Showcase Dates

Each showcase entry in `index.html` has `added` and `modified` date fields (ISO format `YYYY-MM-DD`). When modifying a showcase's files (e.g. updating its demo, fixing bugs, changing content), update its `modified` date in the `showcases` array in `index.html` to today's date. When adding a new showcase, set both `added` and `modified` to today's date.
