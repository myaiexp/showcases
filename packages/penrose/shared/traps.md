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
- api.md's `stepMillis` flips a flag from setTimeout inside `until`, but step() is synchronous:
  the timer cannot fire until step returns, so it runs to the end of the round. Read a
  deadline (`performance.now() > deadline`) in `until` instead (api-step-millis).
- A Style field named `x.label` is the Substance label (a string) of `x`; assigning a shape
  to it is "cyclic variable assignments". Name label shapes `x.text` or similar.
- `diagram()`'s declared type requires `excludeWarnings` in its first argument.
- ref/domain/predicates.md opens with `type FirstType, SecondType`. On 3.3.1 a comma in a type
  declaration is a syntax error (the error text points at the wrong line); declare one `type` per line.
  Substance's `Set A, B, C` is fine. Domain's `predicate P3 ()` (empty list, space before the parens) parses.
- A Style block must start with `forall` (or `collect`/`layout`): a bare `where P3() { … }` is a syntax
  error. A zero-argument predicate is matched with `forall T x where P3()`.
- An `Equation` whose label is empty is a fatal error ("Label 'string' and 'fontSize' must be non-empty"),
  so `NoLabel D` with `D.text = Equation { string : D.label … }` fails; a `Text` shape accepts it.
- ref/substance/statements.md says an argument list may hold "other predicate applications", but Domain has
  no type for a predicate result (`predicate Not(Prop p)` fails: type Prop does not exist), so nesting
  cannot be declared on 3.3.1.
- `AutoLabel A, C` (a list of names, not just `All`) works though ref/substance/statements.md lists only All.
- Inline shape bodies need newlines between fields: `Text { string : "7" center : (0, 0) }` is a syntax error.

## Constraint and objective functions (3.3.1)

- `overlappingEllipses` and `overlappingCircleEllipse` throw "polynomial roots not supported" in
  `optimize()` (the compiled energy uses `PolyRoots`), so no example uses them.
- `bboxPts` and `rectPts` describe their order as top-left first, but `bboxPts` returns
  top-right, top-left, bottom-left, bottom-right, which is what the `contains*Rect*` functions
  expect. Pass `bboxPts(shape)` to them. `containsCircleRect` ignores padding and treats the rectangle
  as a circle of radius max(width, height), so it is conservative.
- Objective `below(bottom, top)` and `leftwards(left, right)` have their sign flipped: they send the first
  shape above, respectively to the right of, the second. `above` and `rightwards` are right.
- Objective `nearVec` and `near` minimise distance^2 minus offset^2, lowest at distance 0, so their offset
  does nothing; `centerLabel`'s `padding` is likewise a constant. `notTooClose`'s `weight` only applies to Lines.
- `repelScalar` has no weight, so pixel-sized inputs give a negligible push; divide the arguments by 10000.
- `nonDegenerateAngle` is stationary at a perfectly flat angle: the default strength of 20 never leaves it.
- Constraints and objectives are soft penalties; a free pull (`encourage nearPt(...)`) shows a constraint
  working. `inDirection` is an equality on the projection, not a bound.
- Free polygon points need a start (`(?[x], ?[y])`); with random ones the optimizer often tangles the polygon.

## Shapes, sampling, passthrough and stages (3.3.1)

- `from` is a reserved word in Style: `t.from = Circle {…}` is a syntax error, reported at the end of the block
  ("Unexpected from token"), not at the name.
- `Polygon`/`Polyline` `scale` is an SVG `scale(s)` about the diagram's top-left corner, while the points are in
  screen coordinates, so `scale : 0.5` also slides the shape towards that corner (shape-polygon-scale shows it).
  Neither shape has a centre; to move one, write the points as offsets from unknowns.
- Arrowhead styles on `Line` and `Path`: `none` (default), `straight`, `concave`, `perp`, `line`, `doubleLine`,
  `loopup`, `loopdown`, `loop`. `flipStartArrowhead` and the two size properties are in units of `strokeWidth`.
- A static scene (all values fixed) has nothing for a card to animate. Add an unknown pinned by an equality
  (`dx = ?` with `ensure dx == 0`) and offset the shapes by it: the scene slides in from a sampled position.
- Passthrough values are skipped when the renderer already wrote the attribute: `fill`, `fillOpacity` and
  `strokeOpacity` lose to `fillColor`/`strokeColor`; `opacity`, `strokeLinejoin`, `fillRule`, `strokeDashoffset`,
  `letterSpacing` and `textDecoration` get through, also on a `Group` (its `<g>`).
- `Group.shapes` members are rendered inside the group only; the clip shape of `clip(s)` is a member and is not
  drawn itself. Layering a member (`r1 above b1`) moves its whole group.
- TeX in a Style string keeps its backslashes (`string : "\frac{1}{2}"`); in a JS template literal write `\\frac`.
- Random samples: `randomIndex(1, 5)` gives the integers 1 to 4. `diskRandom()`, `circleRandom()` and
  `sphereRandom()` return unit vectors (`sphereRandom` has three components); scale them. Each call is its own sample.
- `layout = [a, b, a]` (a repeated stage) compiles and solves; `ensure … in [s1, s2]` and `? in [s1, s2]` take lists.
- Text `center` is the anchor point for `textAnchor: "start"`/`"end"`, so a box built from `t.text.center` only
  fits a middle-anchored text (shape-text-box-misaligned).
- ref/style/expressions.md assigns one component of a vector, `x.shape.center[0] = 50`. On 3.3.1 that is the error
  "Cannot directly assign to or delete an index … of a larger structure". Assign the whole vector instead
  (`override x.shape.center = (50, 100)`); reading `x.shape.center[0]` is fine.
- ref/style/namespaces.md says values in a namespace cannot be overwritten. On 3.3.1 `override ns.field = …` inside a
  selector block compiles, and later reads of `ns.field` see the new value.
- A shape can be a namespace field (`frame { box = Rectangle { … } }`) and be read as `frame.box` from any block.
- A `Line` whose start and end coincide makes the optimizer fail with "NaN in xs" (a self-edge drawn between a node and
  itself). Draw self-edges as a mark on the node instead.
- `delete x.f` leaves later blocks that read `x.f` failing for the types that deleted it, even `layer x.f above …` and
  `ensure … x.f …`. A shape that must survive the delete can share a position field (`x.pos`) with the shape that stays.
- `perspective()` negates y (its matrix has `-f` at [1][1], the docs print `+f`), while `ortho()` keeps y up. With the
  usual viewport `(-w/2, -h/2, w, h)` a perspective cube comes out upside down. Use a viewport with a negative height,
  `(-w/2, h/2, w, -h)`, for perspective, the normal one for ortho. `lookAt` and the other matrices are fine.
- `project()` and `projectList()` return the depth too (3-vectors, not 2D points as the docs say), so a circle centre
  takes `(p[0], p[1])` (a list of them is read as `P[i][0]`, `P[i][1]`).
- ref/style/vectors-matrices.md names `rotate2D`, `scale2D`, `rotate3Dh`; the functions are lower-case (`rotate2d`,
  `scale2d`, `rotate3dh`). The computation functions ending in `2d`, `3d`, `3dh` are case-sensitive.
- `projectDepth` with `perspective(…)` returns a depth that is not in [0, 1] and grows as the point gets nearer
  (the matrix has +2fn/(f-n) where OpenGL has the negative): corners 4 to 8 units from the eye with near 1 and far 12 give
  about 1.22 to 1.32. `ortho()` depth follows the docs. Measure the range before mapping it to a size or colour.
- A header whose literal variables can take the same value (`where At(v, x, y, z)` with `At(a, -1, -1, -1)`) matches
  nothing without `repeatable`: non-repeatable matching refuses two style variables on one Substance literal.
- ref/style/selectors.md says `match_id` and `match_total` can be overwritten. `override match_id = match_total + 1 - match_id`
  is "cyclic variable assignments" on 3.3.1; read them into a new local (`rank = match_total + 1 - match_id`) instead.
