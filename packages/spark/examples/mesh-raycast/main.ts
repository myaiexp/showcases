// THREE.Raycaster against a SplatMesh: click to mark the hit and its distance
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, controlBar, readout, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 2.8], orbit: ctx.preview ? 0.15 : 0.1 });
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 15000 : 30000) });
  stage.scene.add(knot);

  // A plain mesh marks where the ray landed.
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 12), new THREE.MeshBasicMaterial({ color: 0xff3355 }));
  marker.visible = false;
  stage.scene.add(marker);

  const raycaster = new THREE.Raycaster();
  const info = ctx.preview ? null : readout(el, 'Click the knot to cast a ray from the camera through the cursor.');

  /** Cast through a point of the canvas, in -1..1 coordinates. */
  const cast = (ndc: THREE.Vector2): void => {
    raycaster.setFromCamera(ndc, stage.camera);
    // SplatMesh.raycast fills the same { distance, point, object } entries as any Object3D.
    const hit = raycaster.intersectObjects(stage.scene.children, true).find((h) => h.object === knot);
    marker.visible = !!hit;
    if (hit) marker.position.copy(hit.point);
    if (info) {
      info.textContent = hit
        ? `hit at (${hit.point.toArray().map((v) => v.toFixed(2)).join(', ')}), distance ${hit.distance.toFixed(3)}`
        : 'miss: the ray found no splat above minRaycastOpacity';
    }
  };

  let timer = 0;
  if (ctx.preview) {
    // No pointer in cards: fire a ray at a wandering point every half second.
    let n = 0;
    timer = window.setInterval(() => {
      n++;
      cast(new THREE.Vector2(0.7 * Math.sin(n * 1.7), 0.5 * Math.cos(n * 2.3)));
    }, 500);
  } else {
    const canvas = stage.canvas;
    const ac = new AbortController();
    let down = { x: 0, y: 0 };
    canvas.addEventListener('pointerdown', (e) => (down = { x: e.clientX, y: e.clientY }), { signal: ac.signal });
    canvas.addEventListener(
      'pointerup',
      (e) => {
        if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 4) return; // that was an orbit drag
        const rect = canvas.getBoundingClientRect();
        cast(new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1));
      },
      { signal: ac.signal },
    );
    const bar = controlBar(el);
    checkbox(bar, 'raycastable', true, (v) => (knot.raycastable = v));
    slider(bar, 'minRaycastOpacity', 0, 1, 0.05, knot.minRaycastOpacity, (v) => (knot.minRaycastOpacity = v));
    stage.run();
    return () => (ac.abort(), stage.dispose());
  }

  stage.run((time) => {
    knot.rotation.x = Math.sin(time * 0.3) * 0.3;
  });
  return () => (clearInterval(timer), stage.dispose());
};

export default mount;
