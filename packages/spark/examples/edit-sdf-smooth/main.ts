// Three SDFs in one SET_RGB edit, with sdfSmooth blending their colours and softEdge feathering the boundaries
import * as THREE from 'three';
import { SplatEdit, SplatEditRgbaBlendMode, SplatEditSdf, SplatEditSdfType, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, overlay } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.3, 3.6], orbit: 0.1 });
  const label = overlay(el);

  const knot = new SplatMesh({ constructSplats: (s) => pushTorusKnot(s, ctx.preview ? 20000 : 50000) });
  stage.scene.add(knot);

  const edit = new SplatEdit({ rgbaBlendMode: SplatEditRgbaBlendMode.SET_RGB, sdfSmooth: 0.3, softEdge: 0.1 });
  const sphere = new SplatEditSdf({ type: SplatEditSdfType.SPHERE, radius: 0.45, color: new THREE.Color(1, 0.1, 0.1) });
  const box = new SplatEditSdf({ type: SplatEditSdfType.BOX, radius: 0.05, color: new THREE.Color(0.1, 0.9, 0.2) });
  box.scale.set(0.35, 0.35, 0.5);
  const capsule = new SplatEditSdf({ type: SplatEditSdfType.CAPSULE, radius: 0.18, color: new THREE.Color(0.2, 0.4, 1) });
  capsule.scale.set(1, 1.2, 1);
  edit.add(sphere, box, capsule);
  knot.add(edit);

  if (!ctx.preview) {
    const bar = controlBar(el);
    // sdfSmooth: softmax scale for blending between shapes. softEdge: width of each shape's own edge.
    slider(bar, 'sdfSmooth', 0, 1, 0.02, edit.sdfSmooth, (v) => (edit.sdfSmooth = v));
    slider(bar, 'softEdge', 0, 0.6, 0.02, edit.softEdge, (v) => (edit.softEdge = v));
  }

  stage.run((time) => {
    // The shapes drift toward and past each other so their regions keep overlapping.
    sphere.position.set(Math.cos(time * 0.7) * 0.9, Math.sin(time * 0.5) * 0.3, 0);
    box.position.set(Math.cos(time * 0.7 + 2.1) * 0.9, Math.sin(time * 0.6 + 1) * 0.4, 0);
    capsule.position.set(Math.cos(time * 0.7 + 4.2) * 0.9, 0, Math.sin(time * 0.4) * 0.2);
    capsule.rotation.z = time * 0.6;
    if (ctx.preview) edit.sdfSmooth = 0.02 + 0.5 * (0.5 + 0.5 * Math.sin(time * 0.8));
    label.textContent = `sdfSmooth ${edit.sdfSmooth.toFixed(2)}   softEdge ${edit.softEdge.toFixed(2)}`;
  });
  return () => stage.dispose();
};

export default mount;
