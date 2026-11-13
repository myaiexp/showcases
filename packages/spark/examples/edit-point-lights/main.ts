// Coloured sphere SDFs as point lights: a MULTIPLY edit dims the garden, ADD_RGBA edits light it up
import * as THREE from 'three';
import { SplatEdit, SplatEditRgbaBlendMode, SplatEditSdf, SplatEditSdfType, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, checkbox } from '../../shared/controls.ts';
import { pushGarden } from '../../shared/subjects.ts';

const LIGHTS = [
  { color: [0.9, 0.35, 0.1], orbit: 1.4, speed: 0.7, phase: 0 },
  { color: [0.1, 0.5, 1.0], orbit: 1.2, speed: -0.5, phase: 2.1 },
  { color: [0.2, 0.9, 0.3], orbit: 0.8, speed: 0.9, phase: 4.2 },
  { color: [0.9, 0.2, 0.8], orbit: 1.6, speed: -0.35, phase: 1 },
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [2.4, 1.7, 3], target: [0, 0.5, 0], orbit: 0.08 });
  const garden = new SplatMesh({ constructSplats: (s) => pushGarden(s, ctx.preview ? 15000 : 40000) });
  stage.scene.add(garden);

  // Edits run in creation order, so the dimming edit must exist before the lights.
  const night = new SplatEdit({ name: 'night', rgbaBlendMode: SplatEditRgbaBlendMode.MULTIPLY });
  // An ALL shape matches every point in space; its colour darkens (and blues) the whole garden.
  night.add(new SplatEditSdf({ type: SplatEditSdfType.ALL, color: new THREE.Color(0.12, 0.13, 0.22), opacity: 1 }));
  garden.add(night);

  // One edit per light: inside a single edit, overlapping SDFs are blended, not summed.
  // Separate ADD_RGBA edits add their light on top of each other where they overlap.
  let radius = 0.5;
  let softEdge = 1.4;
  let brightness = 0.8;
  const count = ctx.preview ? 3 : LIGHTS.length;
  const lights = LIGHTS.slice(0, count).map((l) => {
    const edit = new SplatEdit({ name: 'light', rgbaBlendMode: SplatEditRgbaBlendMode.ADD_RGBA, softEdge });
    // Opacity 0: a non-zero value would make faint splats more opaque.
    const sdf = new SplatEditSdf({ type: SplatEditSdfType.SPHERE, radius, opacity: 0 });
    edit.add(sdf);
    garden.add(edit);
    return { ...l, edit, sdf };
  });
  const tint = (): void => lights.forEach((l) => l.sdf.color.setRGB(l.color[0], l.color[1], l.color[2]).multiplyScalar(brightness));
  tint();

  if (!ctx.preview) {
    const bar = controlBar(el);
    checkbox(bar, 'night (dim ALL)', true, (v) => (night.visible = v));
    slider(bar, 'radius', 0.1, 1.2, 0.05, radius, (v) => ((radius = v), lights.forEach((l) => (l.sdf.radius = v))));
    slider(bar, 'softEdge', 0.1, 2.5, 0.1, softEdge, (v) => ((softEdge = v), lights.forEach((l) => (l.edit.softEdge = v))));
    slider(bar, 'brightness', 0.2, 2, 0.1, brightness, (v) => ((brightness = v), tint()));
  }

  stage.run((time) => {
    for (const l of lights) {
      const a = time * l.speed + l.phase;
      l.sdf.position.set(Math.cos(a) * l.orbit, 0.5 + 0.25 * Math.sin(a * 2), Math.sin(a) * l.orbit);
    }
  });
  return () => stage.dispose();
};

export default mount;
