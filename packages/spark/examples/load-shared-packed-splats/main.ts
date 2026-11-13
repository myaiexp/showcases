// One PackedSplats feeding a ring of SplatMesh clones with own transform, tint
import * as THREE from 'three';
import { PackedSplats, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, readout, slider } from '../../shared/controls.ts';
import { wrapInCard } from '../../shared/labels.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const MAX_CLONES = 12;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 2.4, 4.6], target: [0, 0.1, 0], orbit: 0.2 });
  const label = overlay(el);
  wrapInCard(label, ctx.preview);

  // The splat data exists once. Every SplatMesh below points at this same object.
  const source = new PackedSplats();
  pushTorusKnot(source, ctx.preview ? 4000 : 9000);

  const clones: SplatMesh[] = [];
  for (let i = 0; i < MAX_CLONES; i++) {
    const clone = new SplatMesh({ packedSplats: source });
    const a = (i / MAX_CLONES) * Math.PI * 2;
    clone.position.set(Math.cos(a) * 1.9, Math.sin(a * 2) * 0.25, Math.sin(a) * 1.9);
    clone.scale.setScalar(0.45 + 0.25 * ((i % 3) / 2));
    clone.rotation.set(a, a * 0.5, 0);
    // recolor multiplies the shared colours, per mesh.
    clone.recolor.setHSL(a / (Math.PI * 2), 1, 0.6);
    stage.scene.add(clone);
    clones.push(clone);
  }

  const show = (n: number): void => {
    // Hide rather than dispose: disposing any one SplatMesh also frees the PackedSplats they share.
    clones.forEach((c, i) => (c.visible = i < n));
    label.textContent = `1 PackedSplats, ${source.numSplats} splats, ${((source.numSplats * 16) / 1024).toFixed(0)} KB\n${n} SplatMesh clones draw ${n * source.numSplats} splats`;
  };
  const initial = ctx.preview ? 6 : 8;
  show(initial);

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'clones', 1, MAX_CLONES, 1, initial, show);
    readout(el, 'Each clone has its own position, scale, rotation and recolor; the splat data is shared.');
  }

  const spin = new THREE.Euler();
  stage.run((t) => {
    clones.forEach((c, i) => {
      spin.set(t * 0.4 + i, t * 0.25 + i * 0.5, 0);
      c.rotation.copy(spin);
    });
  });
  return () => stage.dispose();
};

export default mount;
