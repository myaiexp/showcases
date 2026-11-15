// ShadowRegion: setRegion, static and dynamic casters, and setLimit for a ball that rolls away
import { AABB, Vector3, Vector4 } from '@zephyr3d/base';
import { BoxShape, DirectionalLight, LambertMaterial, Mesh, SphereShape } from '@zephyr3d/scene';
import { button, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lightDemo } from '../../shared/light-demo.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const { myApp, scene, boxes, camera } = await lightDemo(stage, { floorSize: 400, boxes: 10, eye: new Vector3(26, 24, 26) });

  const light = new DirectionalLight(scene);
  light.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  light.castShadow = true;
  // A small map stretched over the whole floor is blocky: the region tells it where shadows are needed
  light.shadow.mode = 'hard';
  light.shadow.shadowMapSize = 512;
  const region = light.shadow.shadowRegion;

  // A ball that rolls away from the boxes and keeps going, like a physics body that fell off the platform
  const ballMaterial = new LambertMaterial();
  ballMaterial.albedoColor = new Vector4(1, 0.3, 0.3, 1);
  const ball = new Mesh(scene, new SphereShape({ radius: 2 }), ballMaterial);
  ball.position.setXYZ(0, 2, 0);
  let rolling = true;
  const fitCasters = (): void => {
    // The manual region: the union of every caster's world bounds
    const aabb = new AABB();
    aabb.beginExtend();
    for (const box of boxes) {
      const bbox = box.getWorldBoundingVolume()?.toAABB();
      if (bbox) {
        aabb.extend(bbox.minPoint);
        aabb.extend(bbox.maxPoint);
      }
    }
    region.setRegion(aabb);
  };

  let t0 = 0;
  myApp.on('tick', (_dt, ms) => {
    if (rolling) {
      // Back and forth on a short path first, then off the edge towards +x: the longer it runs, the farther it is
      const t = (ms - t0) * 0.001;
      ball.position.setXYZ(Math.sin(t * 0.8) * 8 + t * 4, 2, 6 + Math.cos(t * 0.8) * 6);
      ball.invalidateBoundingVolume();
    }
  });

  const out = stage.readout();
  const report = (): void => {
    const r = region.region;
    const text = r ? `region size ${r.size.x.toFixed(0)} x ${r.size.y.toFixed(0)} x ${r.size.z.toFixed(0)}` : 'region empty: the scene bounding box is used';
    if (out) out.textContent = `${text}\nlimit: ${region.limit ? 'set' : 'none'}`;
    stage.caption(text);
  };

  let sinceReport = 0;
  myApp.on('tick', (dt) => {
    sinceReport += dt;
    if (sinceReport > 250) {
      sinceReport = 0;
      report();
    }
  });

  // Start with the casters registered so that a card shows the effect without a pointer
  boxes.forEach((b) => region.addStaticCaster(b));
  region.addDynamicCaster(ball);
  if (stage.bar) {
    button(stage.bar, 'setRegion(fit the boxes)', () => {
      region.clearCasters();
      fitCasters();
    });
    button(stage.bar, 'addStaticCaster boxes', () => {
      region.clear();
      boxes.forEach((b) => region.addStaticCaster(b));
    });
    toggle(stage.bar, 'addDynamicCaster(ball)', true, (v) => (v ? region.addDynamicCaster(ball) : region.removeCaster(ball)));
    toggle(stage.bar, 'setLimit(play area)', false, (v) => region.setLimit(v ? new AABB(new Vector3(-30, -1, -30), new Vector3(30, 14, 30)) : null));
    button(stage.bar, 'clear()', () => region.clear());
    toggle(stage.bar, 'ball rolls', true, (v) => (rolling = v));
    button(stage.bar, 'restart ball', () => (t0 = myApp.device.frameInfo.elapsedOverall));
  } else {
    // Cards: alternate the limit
    stage.every(3000, (i) => region.setLimit(i % 2 ? new AABB(new Vector3(-30, -1, -30), new Vector3(30, 14, 30)) : null));
  }
  void camera;
  myApp.run();
});
