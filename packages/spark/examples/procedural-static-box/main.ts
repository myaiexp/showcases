// generators.staticBox: a box of random splats that re-sample their positions every frame
import * as THREE from 'three';
import { generators, type SplatGenerator } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, checkbox, readout } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [2.6, 1.8, 3.4], orbit: 0.2 });
  const status = ctx.preview ? null : readout(el);
  const p = { cells: ctx.preview ? 12 : 16, dot: 0.025, tinted: false, opacity: 1 };

  let box: SplatGenerator | null = null;
  const rebuild = (): void => {
    if (box) stage.scene.remove(box);
    box = generators.staticBox({
      box: new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1)),
      // The box is cut into cells x cells x cells; each cell holds one splat that jumps within it.
      cells: new THREE.Vector3(p.cells, p.cells, p.cells),
      dotScale: p.dot,
      // Leave `color` out and each splat takes its position in the box as RGB.
      color: p.tinted ? new THREE.Color(0.9, 0.95, 1) : undefined,
      opacity: p.opacity,
    });
    stage.scene.add(box);
    if (status) status.textContent = `${p.cells ** 3} splats, re-sampled every frame`;
  };
  rebuild();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'cells per axis', 4, 30, 1, p.cells, (v) => ((p.cells = v), rebuild()));
    slider(bar, 'dotScale', 0.005, 0.15, 0.005, p.dot, (v) => ((p.dot = v), rebuild()));
    slider(bar, 'opacity', 0.1, 1, 0.1, p.opacity, (v) => ((p.opacity = v), rebuild()));
    checkbox(bar, 'single colour', p.tinted, (v) => ((p.tinted = v), rebuild()));
  }

  stage.run();
  return () => stage.dispose();
};

export default mount;
