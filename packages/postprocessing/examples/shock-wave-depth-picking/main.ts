// DepthPickingPass: read the depth under a point, unproject it, and explode a shock wave there
import * as THREE from 'three';
import { DepthPickingPass, EffectComposer, EffectPass, RenderPass, ShockWaveEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

// Screen points (normalised device coordinates) the card clicks in turn.
const SCRIPT: [number, number][] = [[-0.45, -0.35], [0.05, 0.05], [0.5, -0.2], [-0.15, -0.7], [0.62, -0.62]];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { orbit: false, position: [0, 3, 8], target: [0, 0.8, 0] });
  const subject = showroom(stage.scene);
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  marker.visible = false;
  stage.scene.add(marker);

  const composer = stage.own(new EffectComposer(stage.renderer));
  const wave = new ShockWaveEffect(stage.camera, new THREE.Vector3(), { speed: 1.5, maxRadius: 0.6, waveSize: 0.25, amplitude: 0.07 });
  // The picking pass copies depth from the composer's depth texture, so it sits after the RenderPass.
  const picking = new DepthPickingPass();
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(picking);
  composer.addPass(new EffectPass(stage.camera, wave));

  const label = overlay(stage.box, stage.preview ? '' : 'click the scene');
  const pick = async (x: number, y: number): Promise<void> => {
    const ndc = new THREE.Vector3(x, y, 0);
    const depth = await picking.readDepth(ndc);
    if (depth > 0.9999) return; // the background: nothing to hit
    ndc.z = depth * 2 - 1;
    const world = ndc.unproject(stage.camera);
    wave.position.copy(world);
    marker.position.copy(world);
    marker.visible = true;
    wave.explode();
    label.textContent = `depth ${depth.toFixed(5)}\nworld (${world.x.toFixed(2)}, ${world.y.toFixed(2)}, ${world.z.toFixed(2)})`;
  };

  const down = { x: 0, y: 0 };
  const onDown = (e: PointerEvent): void => void ((down.x = e.clientX), (down.y = e.clientY));
  const onUp = (e: PointerEvent): void => {
    if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 4) return;
    const r = stage.canvas.getBoundingClientRect();
    void pick(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  if (!stage.preview) {
    stage.canvas.addEventListener('pointerdown', onDown);
    stage.canvas.addEventListener('pointerup', onUp);
    stage.onDispose(() => {
      stage.canvas.removeEventListener('pointerdown', onDown);
      stage.canvas.removeEventListener('pointerup', onUp);
    });
  } else {
    let step = 0;
    stage.every(2200, () => void pick(...SCRIPT[step++ % SCRIPT.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
