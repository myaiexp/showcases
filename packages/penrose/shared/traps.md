# Penrose traps

Found while building this gallery. Read before building an example, and add to it.

## Building on the shared stage

- Every diagram goes through `playground(stage, {...trio})` (shared/playground.ts) or, for an
  example that drives the layout itself, `createLayout(stage)` (shared/layout.ts). Both solve
  through shared/solver.ts, one requestAnimationFrame loop that steps every live layout on the
  page inside a 10 ms frame budget. `optimize()` and `step(…, { until: () => false })` run
  synchronously until convergence and freeze the page while they do: an example about them
  calls them once on a small trio, never on a timer, and never in a card on a big one.
- Penrose draws for a white page (black text, strokes and arrowheads by default), so diagrams
  sit on `stage.paper`, a light panel. Don't restyle Penrose's defaults for a dark page.
- toSVG takes a third argument the docs leave out: `toSVG(state, pathResolver, namespace)`.
  The namespace prefixes ids (arrowhead markers, clip paths), so two diagrams on one page must
  not share it. `stage.render(state)` passes a per-stage one and shared/images.ts's resolver.
- Image shapes: `href` is a path handed to the resolver, never a URL. shared/images.ts draws
  the available pictures in code (`star.svg`, `house.svg`, …); add one there if you need it.
  An unknown path draws Penrose's "not found" picture and logs an error.
- `resample(state)` seeds from `state.variation`, so it lays out the same sample again unless
  the variation changes first: `resample({ ...state, variation: 'new' })`. `random()`,
  `normalRandom()` and the other samplers are Sampled inputs with no stage, so resample draws
  them again too.
- A card cycles the trio through `variations` (default: `variation`, then `-1`, `-2`, `-3`).

## Degenerate layouts

- A size the Style program leaves free (a Circle's `r`, a Rectangle's `width`) is bounded by
  nothing but `ensureOnCanvas`, and the optimizer often runs it through zero and away: the
  docs' own tutorial-1 trio leaves `r = -3157` with variation "showcase". The tutorial's fix is
  `ensure x.icon.r > 25`. test/penrose-examples.test.ts fails on a negative size or a centre
  off the canvas for every variation a card shows. Bound the sizes, or, when the example is
  the docs' trio verbatim, pick `variations` that lay out cleanly and say why in a comment.
- A trio that shows a degenerate layout on purpose carries the comment
  `-- (degenerate on purpose)`; one that must fail to compile carries `-- (deliberate error)`
  (Style and Substance comments start with `--`, Domain's too).

## Docs vs 3.3.1

- api.md's `isOptimized` example calls `optimize(trio)`; optimize takes the compiled state.
- `diagram()`'s declared type requires `excludeWarnings` in its first argument.
