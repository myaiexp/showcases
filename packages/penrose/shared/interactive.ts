// A draggable Penrose diagram: translate, pin, re-solve; scripted drags for cards
import {
  compile,
  getAllInteractiveIdxs,
  getTranslatedInputsIdxs,
  scaleVaryingValues,
  showError,
  start,
  toSVG,
  translateVaryingValues,
  type PenroseState,
} from '@penrose/core';
import { parseDragConstraint } from './drag-constraint.ts';
import { resolveImage } from './images.ts';
import type { Trio } from './layout.ts';
import { el } from './opt-svg.ts';
import { solve } from './solver.ts';
import type { Stage } from './stage.ts';
import { wirePointer } from './interactive-input.ts';

export { scriptedDrag } from './interactive-input.ts';

/** One drag in progress: the dragged shape's inputs are pinned until `release`. */
export interface Grip {
  /** Puts the shape (dx, dy) canvas units (y up) from where it was grabbed, then re-solves. */
  to(dx: number, dy: number): void;
  /** Scales the shape's width/height or radius by (sx, sy) from how it was grabbed; null-op if it is not scalable. */
  scale(sx: number, sy: number): void;
  release(): void;
}

export interface Interactive {
  readonly state: PenroseState;
  /** Paths of the shapes whose centres (or points) are all sampled inputs. */
  translatable(): string[];
  /** Paths of the shapes whose size is a sampled input (radius, width and height). */
  scalable(): string[];
  /** Paths whose Style gave a `draggingConstraint`. */
  constrained(): string[];
  /** Starts a drag of the shape at `path`; null when it is not translatable. */
  grab(path: string): Grip | null;
  pinned(): string[];
  setPinned(path: string, on: boolean): void;
  unpinAll(): void;
  /** Samples everything again (pins dropped) and solves from there. */
  reset(): void;
}

export interface InteractiveOptions {
  /** `play` drags only shapes with a draggingConstraint and applies it; `edit` drags any translatable shape. */
  mode: 'edit' | 'play';
  /** Edit Mode pins what you moved; Play Mode lets go on release. Default: pin in edit mode. */
  pinOnRelease?: boolean;
  /** Real pointer dragging on the paper; off in cards, which script their drags. */
  pointer?: boolean;
  /** Called after each drawing, with the svg and the shape elements by path. */
  onDraw?(svg: SVGSVGElement, state: PenroseState): void;
}

/**
 * Compiles `trio` and keeps solving it. A drag writes new input values with
 * translateVaryingValues, masks the dragged inputs out of the optimizer (`inputMask`,
 * which is what a pin is), resets the optimizer's params with `start`, and solves again.
 */
export async function createInteractive(stage: Stage, trio: Trio, o: InteractiveOptions): Promise<Interactive | null> {
  const res = await compile({ ...trio, variation: trio.variation ?? 'showcase' });
  if (res.isErr()) {
    stage.fail(showError(res.error));
    return null;
  }
  if (stage.disposed) return null;
  const compiled = res.value;
  let state = compiled;
  /** Input indices the optimizer must leave alone, by the path that pinned them. */
  const pins = new Map<string, number[]>();
  let job: AbortController | null = null;
  let titles = new Map<string, SVGElement>();
  let svgNow: SVGSVGElement | null = null;
  let drawing = false;
  let queued: PenroseState | null = null;
  const pinOnRelease = o.pinOnRelease ?? o.mode === 'edit';

  const pinnedIdxs = (): Set<number> => new Set([...pins.values()].flat());
  const withPins = (s: PenroseState): PenroseState => {
    const masked = pinnedIdxs();
    const constraintSets = new Map(
      [...compiled.constraintSets].map(([stageName, m]) => [stageName, { ...m, inputMask: m.inputMask.map((on, i) => on && !masked.has(i)) }]),
    );
    return { ...s, constraintSets };
  };

  const draw = async (s: PenroseState): Promise<void> => {
    if (drawing) {
      queued = s;
      return;
    }
    drawing = true;
    try {
      const cache = new Map<string, SVGElement>();
      const svg = await toSVG(s, resolveImage, stage.namespace, false, cache);
      if (stage.disposed) return;
      titles = cache;
      svgNow = stage.show(svg);
      decorate(svgNow, s);
      o.onDraw?.(svgNow, s);
    } catch (err) {
      stage.fail(err);
    } finally {
      drawing = false;
    }
    if (queued) {
      const next = queued;
      queued = null;
      void draw(next);
    }
  };

  /** Red boxes round pinned shapes, as the editor draws them; grab cursors on the draggable ones. */
  const decorate = (svg: SVGSVGElement, s: PenroseState): void => {
    const draggable = o.mode === 'play' ? constrained() : translatable();
    for (const path of draggable) {
      const node = titles.get(path);
      if (node) (node as SVGElement).style.cursor = 'grab';
    }
    const box = el('g', { 'pointer-events': 'none' }, svg);
    for (const path of pins.keys()) {
      const node = titles.get(path) as SVGGraphicsElement | undefined;
      try {
        const b = node?.getBBox();
        if (b) el('rect', { x: b.x - 3, y: b.y - 3, width: b.width + 6, height: b.height + 6, fill: 'none', stroke: '#e03131', 'stroke-width': 2 }, box);
      } catch {
        // no layout engine (a test): the pin is just not outlined
      }
    }
    void s;
  };

  const translatable = (): string[] => [...state.interactivityInfo.translatableShapePaths];
  const constrained = (): string[] => [...state.interactivityInfo.draggingConstraints.keys()].filter((p) => state.interactivityInfo.translatableShapePaths.has(p));

  const run = (s: PenroseState): void => {
    job?.abort();
    job = new AbortController();
    state = withPins(s);
    solve(state, {
      signal: job.signal,
      onStep(next) {
        state = next;
        void draw(next);
      },
      onError: (err) => stage.fail(err),
    });
    void draw(state);
  };
  stage.onDispose(() => job?.abort());

  const restartFrom = (varyingValues: number[]): void => {
    run({ ...state, varyingValues, params: start(varyingValues.length), currentStageIndex: 0 });
  };

  const api: Interactive = {
    get state() {
      return state;
    },
    translatable,
    scalable: () => [...state.interactivityInfo.scalableShapePaths],
    constrained,
    grab(path) {
      if (!state.interactivityInfo.translatableShapePaths.has(path)) return null;
      const pairs = getTranslatedInputsIdxs(path, state);
      const parent = [...state.varyingValues];
      const [cx, cy] = [parent[pairs[0]![0]]!, parent[pairs[0]![1]]!];
      const body = state.interactivityInfo.draggingConstraints.get(path);
      const limit = o.mode === 'play' && body ? parseDragConstraint(body) : null;
      pins.set(path, [...getAllInteractiveIdxs(path, state)]);
      return {
        to(dx, dy) {
          let [mx, my] = [dx, dy];
          // draggingConstraint maps the wanted position of the shape to the allowed one.
          if (limit) {
            const [ax, ay] = limit(cx + dx, cy + dy);
            [mx, my] = [ax - cx, ay - cy];
          }
          // Like the editor, never drag a shape's centre off the canvas.
          const [hw, hh] = [state.canvas.width / 2 - 10, state.canvas.height / 2 - 10];
          mx = Math.min(hw, Math.max(-hw, cx + mx)) - cx;
          my = Math.min(hh, Math.max(-hh, cy + my)) - cy;
          restartFrom(translateVaryingValues(path, mx, my, parent, state.varyingValues, state));
        },
        scale(sx, sy) {
          if (!state.interactivityInfo.scalableShapePaths.has(path)) return;
          restartFrom(scaleVaryingValues(path, sx, sy, parent, state.varyingValues, state));
        },
        release() {
          if (!pinOnRelease) pins.delete(path);
          restartFrom([...state.varyingValues]);
        },
      };
    },
    pinned: () => [...pins.keys()],
    setPinned(path, on) {
      if (on && state.interactivityInfo.translatableShapePaths.has(path)) pins.set(path, [...getAllInteractiveIdxs(path, state)]);
      else pins.delete(path);
      restartFrom([...state.varyingValues]);
    },
    unpinAll() {
      pins.clear();
      restartFrom([...state.varyingValues]);
    },
    reset() {
      pins.clear();
      run({ ...compiled });
    },
  };

  if (o.pointer && !stage.preview) wirePointer(stage, api, () => svgNow, () => titles, o.mode);
  run(compiled);
  return api;
}
