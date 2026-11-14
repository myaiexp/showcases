// User Interface chapter helpers: a screen, a canvas font and element builders
import * as pc from 'playcanvas';
import type { MountContext } from '@/types.ts';
import { createStage, type Stage, type StageOptions } from './stage.ts';

export const COL = {
  bg: '#14171f',
  panel: '#292e3b',
  panelLight: '#3a4258',
  accent: '#ff8c33',
  blue: '#3a8cff',
  green: '#4cc38a',
  red: '#e5484d',
  text: '#e8ebf2',
  dim: '#8a93a8',
};

export const color = (hex: string): pc.Color => new pc.Color().fromString(hex);

/** Everything the examples type: ASCII, Latin accents, a few symbols. */
export const GLYPHS =
  ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~' +
  'àáâãäåæçèéêëìíîïñòóôõöùúûüýÿÀÉÈÊÎÔÛÇß…“”•×÷←→↑↓✓';

export interface UiOptions extends StageOptions {
  /** Reference resolution of the screen (Blend). Default 640 x 400. */
  ref?: [number, number];
  /** Scale Blend: 0 follows the canvas width, 1 its height. Default 1. */
  blend?: number;
  clear?: string;
  /** Scale mode: 'blend' (default) or 'none'. */
  scaleMode?: 'blend' | 'none';
  screenSpace?: boolean;
  /** Skip the canvas font, for examples that draw no text. */
  noFont?: boolean;
}

export interface Ui {
  stage: Stage;
  app: pc.Application;
  camera: pc.Entity;
  /** The root entity with the screen component. */
  screen: pc.Entity;
  font: pc.CanvasFont | null;
  /** Destroys the font, then the stage. Call it last in the cleanup. */
  dispose(): void;
}

/**
 * A stage with a camera and one screen-space screen scaled with Blend. Text elements need a
 * font asset, which means a file; fonts.md names `pc.CanvasFont`, which draws the glyphs
 * with the browser's fonts into textures instead, so every label here uses one.
 */
export async function createUi(el: HTMLElement, ctx: MountContext, options: UiOptions = {}): Promise<Ui> {
  const stage = await createStage(el, ctx, { elementInput: true, ...options });
  const { app } = stage;
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', { clearColor: color(options.clear ?? COL.bg) });
  app.root.addChild(camera);

  const screen = new pc.Entity('screen');
  screen.addComponent('screen', {
    screenSpace: options.screenSpace ?? true,
    scaleMode: options.scaleMode === 'none' ? pc.SCALEMODE_NONE : pc.SCALEMODE_BLEND,
    referenceResolution: options.ref ?? [640, 400],
    scaleBlend: options.blend ?? 1,
  });
  app.root.addChild(screen);

  let font: pc.CanvasFont | null = null;
  if (!options.noFont) {
    font = new pc.CanvasFont(app, { fontName: 'Arial, sans-serif', fontSize: 64, color: new pc.Color(1, 1, 1), width: 1024, height: 1024 });
    font.createTextures(GLYPHS);
  }
  return {
    stage,
    app,
    camera,
    screen,
    font,
    dispose() {
      font?.destroy();
      stage.dispose();
    },
  };
}

export interface ElementProps {
  type?: string;
  anchor?: number[];
  pivot?: number[];
  [key: string]: unknown;
}

/** An entity with an element component, centred on its parent unless props say otherwise. */
export function addElement(parent: pc.Entity, name: string, props: ElementProps = {}, pos?: [number, number]): pc.Entity {
  const e = new pc.Entity(name);
  e.addComponent('element', { type: pc.ELEMENTTYPE_IMAGE, anchor: [0.5, 0.5, 0.5, 0.5], pivot: [0.5, 0.5], ...props });
  if (pos) e.setLocalPosition(pos[0], pos[1], 0);
  parent.addChild(e);
  return e;
}

export const addGroup = (parent: pc.Entity, name: string, props: ElementProps = {}, pos?: [number, number]): pc.Entity =>
  addElement(parent, name, { type: pc.ELEMENTTYPE_GROUP, ...props }, pos);

/** A text element in the canvas font. The font is set before the text so no warning is logged. */
export function addText(ui: Ui, parent: pc.Entity, text: string, props: ElementProps = {}, pos?: [number, number]): pc.Entity {
  const { color: tint, ...rest } = props;
  const e = addElement(parent, `text ${text.slice(0, 12)}`, { type: pc.ELEMENTTYPE_TEXT, fontSize: 28, color: tint ?? color(COL.text), ...rest }, pos);
  e.element!.font = ui.font!;
  e.element!.text = text;
  return e;
}

/** A button: an image element with input, a button component and a centred label. */
export function addButton(
  ui: Ui,
  parent: pc.Entity,
  label: string,
  { tint = COL.accent, width = 180, height = 56, button = {}, ...props }: ElementProps & { tint?: string; width?: number; height?: number; button?: Record<string, unknown> } = {},
  pos?: [number, number],
): pc.Entity {
  const base = color(tint);
  const shade = (k: number): pc.Color => new pc.Color(Math.min(1, base.r * k), Math.min(1, base.g * k), Math.min(1, base.b * k));
  const b = addElement(parent, `button ${label}`, { width, height, color: base, useInput: true, ...props }, pos);
  b.addComponent('button', { imageEntity: b, hoverTint: shade(1.25), pressedTint: shade(0.7), ...button });
  if (label) addText(ui, b, label, { fontSize: Math.min(28, height * 0.5), color: color('#161820') });
  return b;
}

/**
 * Fires the element events a button component listens to, because a card has no pointer:
 * the button goes through its hover and pressed states exactly as it would for a real one.
 */
export function pressButton(button: pc.Entity, steps: ('mouseenter' | 'mousedown' | 'mouseup' | 'click' | 'mouseleave')[]): void {
  const element = button.element!;
  for (const s of steps) element.fire(s, { element, event: null });
}

/** A rectangular texture drawn on a canvas, for image elements (canvasTexture is square). */
export function imageTexture(device: pc.GraphicsDevice, width: number, height: number, draw: (g: CanvasRenderingContext2D) => void): pc.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext('2d')!);
  const texture = new pc.Texture(device, {
    name: 'ui-image',
    width,
    height,
    format: pc.PIXELFORMAT_SRGBA8,
    mipmaps: false,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE,
  });
  texture.setSource(canvas);
  return texture;
}

/** Runs `steps` at their times (seconds) in every cycle of `period` seconds. */
export function timeline(app: pc.AppBase, period: number, steps: [number, () => void][]): void {
  let t = 0;
  let next = 0;
  app.on('update', (dt: number) => {
    t += dt;
    while (next < steps.length && t >= steps[next]![0]) steps[next++]![1]();
    if (t >= period) {
      t -= period;
      next = 0;
    }
  });
}

/** Steps for `timeline`: hover, press, release with a click, then leave, starting at `at`. */
export function clickSteps(button: pc.Entity, at = 0): [number, () => void][] {
  return [
    [at, () => pressButton(button, ['mouseenter'])],
    [at + 0.6, () => pressButton(button, ['mousedown'])],
    [at + 0.9, () => pressButton(button, ['mouseup', 'click'])],
    [at + 1.5, () => pressButton(button, ['mouseleave'])],
  ];
}

/** Calls `step(n)` every `period` seconds from an update listener of the app. */
export function every(app: pc.AppBase, period: number, step: (n: number) => void): void {
  let t = period * 0.6;
  let n = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (t >= period) {
      t -= period;
      step(n++);
    }
  });
}
