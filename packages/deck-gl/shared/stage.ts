// Shared deck.gl setup: sized box, a GPU device it owns, a release that frees it
import { luma } from '@luma.gl/core';
import type { Device } from '@luma.gl/core';
import { webgl2Adapter } from '@luma.gl/webgl';
import type { MountContext } from '@/types.ts';

/**
 * deck.gl 9.4 traps found while building this gallery, for whoever adds the next example:
 * - Deck.finalize() never frees the WebGL context: luma's device.destroy() is a no-op for
 *   the devices Deck creates (_reuseDevices). Chrome keeps ~16 live contexts and then drops
 *   the oldest, which blanks other cards. So every example renders on `stage.device` (Deck's
 *   documented `device` prop) and cleans up with `stage.release(deck)`, which finalizes and
 *   then loses the context on purpose.
 * - A Deck given `device` draws on that device's canvas and puts tooltips and widgets in
 *   the canvas's parent: `stage.box`, which is position: relative.
 * - Preview cards have no pointer input: pass `controller: !preview` (or false) so a card
 *   never grabs wheel events, and animate the view or the layers on a timer instead.
 * - A view state set from code (`viewState`) is not normalized the way a controller's is:
 *   at a longitude past ±180° the MapView draws nothing. Wrap a drifting longitude with
 *   ((lng + 180) % 360) - 180.
 * - GeoJsonLayer draws circle points with its fill: filled: false hides them.
 * - Billboarded icons and text at a high pitch sink into a ground layer's depth; give the
 *   layer parameters: { depthCompare: 'always' }.
 * - TextLayer builds its glyph atlas once per characterSet / fontFamily / fontSettings: when
 *   a control changes one, give the layer a new id so the atlas is rebuilt.
 * - IconLayer.iconAtlas is typed string | Texture although the docs allow a canvas: pass
 *   canvas.toDataURL().
 * - GeoJsonLayer's prefixed accessors (getIcon, getText) take an untyped feature: annotate
 *   it as Feature<Geometry, Props>.
 * - Layers in an OrbitView or OrthographicView need coordinateSystem: CARTESIAN.
 * - Accessors that read changing state need updateTriggers, or a fresh layer per change.
 * - landLayer() is for world and country scale. At city zoom it is one flat fill that
 *   z-fights with coplanar polygons (they vanish in some frames): leave it out and pass
 *   createStage a land-coloured background instead.
 * - TerrainLayer's loader fetches its worker from unpkg unless loadOptions.terrain.workerUrl
 *   points at the bundled one: spread shared/geo-layers-terrain.ts terrainLoadOptions.
 * - Tiles are ~170-340px wide whatever tileSize says, so a card shows one or two: use
 *   tileSize: 64 in cards. Coarse H3 cells across the antimeridian or a pole wrap the world.
 * - With an array of views, viewState is a map keyed by view id ({left: s, right: s}).
 * - GlobeViewport.project puts far-side points on screen: hide them with an angle test.
 * - Flat ground under a road in a FirstPersonView z-fights: lower the ground slightly.
 * - Mutating a light or effect needs deck.redraw(reason). Rebuilding a shadow-casting
 *   LightingEffect every frame recreates its shadow maps: mutate one and redraw. After
 *   toggling a light's _shadow, effect.setProps(effect.props) re-reads the casters.
 * - data.attributes given a luma Buffer of float colours needs type: 'float32'.
 * - A change to an extension's constructor options (filterSize, fp64, dashMode) needs a new
 *   layer id. CollisionFilterExtension tests the anchor pixel: a label whose anchor falls
 *   outside its own glyphs is always hidden.
 * - TimelineWidget with autoPlay: true calls onTimeChange inside the Deck constructor, so a
 *   callback that uses `deck` overflows the stack: leave autoPlay off, call play() after.
 * - Widgets move the camera through onViewStateChange: a card that drifts the view needs a
 *   controlled viewState that onViewStateChange also stores. Button widgets can be pressed
 *   from code with .click().
 * - ScaleWidget draws black text and lines whatever the theme: give it a light plate.
 * - getTooltip hides with null, not undefined.
 * - dataComparator, dataTransform and _dataDiff are typed generically: take unknown and
 *   narrow inside. onDataLoad does not fire per batch of an async-iterable `data`.
 * - A card can drive real picking without a pointer: deck.pickObject at a
 *   viewport.project() point. getViewports() is empty until the first render.
 * - Aggregation bins are sized in metres (pixels for ScreenGridLayer): a card at a lower
 *   zoom needs bigger bins, and ContourLayer thresholds scale with cell area.
 * - HexagonLayer/GridLayer fall back to CPU (with a warning) when a getColorValue,
 *   getElevationValue or custom aggregator is set: pass gpuAggregation: false.
 * - A standalone Attribute (outside a layer) needs noAlloc: true plus setData(), and
 *   delete() on cleanup.
 */

/** Stage heights: a gallery card is 200px; the full view gets room to explore. */
export const PREVIEW_HEIGHT = 200;
export const FULL_HEIGHT = 460;

export interface StageOptions {
  /** Height in the full view, in CSS pixels. */
  height?: number;
  /** Height in a preview card; 200 fills the card. */
  previewHeight?: number;
  /** Where the box goes; defaults to the mount element. */
  parent?: HTMLElement;
  /** Background behind the canvas. Default: the dark map ocean. */
  background?: string;
}

export interface Stage {
  /** Full-width, position: relative box holding the canvas, tooltips and widgets. */
  box: HTMLDivElement;
  canvas: HTMLCanvasElement;
  /** WebGL2 device on `canvas`. Pass it to `new Deck({device})`. */
  device: Device;
  preview: boolean;
  /** Finalizes the decks (if given), frees the WebGL context and removes the box. */
  release(...decks: ({ finalize(): void } | null | undefined)[]): void;
}

/** Ocean colour of the shared basemap, also the default stage background. */
export const OCEAN = '#0b1622';

/**
 * Builds the box and canvas and creates the device. Resolves after the device exists;
 * rejects with an AbortError (and frees the device) if the card unmounts meanwhile.
 */
export async function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Promise<Stage> {
  const { preview, signal } = ctx;
  const box = document.createElement('div');
  box.style.position = 'relative';
  box.style.width = '100%';
  box.style.height = `${preview ? (opts.previewHeight ?? PREVIEW_HEIGHT) : (opts.height ?? FULL_HEIGHT)}px`;
  box.style.borderRadius = preview ? '0' : '8px';
  box.style.overflow = 'hidden';
  box.style.background = opts.background ?? OCEAN;
  box.style.flex = 'none';
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  box.append(canvas);
  (opts.parent ?? el).append(box);

  const device = await luma.createDevice({
    type: 'webgl',
    adapters: [webgl2Adapter],
    // A card is small and short-lived: 1x pixels keep six of them cheap.
    createCanvasContext: { canvas, useDevicePixels: preview ? 1 : true, autoResize: true },
  });

  let released = false;
  const release: Stage['release'] = (...decks) => {
    if (released) return;
    released = true;
    for (const deck of decks) deck?.finalize();
    device.loseDevice();
    box.remove();
  };
  if (signal.aborted) {
    release();
    throw new DOMException('unmounted while the device was being created', 'AbortError');
  }
  return { box, canvas, device, preview, release };
}

/**
 * Runs `tick(t)` every animation frame with t in seconds since the start; returns a stop
 * function. For previews that move the camera or a layer prop on their own.
 */
export function animate(tick: (t: number) => void): () => void {
  let raf = 0;
  const start = performance.now();
  const frame = (now: number): void => {
    tick((now - start) / 1000);
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}
