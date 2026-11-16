// World and local coordinates: getWorldPosition, getWorldQuaternion, localToWorld and back
import { aframeExample } from '../../shared/frame.ts';
import { slider } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="foo" position="1 0.5 -4">
        <a-entity id="bar" position="2 1.5 0" geometry="primitive: sphere; radius: 0.25" material="color: #ffc65d"></a-entity>
        <a-box scale="0.4 0.4 0.4" color="#4CC3D9"></a-box>
      </a-entity>
      <a-sphere id="world" radius="0.4" material="color: #ef2d5e; wireframe: true" position="0 0 0"></a-sphere>
      ${board('board', '0 4.2 -6', 8.4, 2.6, 82)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const { THREE } = stage.AFRAME;
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const foo = stage.scene.querySelector('#foo') as Entity;
    const bar = stage.scene.querySelector('#bar') as Entity;
    const marker = stage.scene.querySelector('#world') as Entity;
    const worldPosition = new THREE.Vector3();
    const worldQuaternion = new THREE.Quaternion();
    const probe = new THREE.Vector3(0, 0, -4); // a point given in world space
    const asLocal = new THREE.Vector3();
    const worldToLocal = new THREE.Matrix4();
    const f = (v: { x: number; y: number; z: number }): string => `${v.x.toFixed(2)} ${v.y.toFixed(2)} ${v.z.toFixed(2)}`;

    stage.every(100, () => {
      foo.object3D.updateMatrixWorld(true);
      bar.object3D.getWorldPosition(worldPosition);
      bar.object3D.getWorldQuaternion(worldQuaternion);
      // The docs' getInverse() and applyMatrix() are gone from current three.js: copy().invert() and applyMatrix4().
      worldToLocal.copy(foo.object3D.matrixWorld).invert();
      asLocal.copy(probe).applyMatrix4(worldToLocal);
      marker.object3D.position.copy(worldPosition);
      log.show(
        [
          `bar local position:        ${f(bar.object3D.position)}`,
          `bar.getWorldPosition():    ${f(worldPosition)}   (the red wire ball)`,
          `bar.getWorldQuaternion():  y ${worldQuaternion.y.toFixed(2)}, w ${worldQuaternion.w.toFixed(2)}`,
          `foo.localToWorld(bar local): ${f(foo.object3D.localToWorld(bar.object3D.position.clone()))}`,
          `world point ${f(probe)} in foo's space: ${f(asLocal)}`,
        ].join('\n'),
      );
    });
    stage.caption('turn foo: bar keeps its local position, its world position moves');
    if (stage.preview) {
      sway(stage);
      stage.every(40, (i) => (foo.object3D.rotation.y = (i * 0.04) % (Math.PI * 2)));
    } else if (stage.bar) {
      slider(stage.bar, 'foo rotation.y (deg)', [0, 360, 5], 0, (v) => (foo.object3D.rotation.y = (v * Math.PI) / 180));
    }
  },
});
