// Sprite helpers for the 2D chapter: canvas atlases, frames, an ortho scene
import * as pc from 'playcanvas';
import type { MountContext } from '@/types.ts';
import { createStage, type Stage } from './stage.ts';
import { canvasTexture } from './textures.ts';

export interface Frame {
  /** Pixels, from the bottom-left corner of the atlas texture. */
  rect: pc.Vec4;
  pivot: pc.Vec2;
  border: pc.Vec4;
}

/** The frames of a `cols` x `rows` grid of square cells, keyed '0', '1', ... from the top-left. */
export function gridFrames(cols: number, rows: number, cell: number, pivot: [number, number] = [0.5, 0.5]): Record<string, Frame> {
  const frames: Record<string, Frame> = {};
  for (let i = 0; i < cols * rows; i++) {
    const x = (i % cols) * cell;
    const yTop = Math.floor(i / cols) * cell;
    frames[String(i)] = {
      rect: new pc.Vec4(x, rows * cell - yTop - cell, cell, cell),
      pivot: new pc.Vec2(...pivot),
      border: new pc.Vec4(0, 0, 0, 0),
    };
  }
  return frames;
}

/** A texture drawn on a canvas, wrapped in a TextureAtlas that holds `frames`. */
export function createAtlas(
  device: pc.GraphicsDevice,
  size: number,
  draw: (g: CanvasRenderingContext2D, size: number) => void,
  frames: Record<string, Frame>,
  name = 'atlas',
): pc.TextureAtlas {
  const atlas = new pc.TextureAtlas();
  atlas.texture = canvasTexture(device, draw, {
    size,
    name,
    mipmaps: false,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE,
  });
  atlas.frames = frames;
  return atlas;
}

export interface SpriteOptions {
  pixelsPerUnit?: number;
  renderMode?: number;
}

export function createSprite(device: pc.GraphicsDevice, atlas: pc.TextureAtlas, frameKeys: string[], options: SpriteOptions = {}): pc.Sprite {
  return new pc.Sprite(device, { atlas, frameKeys, pixelsPerUnit: options.pixelsPerUnit ?? 64, renderMode: options.renderMode });
}

/** Registers a sprite as a 'sprite' asset, which clips and button sprite states refer to. */
export function spriteAsset(app: pc.AppBase, sprite: pc.Sprite, name: string): pc.Asset {
  const asset = new pc.Asset(name, 'sprite', undefined, {});
  asset.resource = sprite;
  app.assets.add(asset);
  return asset;
}

/** Eight frames of a coin turning: the ellipse narrows to an edge and widens again. */
export function drawCoinFrames(g: CanvasRenderingContext2D, size: number): void {
  const cell = size / 4;
  for (let i = 0; i < 8; i++) {
    const cx = (i % 4) * cell + cell / 2;
    const cy = Math.floor(i / 4) * cell + cell / 2;
    const w = Math.max(0.12, Math.abs(Math.cos((i / 8) * Math.PI * 2))) * cell * 0.4;
    const r = cell * 0.4;
    g.fillStyle = '#b8801a';
    g.beginPath();
    g.ellipse(cx, cy, w + 3, r + 3, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#f5c542';
    g.beginPath();
    g.ellipse(cx, cy, w, r, 0, 0, Math.PI * 2);
    g.fill();
    if (w > cell * 0.12) {
      g.fillStyle = '#b8801a';
      g.font = `bold ${Math.round(cell * 0.2 + w * 0.8)}px sans-serif`;
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText('$', cx, cy + 2);
    }
  }
}

type Shape = (g: CanvasRenderingContext2D, cx: number, cy: number, r: number) => void;
const polygon =
  (points: number, inner = 1, start = -Math.PI / 2): Shape =>
  (g, cx, cy, r) => {
    const n = points * (inner === 1 ? 1 : 2);
    for (let k = 0; k < n; k++) {
      const a = start + (k * Math.PI * 2) / n;
      const rr = inner !== 1 && k % 2 ? r * inner : r;
      if (k) g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
      else g.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
    }
    g.closePath();
  };
const SHAPES: Shape[] = [
  (g, cx, cy, r) => g.arc(cx, cy, r, 0, Math.PI * 2),
  (g, cx, cy, r) => g.rect(cx - r, cy - r, r * 2, r * 2),
  polygon(3),
  polygon(4),
  polygon(5, 0.45),
  (g, cx, cy, r) => {
    g.moveTo(cx, cy + r);
    g.bezierCurveTo(cx - r * 1.6, cy - r * 0.2, cx - r * 0.5, cy - r * 1.2, cx, cy - r * 0.35);
    g.bezierCurveTo(cx + r * 0.5, cy - r * 1.2, cx + r * 1.6, cy - r * 0.2, cx, cy + r);
  },
  polygon(6, 1, 0),
  // An arrow pointing up and to the right, so flips show.
  (g, cx, cy, r) => {
    const pts: [number, number][] = [[-1, 0.2], [0.2, 0.2], [0.2, 1], [1, 0], [0.2, -1], [0.2, -0.2], [-1, -0.2]];
    pts.forEach(([x, y], k) => {
      const rx = (x * 0.7 - y * 0.7) * r * 0.8;
      const ry = -(x * 0.7 + y * 0.7) * r * 0.8;
      if (k) g.lineTo(cx + rx, cy + ry);
      else g.moveTo(cx + rx, cy + ry);
    });
    g.closePath();
  },
];
export const ICON_COLOURS = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa', '#f472b6', '#2dd4bf', '#fb7185'];

/** Eight icons in a 4 x 2 grid of equal cells (a 256 px atlas has 64 px cells). */
export function drawIconGrid(g: CanvasRenderingContext2D, size: number): void {
  const cell = size / 4;
  SHAPES.forEach((shape, i) => {
    g.fillStyle = ICON_COLOURS[i]!;
    g.strokeStyle = 'rgba(0,0,0,0.35)';
    g.lineWidth = 3;
    g.beginPath();
    shape(g, (i % 4) * cell + cell / 2, Math.floor(i / 4) * cell + cell / 2, cell * 0.38);
    g.fill();
    g.stroke();
  });
}

/** A 64 px panel whose 16 px border is a bevelled frame with corner studs: made for 9-slicing. */
export function drawPanel(g: CanvasRenderingContext2D, x = 0, y = 0, s = 64, b = 16): void {
  g.fillStyle = '#3d4a63';
  g.fillRect(x, y, s, s);
  g.fillStyle = '#8fa3c8';
  g.fillRect(x + 3, y + 3, s - 6, 4);
  g.fillRect(x + 3, y + 3, 4, s - 6);
  g.fillStyle = '#232b3b';
  g.fillRect(x + b, y + b, s - b * 2, s - b * 2);
  g.fillStyle = '#f2c14e';
  for (const [px, py] of [[8, 8], [s - 8, 8], [8, s - 8], [s - 8, s - 8]] as const) {
    g.beginPath();
    g.arc(x + px, y + py, 3, 0, Math.PI * 2);
    g.fill();
  }
  // A diagonal stripe in the middle, so stretching and tiling look different.
  g.strokeStyle = '#34405a';
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(x + b, y + s - b);
  g.lineTo(x + s - b, y + b);
  g.stroke();
}

/** One 64 px panel frame with 16 px borders, as the atlas frame data wants it. */
export function panelFrame(): Frame {
  return { rect: new pc.Vec4(0, 0, 64, 64), pivot: new pc.Vec2(0.5, 0.5), border: new pc.Vec4(16, 16, 16, 16) };
}

export interface SpriteScene {
  stage: Stage;
  app: pc.Application;
  camera: pc.Entity;
  dispose(): void;
}

/** An orthographic camera looking down -z at the xy plane, for sprite components. */
export async function createSpriteScene(
  el: HTMLElement,
  ctx: MountContext,
  { orthoHeight = 2.5, clear = '#14171f', height }: { orthoHeight?: number; clear?: string; height?: number } = {},
): Promise<SpriteScene> {
  const stage = await createStage(el, ctx, { height });
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', {
    projection: pc.PROJECTION_ORTHOGRAPHIC,
    orthoHeight,
    clearColor: new pc.Color().fromString(clear),
  });
  camera.setPosition(0, 0, 10);
  stage.app.root.addChild(camera);
  return { stage, app: stage.app, camera, dispose: () => stage.dispose() };
}

/** An entity with a sprite component, added to the app root. */
export function addSprite(app: pc.AppBase, name: string, data: Record<string, unknown>, position: [number, number, number] = [0, 0, 0]): pc.Entity {
  const e = new pc.Entity(name);
  e.addComponent('sprite', data);
  e.setLocalPosition(...position);
  app.root.addChild(e);
  return e;
}
