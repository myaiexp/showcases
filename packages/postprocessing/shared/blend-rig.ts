// Blending examples: a colourful layer texture and a blendFunction picker
import * as THREE from 'three';
import { BlendFunction, type Effect } from 'postprocessing';
import type { Stage } from './stage.ts';
import { overlay, select, slider } from './controls.ts';

export type BlendName = Exclude<keyof typeof BlendFunction, 'SKIP' | 'SET'>;

/** One line per function, condensed from the BlendFunction enum's JSDoc. */
export const BLEND_NOTES: Record<BlendName, string> = {
  ADD: 'additive, supports HDR',
  ALPHA: 'blends by the layer alpha',
  AVERAGE: 'mean of both colours, supports HDR',
  COLOR: 'HSL: hue and saturation of the layer',
  COLOR_BURN: 'color burn',
  COLOR_DODGE: 'color dodge',
  DARKEN: 'darker colour wins, supports HDR',
  DIFFERENCE: 'colour difference, supports HDR',
  DIVIDE: 'colour division, supports HDR',
  DST: 'keeps the base, ignores opacity, supports HDR',
  EXCLUSION: 'colour exclusion',
  HARD_LIGHT: 'hard light',
  HARD_MIX: 'hard mix',
  HUE: 'HSL: hue of the layer',
  INVERT: 'inverted layer replaces the base',
  INVERT_RGB: 'layer times the inverted base',
  LIGHTEN: 'lighter colour wins, supports HDR',
  LINEAR_BURN: 'linear burn',
  LINEAR_DODGE: 'ADD limited to 1',
  LINEAR_LIGHT: 'linear light',
  LUMINOSITY: 'HSL: luminosity of the layer',
  MULTIPLY: 'colour multiplication, supports HDR',
  NEGATION: 'negates the base using the layer',
  NORMAL: 'layer replaces the base, supports HDR',
  OVERLAY: 'overlay',
  PIN_LIGHT: 'pin light',
  REFLECT: 'colour reflection',
  SATURATION: 'HSL: saturation of the layer',
  SCREEN: 'both projected on a white screen',
  SOFT_LIGHT: 'soft light',
  SRC: 'layer replaces the base, ignores opacity, supports HDR',
  SUBTRACT: 'layer subtracted from the base',
  VIVID_LIGHT: 'vivid light',
};

export const ALL_BLENDS = Object.keys(BLEND_NOTES) as BlendName[];

/**
 * A colour-picker style picture: hue along x, light to dark down the top two thirds, a grey
 * ramp below. `fade` makes the alpha fall off from the middle (for BlendFunction.ALPHA).
 */
export function blendLayer(fade = false): THREE.CanvasTexture {
  const w = 512;
  const h = 512;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;
  const top = (h * 2) / 3;
  const hue = g.createLinearGradient(0, 0, w, 0);
  for (let i = 0; i <= 6; i++) hue.addColorStop(i / 6, `hsl(${i * 60} 100% 50%)`);
  g.fillStyle = hue;
  g.fillRect(0, 0, w, top);
  const shade = g.createLinearGradient(0, 0, 0, top);
  shade.addColorStop(0, 'rgba(255,255,255,0.9)');
  shade.addColorStop(0.5, 'rgba(255,255,255,0)');
  shade.addColorStop(0.5, 'rgba(0,0,0,0)');
  shade.addColorStop(1, 'rgba(0,0,0,0.9)');
  g.fillStyle = shade;
  g.fillRect(0, 0, w, top);
  const ramp = g.createLinearGradient(0, 0, w, 0);
  ramp.addColorStop(0, '#000');
  ramp.addColorStop(1, '#fff');
  g.fillStyle = ramp;
  g.fillRect(0, top, w, h - top);
  if (fade) {
    g.globalCompositeOperation = 'destination-in';
    const a = g.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, w * 0.55);
    a.addColorStop(0, 'rgba(0,0,0,1)');
    a.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = a;
    g.fillRect(0, 0, w, h);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export interface Picker {
  set(name: BlendName): void;
}

/**
 * Names the current blend function over the stage. The full view gets a select and an opacity
 * slider; a card steps through `names` every `ms`.
 */
export function blendPicker(stage: Stage, effect: Effect, names: readonly BlendName[], opacity = 1, ms = 2000): Picker {
  const label = overlay(stage.box);
  const set = (name: BlendName): void => {
    effect.blendMode.blendFunction = BlendFunction[name];
    label.textContent = `BlendFunction.${name}\n${BLEND_NOTES[name]}`;
  };
  effect.blendMode.opacity.value = opacity;
  set(names[0]!);
  if (stage.bar) {
    select(stage.bar, 'blendFunction', names, set, names[0]);
    slider(stage.bar, 'opacity', 0, 1, 0.01, opacity, (v) => (effect.blendMode.opacity.value = v));
  } else {
    let i = 0;
    stage.every(ms, () => set(names[++i % names.length]!));
  }
  return { set };
}
