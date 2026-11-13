// A field of sphere SDFs whose displace vectors change every frame: wind in the canopies, or a ground wave
import * as THREE from 'three';
import { SplatEdit, SplatEditSdf, SplatEditSdfType, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, select } from '../../shared/controls.ts';
import { pushGarden } from '../../shared/subjects.ts';

const MODES = ['wind', 'wave'] as const;
const LAYERS = [
  { y: 0.2, sway: 0.25 }, // ground level barely sways in the wind
  { y: 1.05, sway: 1 }, // the canopies
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [2.4, 1.6, 3], target: [0, 0.6, 0], orbit: 0.1 });
  const garden = new SplatMesh({ constructSplats: (s) => pushGarden(s, ctx.preview ? 15000 : 40000) });
  stage.scene.add(garden);

  // The default blend mode, MULTIPLY, with white SDFs leaves colour alone, so only displacement shows.
  const edit = new SplatEdit({ sdfSmooth: 0.5, softEdge: 0.6 });
  garden.add(edit);

  // A 5x5 grid of spheres on two layers. Each carries its own displace vector;
  // sdfSmooth blends neighbouring vectors into a smooth field.
  const cells: { sdf: SplatEditSdf; x: number; z: number; sway: number }[] = [];
  for (const { y, sway } of LAYERS) {
    for (let ix = -2; ix <= 2; ix++) {
      for (let iz = -2; iz <= 2; iz++) {
        const sdf = new SplatEditSdf({ type: SplatEditSdfType.SPHERE, radius: 1.1 });
        sdf.position.set(ix, y, iz);
        edit.add(sdf);
        cells.push({ sdf, x: ix, z: iz, sway });
      }
    }
  }

  const p = { mode: 'wind' as (typeof MODES)[number], amp: 0.3, speed: 2.5 };
  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'motion', MODES, (v) => (p.mode = v));
    slider(bar, 'amplitude', 0, 0.5, 0.02, p.amp, (v) => (p.amp = v));
    slider(bar, 'speed', 0.5, 6, 0.5, p.speed, (v) => (p.speed = v));
    slider(bar, 'sdfSmooth', 0, 1.5, 0.05, edit.sdfSmooth, (v) => (edit.sdfSmooth = v));
    slider(bar, 'softEdge', 0, 1.5, 0.05, edit.softEdge, (v) => (edit.softEdge = v));
  }

  const dir = new THREE.Vector2(0.8, 0.6);
  stage.run((time) => {
    const mode = ctx.preview ? MODES[Math.floor(time / 6) % 2]! : p.mode;
    const amp = ctx.preview ? 0.3 : p.amp;
    for (const { sdf, x, z, sway } of cells) {
      // A travelling phase: every cell is a little behind its upwind neighbour.
      const phase = time * p.speed - (x * dir.x + z * dir.y) * 1.2;
      if (mode === 'wind') sdf.displace.set(Math.sin(phase) * amp * sway, 0, Math.cos(phase * 0.7) * amp * sway * 0.5);
      else sdf.displace.set(0, Math.sin(phase) * amp, 0);
    }
  });
  return () => stage.dispose();
};

export default mount;
