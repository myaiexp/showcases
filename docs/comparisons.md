# The comparison phase

After a package's pure gallery exists, a separate pass sets it beside notable community
examples of the same package. This is the **only** phase allowed to search the web for
other people's examples (CLAUDE.md § Purity rule).

## Rules

- Write only to `packages/<pkg>/comparisons/`. Never edit an example. An idea seen in a
  community example becomes a new example only if the vendored docs alone support it,
  built later by a builder who hasn't read the community example.
- Link, don't copy: record where the community example lives, and don't vendor its code.
- Pick notable ones: widely shared, featured by the package's authors, or doing
  something our gallery doesn't.

## Format

One file per community example, `packages/<pkg>/comparisons/<slug>.ts`:

```ts
// anime.js comparison: Codrops "Grid Item Hover Effect"
import { defineComparison } from '@/types.ts';

export default defineComparison({
  title: 'Grid Item Hover Effect',
  author: 'Codrops',
  sourceUrl: 'https://github.com/…',
  demoUrl: 'https://tympanus.net/…',
  license: 'MIT',
  foundVia: 'tfish search "anime.js v4 demo"',
  ours: ['stagger-grid', 'hover-scale'],
  notes: 'Theirs chains stagger with SVG filters; ours covers stagger origins but no filters.',
});
```

The integrity test checks that `sourceUrl` is a URL and that every `ours` slug exists.
The package page lists comparisons under "Community examples".
