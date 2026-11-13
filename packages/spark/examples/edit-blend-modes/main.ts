// The three SplatEdit blend modes side by side, each driven by a sphere SDF sweeping through a knot
import * as THREE from 'three';
import { SplatEdit, SplatEditRgbaBlendMode, SplatEditSdf, SplatEditSdfType, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, overlay } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const MODES = [
  // Multiply: the sphere's RGBA scales each splat's RGBA, here a moving shadow.
  { mode: SplatEditRgbaBlendMode.MULTIPLY, color: new THREE.Color(0.12, 0.12, 0.12), opacity: 1 },
  // Set RGB: splats inside take the sphere's colour outright; alpha is ignored.
  { mode: SplatEditRgbaBlendMode.SET_RGB, color: new THREE.Color(1, 0.85, 0.2), opacity: 1 },
  // Add RGBA: the colour is added. Opacity 0 so faint splats don't turn solid.
  { mode: SplatEditRgbaBlendMode.ADD_RGBA, color: new THREE.Color(0.1, 0.5, 1), opacity: 0 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.4, ctx.preview ? 6.5 : 4], orbit: 0.08 });
  const label = overlay(el);

  const sdfs: SplatEditSdf[] = [];
  const edits: SplatEdit[] = [];
  MODES.forEach(({ mode, color, opacity }, i) => {
    const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 15000 : 30000) });
    knot.position.x = (i - 1) * 2.1;
    // A SplatEdit placed under a SplatMesh edits that mesh only.
    const edit = new SplatEdit({ rgbaBlendMode: mode, softEdge: 0.15 });
    const sphere = new SplatEditSdf({ type: SplatEditSdfType.SPHERE, radius: 0.35, color, opacity });
    edit.add(sphere);
    knot.add(edit);
    stage.scene.add(knot);
    sdfs.push(sphere);
    edits.push(edit);
  });
  label.textContent = MODES.map((m) => m.mode.toUpperCase()).join(ctx.preview ? ' · ' : '   ·   ');

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'radius', 0.1, 1, 0.05, 0.35, (v) => sdfs.forEach((s) => (s.radius = v)));
    slider(bar, 'softEdge', 0, 0.5, 0.01, 0.15, (v) => edits.forEach((e) => (e.softEdge = v)));
  }

  stage.run((time) => {
    // Sweep each sphere around its knot; edits read the SDF transform every frame.
    for (const sdf of sdfs) sdf.position.set(Math.cos(time * 0.8) * 0.7, Math.sin(time * 0.8) * 0.7, 0);
  });
  return () => stage.dispose();
};

export default mount;
