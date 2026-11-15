// Shared 2D helpers: ortho stage, code-drawn sprites, sprite placement
import { Camera, type Engine, type Entity, Rect, Sprite, SpriteRenderer, Texture2D, Vector2, Vector4 } from '@galacean/engine';
import type { MountContext } from '@/types.ts';
import { createStage, type Stage, type StageOptions } from './stage.ts';

export type Pen = (g: CanvasRenderingContext2D, w: number, h: number) => void;

export interface Scene2D {
  stage: Stage;
  engine: Engine;
  root: Entity;
  camera: Camera;
}

/** A stage with an orthographic camera `size` world units tall, looking down -Z at the origin. */
export async function scene2d(el: HTMLElement, ctx: MountContext, options: StageOptions & { size?: number } = {}): Promise<Scene2D> {
  const stage = await createStage(el, ctx, { background: [0.03, 0.04, 0.07, 1], ...options });
  const entity = stage.root.createChild('camera');
  entity.transform.setPosition(0, 0, 10);
  const camera = entity.addComponent(Camera);
  camera.isOrthographic = true;
  camera.orthographicSize = (options.size ?? 4) / 2;
  return { stage, engine: stage.engine, root: stage.root, camera };
}

/** A `w` x `h` px texture painted by `draw` (no mipmaps: none are generated for a canvas upload). */
export function textureOf(engine: Engine, w: number, h: number, draw: Pen): Texture2D {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  draw(canvas.getContext('2d')!, w, h);
  const texture = new Texture2D(engine, w, h, undefined, false);
  texture.setImageSource(canvas);
  return texture;
}

export interface SpriteOptions {
  region?: [number, number, number, number];
  pivot?: [number, number];
  border?: [number, number, number, number];
}

/** A Sprite over a fresh code-drawn texture (the whole texture unless `region` says otherwise). */
export function spriteOf(engine: Engine, w: number, h: number, draw: Pen, o: SpriteOptions = {}): Sprite {
  return spriteFrom(engine, textureOf(engine, w, h, draw), o);
}

export function spriteFrom(engine: Engine, texture: Texture2D, o: SpriteOptions = {}): Sprite {
  return new Sprite(
    engine,
    texture,
    o.region ? new Rect(...o.region) : undefined,
    o.pivot ? new Vector2(...o.pivot) : undefined,
    o.border ? new Vector4(...o.border) : undefined,
  );
}

/** A child of `parent` at (x, y) drawing `sprite`; `w`/`h` set the renderer size in world units. */
export function place(parent: Entity, sprite: Sprite, x = 0, y = 0, w?: number, h?: number, name = 'sprite'): SpriteRenderer {
  const entity = parent.createChild(name);
  entity.transform.setPosition(x, y, 0);
  const renderer = entity.addComponent(SpriteRenderer);
  renderer.sprite = sprite;
  if (w !== undefined) renderer.width = w;
  if (h !== undefined) renderer.height = h;
  return renderer;
}

/** A 128 px test image: four coloured quadrants, a letter F and a corner dot, so crops and flips read at a glance. */
export const compass: Pen = (g, w, h) => {
  const colours = ['#e0524d', '#4cae6a', '#4d7fe0', '#e2b83f'];
  colours.forEach((c, i) => {
    g.fillStyle = c;
    g.fillRect((i % 2) * (w / 2), Math.floor(i / 2) * (h / 2), w / 2, h / 2);
  });
  g.strokeStyle = 'rgba(255,255,255,.8)';
  g.lineWidth = w / 32;
  g.strokeRect(w / 64, h / 64, w - w / 32, h - h / 32);
  g.fillStyle = '#fff';
  g.font = `bold ${h * 0.62}px sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('F', w / 2, h / 2 + h * 0.04);
  g.fillStyle = '#111';
  g.beginPath();
  g.arc(w * 0.14, h * 0.14, w * 0.07, 0, Math.PI * 2);
  g.fill();
};

/** A 96 px panel for nine-slice: a 24 px border (a quarter) with round corner studs, stripes on the edges. */
export const panelArt: Pen = (g, w, h) => {
  const b = w / 4;
  g.fillStyle = '#2d3b5c';
  g.fillRect(0, 0, w, h);
  g.fillStyle = '#4b6a9f';
  g.fillRect(b, b, w - 2 * b, h - 2 * b);
  g.fillStyle = '#7ea3d8';
  for (let i = b; i < w - b; i += b / 2) {
    g.fillRect(i, 0, b / 4, b);
    g.fillRect(i, h - b, b / 4, b);
    g.fillRect(0, i, b, b / 4);
    g.fillRect(w - b, i, b, b / 4);
  }
  g.fillStyle = '#ffcf5a';
  for (const [cx, cy] of [[b / 2, b / 2], [w - b / 2, b / 2], [b / 2, h - b / 2], [w - b / 2, h - b / 2]] as const) {
    g.beginPath();
    g.arc(cx, cy, b * 0.38, 0, Math.PI * 2);
    g.fill();
  }
  g.strokeStyle = '#fff';
  g.lineWidth = 2;
  g.strokeRect(b, b, w - 2 * b, h - 2 * b);
};

/** A 32 px tile with a bevel and a diamond, for tiled draw modes. */
export const tileArt: Pen = (g, w, h) => {
  g.fillStyle = '#5b8a72';
  g.fillRect(0, 0, w, h);
  g.fillStyle = '#7fb89a';
  g.fillRect(0, 0, w, h * 0.12);
  g.fillRect(0, 0, w * 0.12, h);
  g.fillStyle = '#3c6450';
  g.fillRect(0, h * 0.88, w, h * 0.12);
  g.fillRect(w * 0.88, 0, w * 0.12, h);
  g.fillStyle = '#e8d27a';
  g.beginPath();
  g.moveTo(w / 2, h * 0.25);
  g.lineTo(w * 0.75, h / 2);
  g.lineTo(w / 2, h * 0.75);
  g.lineTo(w * 0.25, h / 2);
  g.closePath();
  g.fill();
};

/** A soft-edged disc with a transparent rim: a mask shape (alpha falls from 1 to 0 toward the edge). */
export const softDisc: Pen = (g, w, h) => {
  const grad = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.55, 'rgba(255,255,255,1)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, w, h);
};

/** A five-point star in `fill`, for masks and sprites with a clear silhouette. */
export const star = (fill = '#ffd23f'): Pen => (g, w, h) => {
  g.fillStyle = fill;
  g.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = (i % 2 ? 0.2 : 0.48) * w;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    g.lineTo(w / 2 + Math.cos(a) * r, h / 2 + Math.sin(a) * r);
  }
  g.closePath();
  g.fill();
  g.strokeStyle = '#a86b00';
  g.lineWidth = w / 40;
  g.stroke();
};

/** A horizontal colour stripe image: bands from left to right, for width and pivot demos. */
export const bands: Pen = (g, w, h) => {
  const n = 6;
  for (let i = 0; i < n; i++) {
    g.fillStyle = `hsl(${(i / n) * 300} 65% 55%)`;
    g.fillRect((i * w) / n, 0, w / n + 1, h);
  }
  g.strokeStyle = 'rgba(0,0,0,.45)';
  g.lineWidth = 3;
  g.strokeRect(1.5, 1.5, w - 3, h - 3);
};

/** A flat rectangle (an 8 px white sprite stretched and tinted): backdrops and bounds boxes. */
export function box(parent: Entity, engine: Engine, x: number, y: number, w: number, h: number, rgba: [number, number, number, number] = [0.2, 0.28, 0.45, 1], priority = -10): SpriteRenderer {
  const r = place(parent, spriteOf(engine, 8, 8, (g) => ((g.fillStyle = '#fff'), g.fillRect(0, 0, 8, 8))), x, y, w, h, 'box');
  r.color.set(...rgba);
  r.priority = priority;
  return r;
}
