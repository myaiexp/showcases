// Shared UI helpers: UICanvas stage, button art, builders, scripted pointer
import { type Camera, Color, type Entity, type Sprite, SpriteDrawMode, Vector2 } from '@galacean/engine';
import { Button, CanvasRenderMode, Image, ResolutionAdaptationMode, Text, UICanvas, type UITransform } from '@galacean/engine-ui';
import type { MountContext } from '@/types.ts';
import { lin, tick } from './gfx-kit.ts';
import { addCamera, createStage, type Stage, type StageOptions } from './stage.ts';
import { spriteOf, type Pen } from './twod-kit.ts';

export interface UIScene {
  stage: Stage;
  root: Entity;
  camera: Camera;
  /** The entity holding the root UICanvas. */
  canvasEntity: Entity;
  canvas: UICanvas;
}

export interface UIOptions extends StageOptions {
  mode?: CanvasRenderMode;
  /** Reference resolution height: the UI is laid out in this many units top to bottom (default 400). */
  refHeight?: number;
}

/** A stage, a camera and a root UICanvas that scales by height, so cards (200px) and full views (440px) look alike. */
export async function uiScene(el: HTMLElement, ctx: MountContext, o: UIOptions = {}): Promise<UIScene> {
  const stage = await createStage(el, ctx, { background: [0.03, 0.04, 0.07, 1], ...o });
  const camera = addCamera(stage.root, [0, 0, 10], [0, 0, 0]);
  const canvasEntity = stage.root.createChild('canvas');
  const canvas = canvasEntity.addComponent(UICanvas);
  canvas.renderMode = o.mode ?? CanvasRenderMode.ScreenSpaceOverlay;
  if (canvas.renderMode === CanvasRenderMode.ScreenSpaceCamera) canvas.renderCamera = camera;
  const ref = o.refHeight ?? 400;
  canvas.resolutionAdaptationMode = ResolutionAdaptationMode.HeightAdaptation;
  canvas.referenceResolution.set(ref * 2, ref);
  return { stage, root: stage.root, camera, canvasEntity, canvas };
}

/** The UITransform of an entity that has a UI component (UI components add it automatically). */
export const rect = (e: Entity): UITransform => e.transform as UITransform;

/** Places `entity` at (x, y) from its parent's centre, with a size and pivot. */
export function layout(entity: Entity, x: number, y: number, w: number, h: number): UITransform {
  const t = rect(entity);
  t.size = new Vector2(w, h);
  t.position.set(x, y, 0);
  return t;
}

const whites = new WeakMap<object, Sprite>();

/** A plain white sprite for flat colour panels: an Image with no sprite draws nothing. */
export function whiteSprite(engine: Stage['engine']): Sprite {
  let sprite = whites.get(engine);
  if (!sprite) {
    sprite = spriteOf(engine, 8, 8, (g) => ((g.fillStyle = '#fff'), g.fillRect(0, 0, 8, 8)));
    whites.set(engine, sprite);
  }
  return sprite;
}

export interface ImageOptions {
  sprite?: Sprite;
  color?: [number, number, number, number];
}

/** A child of `parent` with an Image at (x, y), `w` x `h`, optionally with a sprite and sRGB tint. */
export function image(parent: Entity, x: number, y: number, w: number, h: number, o: ImageOptions = {}, name = 'image'): { entity: Entity; image: Image } {
  const entity = parent.createChild(name);
  const img = entity.addComponent(Image);
  layout(entity, x, y, w, h);
  img.sprite = o.sprite ?? whiteSprite(parent.engine as Stage['engine']);
  if (o.color) img.color = new Color(...lin([o.color[0], o.color[1], o.color[2]]), o.color[3]);
  return { entity, image: img };
}

/** A child of `parent` with a Text at (x, y). */
export function label(parent: Entity, x: number, y: number, text: string, fontSize = 28, name = 'text'): { entity: Entity; text: Text } {
  const entity = parent.createChild(name);
  const t = entity.addComponent(Text);
  layout(entity, x, y, 300, fontSize * 1.4);
  t.text = text;
  t.fontSize = fontSize;
  return { entity, text: t };
}

/** A flat rounded-corner sprite for buttons and panels: `fill` with a lighter top edge. */
export const roundedArt = (fill: string, edge = '#ffffff55', radius = 10): Pen => (g, w, h) => {
  g.fillStyle = fill;
  g.beginPath();
  g.roundRect(1, 1, w - 2, h - 2, radius);
  g.fill();
  g.strokeStyle = edge;
  g.lineWidth = 2;
  g.stroke();
};

/** A rounded 9-slice sprite (border `radius` px on a 64 px square) in `fill`. */
export function panelSprite(engine: Stage['engine'], fill: string, radius = 14): Sprite {
  const b = radius / 64;
  return spriteOf(engine, 64, 64, roundedArt(fill, '#ffffff66', radius), { border: [b, b, b, b] });
}

/** A Button (entity with Image + Button + a Text child) at (x, y); `fill` is the normal sprite colour. */
export function button(parent: Entity, engine: Stage['engine'], x: number, y: number, w: number, h: number, caption: string, fill = '#3b6fd4'): { entity: Entity; image: Image; button: Button; text: Text } {
  const sprite = panelSprite(engine, '#ffffff');
  const { entity, image: img } = image(parent, x, y, w, h, { sprite }, `button ${caption}`);
  img.drawMode = SpriteDrawMode.Sliced;
  const [r, g, b] = [fill.slice(1, 3), fill.slice(3, 5), fill.slice(5, 7)].map((v) => Number.parseInt(v, 16) / 255) as [number, number, number];
  img.color = new Color(...lin([r, g, b]), 1);
  const btn = entity.addComponent(Button);
  const text = label(entity, 0, 0, caption, Math.min(30, h * 0.45)).text;
  return { entity, image: img, button: btn, text };
}

export interface Ghost {
  /** Moves the fake pointer to UI units (0, 0 is the canvas centre, y up) and sends a pointermove. */
  move(ux: number, uy: number): void;
  down(): void;
  up(): void;
  /** Hides the cursor dot. */
  hide(): void;
}

/**
 * A scripted pointer for cards: real PointerEvents dispatched on the stage canvas (so the engine's own
 * picking runs) with a dot drawn where it is. `ref` is the canvas' reference height in UI units.
 */
export function ghost(stage: Stage, ref = 400): Ghost {
  const canvas = stage.canvas;
  const dot = document.createElement('div');
  dot.style.cssText = 'position:absolute;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;border:2px solid #fff;background:rgba(255,255,255,.35);pointer-events:none;display:none;z-index:2';
  const host = canvas.parentElement!;
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  host.append(dot);
  stage.own(() => dot.remove());
  let x = 0;
  let y = 0;
  const send = (type: string, buttons: number): void => {
    const r = canvas.getBoundingClientRect();
    canvas.dispatchEvent(new PointerEvent(type, { pointerId: 7, pointerType: 'mouse', isPrimary: true, bubbles: true, clientX: r.left + x, clientY: r.top + y, button: buttons ? 0 : -1, buttons }));
  };
  let pressed = false;
  return {
    move(ux, uy) {
      const scale = canvas.clientHeight / ref;
      x = canvas.clientWidth / 2 + ux * scale;
      y = canvas.clientHeight / 2 - uy * scale;
      dot.style.display = 'block';
      dot.style.left = `${canvas.offsetLeft + x}px`;
      dot.style.top = `${canvas.offsetTop + y}px`;
      send('pointermove', pressed ? 1 : 0);
    },
    down() {
      pressed = true;
      dot.style.background = 'rgba(255,255,255,.9)';
      send('pointerdown', 1);
    },
    up() {
      pressed = false;
      dot.style.background = 'rgba(255,255,255,.35)';
      send('pointerup', 0);
    },
    hide() {
      dot.style.display = 'none';
    },
  };
}

/** Runs `events` (`[seconds, fn]`) once per `length`-second loop, driven by engine time through a Script. */
export function timeline(entity: Entity, length: number, events: [number, () => void][]): void {
  let prev = -1;
  tick(entity, (_dt, t) => {
    const now = t % length;
    if (now < prev) prev = -1; // the loop wrapped
    for (const [at, fn] of events) if (at > prev && at <= now) fn();
    prev = now;
  });
}
