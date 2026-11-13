# Vendoring a package's docs

`pnpm vendor-docs <pkg>` fills `packages/<pkg>/docs/` from `docs/SOURCE.json` and
writes `docs/MANIFEST.json`. Builders read these files instead of the web (CLAUDE.md §
Purity rule).

## SOURCE.json

```json
{
  "license": "MIT (docs repo LICENSE)",
  "redistribute": true,
  "sources": [
    { "kind": "git", "repo": "https://github.com/o/r", "ref": "v1.2.0", "paths": ["README.md", "docs"] },
    { "kind": "pages", "urls": ["https://lib.dev/docs/a", "https://lib.dev/docs/b"] },
    { "kind": "crawl", "start": "https://lib.dev/docs/", "prefix": "https://lib.dev/docs/", "max": 400 }
  ]
}
```

- **`git`**: docs that live in a repo as markdown or MDX. This does a shallow sparse
  clone at `ref` (a tag matching the installed version, ideally) and copies `paths` into
  `docs/repo/`. MANIFEST pins the resolved commit and links each file to its blob URL.
- **`pages`**: a fixed list of docs pages, fetched with `tfish fetch` as markdown into
  `docs/pages/<host>/<path>.md`. The first line of each file is its source URL.
- **`crawl`**: starts at `start` and follows links under `prefix`, breadth-first, up to
  `max` pages. Links come from each page's raw HTML, because tfish's extracted markdown
  drops navigation. Content comes from tfish.
- Prefer `git` when the docs are in a repo. It is versioned and exact.

**Official only.** Every URL must be on the host of the package's `homepage`, `docsUrl`
or `repo`, and the integrity test fails otherwise. Don't vendor community tutorials,
or official demo galleries either (those are examples, see pattern.md § Purity).

## Licence and `redistribute`

The repo is public, so vendored files are republished. Check the licence of the
**docs** (the docs repo's LICENSE, or the site's terms), not just the library's:

- An explicit permissive licence (MIT, Apache-2.0, BSD, ISC, CC-BY) means
  `redistribute: true`, and the files are committed.
- No licence found, all rights reserved, or copyleft (AGPL/GPL/LGPL docs) means
  `redistribute: false`. The script writes `docs/.gitignore` so that only `SOURCE.json`,
  `MANIFEST.json` and the `.gitignore` are tracked. Builders re-run `pnpm vendor-docs`
  in their worktree to get the files back.

Record what you found in `license`, e.g. `"none found (site only)"`. The integrity test
checks docs refs against `MANIFEST.json`, so CI never needs the files or the network.

## Re-vendoring

The script clears everything in `docs/` except `SOURCE.json`, `MANIFEST.json` and
`.gitignore`, then refetches. MANIFEST stores a sha256 per file, so `git diff
MANIFEST.json` shows which pages changed upstream. After a bump, check that examples
citing changed pages still match the docs.
