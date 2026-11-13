// Pick a splat: see its 16 packed bytes, decoded fields, and a marker in scene
import * as THREE from 'three';
import { PackedSplats, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, slider } from '../../shared/controls.ts';
import { wrapInCard } from '../../shared/labels.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';
import { createLayoutView } from './layout.ts';

const COUNT = 1200;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.4, 2.8], orbit: 0.25 });

  const packed = new PackedSplats();
  pushTorusKnot(packed, COUNT);
  const knot = new SplatMesh({ packedSplats: packed });
  stage.scene.add(knot);

  // One big white splat parked on the chosen splat's centre (the knot has an identity transform).
  const marker = new SplatMesh({
    constructSplats: (s) =>
      s.pushSplat(new THREE.Vector3(), new THREE.Vector3(0.06, 0.06, 0.06), new THREE.Quaternion(), 1, new THREE.Color(1, 1, 1)),
  });
  stage.scene.add(marker);

  const label = overlay(el);
  wrapInCard(label, ctx.preview);
  const view = ctx.preview ? null : createLayoutView(el);
  const select = (index: number): void => {
    const { center } = packed.getSplat(index);
    marker.position.copy(center);
    const bytes = view ? view.show(packed, index).header : bytesOf(index);
    label.textContent = `splat #${index}\n${bytes}`;
  };
  const bytesOf = (index: number): string => {
    const arr = packed.packedArray!;
    const b = new Uint8Array(arr.buffer, arr.byteOffset + index * 16, 16);
    return Array.from(b, (v) => v.toString(16).padStart(2, '0')).join(' ');
  };
  select(0);

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'splat index', 0, COUNT - 1, 1, 0, select);
  }

  let tick = 0;
  stage.run((t) => {
    // Cards step through splats on their own, twice a second.
    const now = Math.floor(t * 2);
    if (ctx.preview && now !== tick) select(((tick = now) * 97) % COUNT);
  });
  return () => stage.dispose();
};

export default mount;
