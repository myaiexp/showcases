// Card helper: a fake pointer that visits a list of nodes one after another, once the layout has settled
import type { NodeObject } from 'force-graph';
import type { Ghost } from './ghost.ts';
import type { Stage } from './stage.ts';

/**
 * Hovers `nodes()[i]` every `every` ms, starting `start` ms after mount (when the layout has
 * stopped moving, since the hover lookup repaints at most every 800 ms). The next target is
 * worked out first and `i` advances once, so a `find` callback never runs the counter itself.
 */
export function hoverTour<N extends NodeObject>(
  stage: Stage,
  ghost: Ghost,
  nodes: () => readonly (N | undefined)[],
  { start = 3200, every = 1800 }: { start?: number; every?: number } = {},
): void {
  let i = 0;
  const step = (): void => {
    const list = nodes();
    const target = list[i % Math.max(1, list.length)];
    i++;
    if (target) ghost.node(target);
  };
  stage.after(start, () => {
    step();
    stage.every(every, step);
  });
}

interface Ended {
  source?: unknown;
  target?: unknown;
}

/**
 * Like `hoverTour`, for links: the pointer goes to the middle of each link in turn. Links must
 * have been through the layout (their ends are node objects), and the layout should have settled.
 */
export function linkTour<L extends Ended>(
  stage: Stage,
  ghost: Ghost,
  links: () => readonly (L | undefined)[],
  { start = 3200, every = 1800 }: { start?: number; every?: number } = {},
): void {
  let i = 0;
  const step = (): void => {
    const list = links();
    const target = list[i % Math.max(1, list.length)];
    i++;
    const a = target?.source as NodeObject | undefined;
    const b = target?.target as NodeObject | undefined;
    if (a && b && typeof a === 'object' && typeof b === 'object') ghost.at(((a.x ?? 0) + (b.x ?? 0)) / 2, ((a.y ?? 0) + (b.y ?? 0)) / 2);
  };
  stage.after(start, () => {
    step();
    stage.every(every, step);
  });
}

/**
 * Runs `run` over and over, starting `start` ms after mount, for scripted card sequences. `wait(ms)`
 * pauses inside it; after dispose a pending wait never settles, which ends the loop.
 */
export function script(stage: Stage, run: (wait: (ms: number) => Promise<void>) => Promise<void>, start = 3200): void {
  const wait = (ms: number): Promise<void> => new Promise((res) => stage.after(ms, res));
  stage.after(start, async () => {
    while (!stage.disposed) await run(wait);
  });
}

/** The middle of a link whose ends the layout has turned into node objects, in graph coordinates. */
export function linkMid(link: Ended | undefined): { x: number; y: number } | null {
  const a = link?.source as NodeObject | undefined;
  const b = link?.target as NodeObject | undefined;
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return null;
  return { x: ((a.x ?? 0) + (b.x ?? 0)) / 2, y: ((a.y ?? 0) + (b.y ?? 0)) / 2 };
}
