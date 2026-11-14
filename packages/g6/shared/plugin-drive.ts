// Helpers that let cards drive plugins without a pointer, plus fullscreen fixes
import type { Fullscreen, Graph, IElementEvent } from '@antv/g6';

/**
 * Tooltip.show and Contextmenu.show read `client` (browser coordinates), `target.id`
 * and `targetType` from the event they are given. A card has no pointer, so build that event from where
 * the element sits on screen and call the plugin's public show() with it.
 */
export function elementEvent(graph: Graph, id: string): IElementEvent {
  const [x = 0, y = 0] = graph.getClientByCanvas(graph.getElementPosition(id));
  // Only the fields the plugins read exist; G6 builds the full event from a real pointer.
  return { client: { x, y }, target: { id }, targetType: graph.getElementType(id) } as unknown as IElementEvent;
}

type FullscreenInternals = { unbindEvents(): void; shortcut: { destroy(): void }; request: () => void; exit: () => void };

/**
 * Fullscreen 5.1.1 hands its unbound request/exit methods to the shortcut table, so a trigger
 * key throws on `this`. Bind them, then call updatePlugin to make the plugin register them again.
 */
export function bindFullscreenKeys(graph: Graph, key: string, fs: Fullscreen): void {
  const inner = fs as unknown as FullscreenInternals;
  inner.request = inner.request.bind(fs);
  inner.exit = inner.exit.bind(fs);
  graph.updatePlugin({ key });
}

/** Fullscreen.destroy() leaves its document and window listeners behind: remove them first. */
export function releaseFullscreen(fs: Fullscreen): void {
  const inner = fs as unknown as FullscreenInternals;
  inner.unbindEvents();
  inner.shortcut.destroy();
}

/** Fisheye and EdgeFilterLens take a pointer event; only `canvas` (canvas coordinates) is read. */
export type LensHandler = (event: { canvas: { x: number; y: number } }) => void;

/** The handler a lens plugin binds to the pointer, for cards that have none. */
export function lensHandler(plugin: unknown, name: 'onCreateFisheye' | 'onEdgeFilter'): LensHandler {
  return (plugin as Record<string, LensHandler>)[name]!;
}

/** Canvas-coordinate point at the centre of node `id`, as the lens handlers expect it. */
export function atNode(graph: Graph, id: string): { canvas: { x: number; y: number } } {
  const [x = 0, y = 0] = graph.getElementPosition(id);
  return { canvas: { x, y } };
}

/**
 * Plays a node drag the way drag-element would report it: dragstart, a few moves, dragend.
 * Snapline listens to those node events, so a card can show its guides without a pointer.
 */
export async function dragNode(graph: Graph, id: string, to: [number, number], steps = 6, hold = 700): Promise<void> {
  // `context` is private in the typings; the element registry is what snapline reads `target` from.
  const { context } = graph as unknown as { context: { element: { getElement(id: string): unknown } } };
  const target = context.element.getElement(id);
  const [x0 = 0, y0 = 0] = graph.getElementPosition(id);
  graph.emit('node:dragstart', { target });
  for (let i = 1; i <= steps; i++) {
    const x = x0 + ((to[0] - x0) * i) / steps;
    const y = y0 + ((to[1] - y0) * i) / steps;
    await graph.translateElementTo({ [id]: [x, y] }, false);
    graph.emit('node:drag', { target, dx: (to[0] - x0) / steps, dy: (to[1] - y0) / steps });
    await new Promise((r) => setTimeout(r, 60));
  }
  // Keep the guides on screen for a moment before the drag ends and hides them.
  await new Promise((r) => setTimeout(r, hold));
  graph.emit('node:dragend', { target });
}
