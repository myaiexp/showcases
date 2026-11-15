# The package / example pattern

How a package and its examples are laid out, the contracts they're written against, and
the steps to add one. The design and its alternatives are recorded in
`plans/2026-11-13-example-galleries-design.md`.

## Layout

```
packages/<pkg>/
  package.ts              definePackage({...})
  docs/
    SOURCE.json           where the official docs come from (hand-written)
    MANIFEST.json         what vendoring fetched (generated, always tracked)
    pages/ repo/          the vendored docs (gitignored when the licence forbids republishing)
  examples/<slug>/
    meta.ts               defineMeta({...}): metadata only, imports nothing heavy
    main.ts               export default mount: the running code
    style.css, *.ts       optional scoped styles and helpers
  shared/*.ts             optional setup and sample data every example of the package imports
  comparisons/<entry>.ts  defineComparison({...}), written in the comparison phase
```

The app finds all of it by glob (`src/registry.ts`). Package and example slugs are the
directory names: kebab-case, and permanent once published.

## Contracts (`src/types.ts`)

- **`definePackage`**: `name`, `npm`, `tagline`, optional `about`, `category` (one of
  `CATEGORIES`), `homepage`, `docsUrl`, `repo`, `added`, and `sections`, the official docs'
  chapter order. The package page groups examples by section in this order. Optional
  `credit` (text, url, license, licenseUrl) is the attribution a CC BY docs licence asks
  for; the package page and every example's "Built from" list show it.
- **`defineMeta`**:
  - `title`, `summary`, `section` (one of the package's sections), `tags`, `added`.
  - `docs`: the vendored files used, as keys of `docs/MANIFEST.json`.
  - `provenance`: `'pure'` for examples built from the docs, `'legacy'` for the 15
    migrated pages.
  - `audio: true` for examples that make sound and have no silent preview; such a card
    never mounts. A sound example that can render its card silently (Tone.js renders
    offline and draws the waveform) leaves it unset.
- **`mount(el, { preview, signal })`**: builds into `el` and returns a cleanup. It may be
  async. `signal` aborts on unmount: pass it to `fetch` and to loaders, and stop work
  when it fires. The host runs a late cleanup itself if the mount resolves after
  unmount. A throw or reject shows an error inside that card only.

The example view shows every file in the example folder as its source, so the code a
reader sees is the code that runs. Keep `main.ts` readable: setup first, then the
library calls the example is about. Move DOM scaffolding and sample data into helper
files when it would bury them. Every file stays ≤300 lines with a one-line header.
`shared/` is for what would otherwise be copied into every example (library setup, a
basemap, a sample dataset) and is not shown as source, so the feature an example is
about never lives there.

## Preview cards

Gallery cards are 200px tall and have `pointer-events: none`; a click opens the full view.
`src/preview/host.ts` mounts them one at a time, nearest to the viewport centre first,
once a card has been in view for 150 ms, and unmounts a card 800 ms after it leaves view.
At most 6 run at once. When the page drops under ~20 fps the cap falls (to 1 at worst)
and climbs back once frames recover, and a card whose own mount turned a healthy page
slow is skipped for the rest of the visit (its stage gets `data-preview="benched"`). A
heavy card therefore stays blank on slow devices. So in `ctx.preview`:

- look alive with no input: autoplay or loop, or cycle sample inputs on a timer;
- skip control panels; fit about 260×200;
- no network requests, no sound;
- keep it light (fewer particles, a lower resolution).

`el` is a flex column that centres its children: in a card, inside a fixed 200px box
that clips; in the full view, a block at least 360px tall. Content that should span
the full width needs `width: 100%`.

## Styles

Examples are mounted into the page, not an iframe, so their CSS is global.
`style.css` is one block nested under the example's own attribute:

```css
/* Stagger grid: tiles and colours */
[data-example='animejs/stagger-grid'] {
  .tile { background: var(--accent); }
}
```

Use base.css tokens (`--bg`, `--bg-surface`, `--fg-1..3`, `--accent`, `--green` …,
`--space-1..6`) for chrome. The example's own visuals are free.

No `@keyframes`: CSS nesting doesn't allow them inside the scope block, and the build
fails on them. Animate with the library itself or `element.animate()`.

## Adding a package

1. `pnpm new-package <slug> <npm> <Category>`. This reads homepage, repo and description
   from the npm registry.
2. `pnpm add <npm>`.
3. Fill `docs/SOURCE.json` ([vendoring.md](vendoring.md)), then `pnpm vendor-docs <slug>`.
4. Set `sections` in `package.ts` to the docs' chapter order.

## Adding an example

1. Read the vendored docs for one feature, and only those (§ Purity).
2. `pnpm new-example <pkg> <slug> "<Title>" "<Section>"`.
3. Write `main.ts`. In `meta.ts` fill `summary`, `tags` and `docs`, the files you read.
4. `pnpm check:pkg <pkg>` (§ Checking). The integrity test (`test/integrity.test.ts`)
   checks the section, that each docs ref is in MANIFEST, that pure examples have refs,
   CSS scoping and unique titles.
5. Look at the card and the full view in `pnpm dev`.

A rich package aims at hundreds of examples. Aim for one example per documented feature
or option, plus combinations the docs describe. Each example should show one idea
clearly, not a kitchen sink.

## Checking

`pnpm check` over the whole repo costs memory in proportion to the number of galleries.
With 35 of them, tsc peaks around 4 GB and `vite build` around 6 GB. Two builders
running it at once pushed the VPS into an out-of-memory kill. So the work is split:

- **`pnpm check:pkg [<pkg>...]`** (`scripts/check.ts`) is the builder's check. Each
  package gets its own tsconfig, written to `node_modules/.cache/showcases-check/`. That
  tsconfig extends the root one and includes only `packages/<pkg>` and `src/**/*.d.ts`,
  so the compiler options are the same and only the file set is smaller. The integrity
  test then runs for those packages only (`SHOWCASES_PACKAGES`), with any
  `test/<pkg>-*.test.ts`. With no args, the scope comes from the branch's diff against
  master plus untracked files. A `packages/<pkg>/` path adds that package. A path under
  any other root tsconfig `include` entry adds the app-shell type-check and every test.
  `tsconfig.json`, or anything under a directory the tsconfig `paths` point into (`src`,
  through `@/*`), brings in the whole-repo tsc, because every package imports it. An
  empty diff is an error, not a pass. Dependency changes (`package.json`, the lockfile)
  only print a note; the whole-repo check sees their importers.
- **`pnpm check`** runs the whole-repo tsc, every test and the build. Each step queues on
  `flock` over `showcases-check.lock` in the git common dir, which every worktree shares.
  The tsc step goes through helm's `build-lock` where it exists, which runs it on another
  machine.
- **CI** (`check:types`, `test`, `build`) and deploy's type-check gate always check the
  whole repo. A scoped check never replaces them, so anything it misses still fails there.

What only the whole-repo check sees: one package's global declarations reaching another
package. That is a hidden dependency, so fix it in the package that relies on it, the way
`packages/playcanvas/shared/xr.ts` stopped leaning on another package's `@types/webxr`.

## Purity

The rule is in CLAUDE.md. Why it is shaped this way:

- **The point** is to see what each package's own docs make possible, unprompted by how
  others have used it. The comparison phase measures that gap later, so leaking
  community examples into the build would make the comparison meaningless.
- **Allowed inputs**: `packages/<pkg>/docs/` and the package's own published code in
  `node_modules/<npm>/`: source, type definitions and README all count as documentation,
  because they describe the library, not how anyone used it. Official docs pages with
  inline snippets count as docs. A standalone gallery of demos counts as examples, even
  an official one (a repo's `examples/`, threejs.org/examples), so it isn't vendored, and
  an `examples/` or demo folder shipped inside the npm package is off limits the same way.
- **`docs` refs are a declaration, not proof.** The test checks only that they resolve.
  Whoever reviews a batch of new examples samples a few and confirms that each one's API
  usage appears in its cited docs.
