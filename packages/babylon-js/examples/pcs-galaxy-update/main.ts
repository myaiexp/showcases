// PointsCloudSystem galaxy: addPoints placement, updateParticle per frame
import { ArcRotateCamera, Color4, PointsCloudSystem, Vector3, type CloudPoint } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor = new Color4(0.01, 0.01, 0.03, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 0.9, 16, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);

  const perArm = ctx.preview ? 3000 : 12000;
  const pcs = new PointsCloudSystem('galaxy', 2, scene);

  // The placement function gets the particle, its index i, and s, its index within this group.
  // Each addPoints call is a group: one per spiral arm, offset by particle.groupId.
  const arms = 3;
  const place = (particle: CloudPoint, _i: number, s: number): void => {
    const t = s / perArm;
    const r = 0.5 + t * 7;
    const angle = t * 9 + (particle.groupId * Math.PI * 2) / arms + (Math.random() - 0.5) * 0.6;
    particle.position = new Vector3(Math.cos(angle) * r, (Math.random() - 0.5) * (1 - t) * 0.8, Math.sin(angle) * r);
    particle.color = new Color4(0.6 + 0.4 * (1 - t), 0.5 + 0.3 * t, 0.7 + 0.3 * t, 1);
  };
  for (let a = 0; a < arms; a++) pcs.addPoints(perArm, place);
  await pcs.buildMeshAsync();

  // updateParticle runs per particle inside setParticles(); reuse temporaries, no allocations.
  const speed = { value: 0.5 };
  pcs.updateParticle = (particle) => {
    const p = particle.position;
    const r = Math.hypot(p.x, p.z);
    // Inner stars orbit faster than outer ones.
    const w = (speed.value * 0.02) / Math.max(0.5, Math.sqrt(r));
    const cos = Math.cos(w);
    const sin = Math.sin(w);
    const x = p.x * cos - p.z * sin;
    p.z = p.x * sin + p.z * cos;
    p.x = x;
    return particle;
  };

  // Updating a third of the particles per frame, and the mesh only on the last third.
  let chunked = !ctx.preview;
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('rotation speed', 0, 3, 0.05, speed.value, (v) => (speed.value = v));
    panel.check('setParticles in three chunks', chunked, (on) => (chunked = on));
  }

  let frame = 0;
  stage.run(() => {
    if (!chunked) {
      pcs.setParticles();
      return;
    }
    const third = Math.ceil(pcs.nbParticles / 3);
    const k = frame++ % 3;
    pcs.setParticles(k * third, Math.min(pcs.nbParticles - 1, (k + 1) * third - 1), k === 2);
  });

  return () => {
    pcs.dispose();
    stage.dispose();
  };
};

export default mount;
