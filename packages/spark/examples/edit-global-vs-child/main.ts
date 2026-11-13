// A SplatEdit at the scene root hits every editable mesh; one under a SplatMesh hits that mesh only
import * as THREE from 'three';
import { SplatEdit, SplatEditRgbaBlendMode, SplatEditSdf, SplatEditSdfType, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, checkbox, overlay } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.2, 5.4], fov: 50, orbit: false });
  overlay(el, ctx.preview ? 'A global   B +own   C opted out' : 'A: global edit   B: global + its own edit   C: editable = false');

  const knots = [-2.4, 0, 2.4].map((x) => {
    const knot = new SplatMesh({ constructSplats: (s) => pushTorusKnot(s, ctx.preview ? 9000 : 25000) });
    knot.position.x = x;
    knot.scale.setScalar(0.95);
    stage.scene.add(knot);
    return knot;
  });
  const [a, b, c] = knots as [SplatMesh, SplatMesh, SplatMesh];

  // No SplatMesh ancestor: this edit is global, and its SDF position is in world space.
  const globalEdit = new SplatEdit({ rgbaBlendMode: SplatEditRgbaBlendMode.SET_RGB, softEdge: 0.1 });
  const sweep = new SplatEditSdf({ type: SplatEditSdfType.SPHERE, radius: 0.7, color: new THREE.Color(1, 0.85, 0.1) });
  globalEdit.add(sweep);
  stage.scene.add(globalEdit);

  // Child of B: it applies to B alone, and its SDF position is in B's local space.
  const ownEdit = new SplatEdit({ rgbaBlendMode: SplatEditRgbaBlendMode.SET_RGB, softEdge: 0.1 });
  const own = new SplatEditSdf({ type: SplatEditSdfType.SPHERE, radius: 0.5, color: new THREE.Color(0.1, 0.9, 1) });
  ownEdit.add(own);
  b.add(ownEdit);

  // C opts out of every edit, global or not.
  c.editable = false;

  if (!ctx.preview) {
    const bar = controlBar(el);
    // Invisible edits are skipped, so visible is a cheap on/off switch.
    checkbox(bar, 'global edit', true, (v) => (globalEdit.visible = v));
    checkbox(bar, "B's own edit", true, (v) => (ownEdit.visible = v));
    checkbox(bar, 'A editable', true, (v) => (a.editable = v));
    checkbox(bar, 'C editable', false, (v) => (c.editable = v));
  }

  stage.run((time) => {
    sweep.position.set(Math.sin(time * 0.6) * 3.6, Math.sin(time * 1.3) * 0.5, 0.2);
    own.position.set(Math.cos(time * 1.1) * 0.6, Math.sin(time * 1.1) * 0.6, 0);
    for (const k of knots) k.rotation.y = Math.sin(time * 0.5) * 0.6;
  });
  return () => stage.dispose();
};

export default mount;
