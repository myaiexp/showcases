// In tick, reuse helper objects made once in a closure instead of allocating new ones each frame
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const { THREE } = AFRAME;
    AFRAME.registerComponent('orbit-tint', {
      tick(time: number) {
        this.doSomething(time);
      },
      // A closure holds private helpers shared by every instance: they must not keep state.
      doSomething: (function () {
        const helperVector = new THREE.Vector3();
        const helperQuaternion = new THREE.Quaternion();
        const helperColor = new THREE.Color();
        return function (this: { el: Entity; id?: string }, time: number) {
          const o = this.el.object3D;
          o.position.x = Math.cos(time / 900 + o.id) * 2;
          o.position.z = -3.5 + Math.sin(time / 900 + o.id) * 1.2;
          helperVector.copy(o.position);
          helperQuaternion.copy(o.quaternion);
          // Colour by distance from the middle, using only the shared helpers.
          helperColor.setHSL(0.5 + Math.abs(helperVector.x) * 0.1, 0.7, 0.55);
          const mesh = this.el.getObject3D('mesh') as import('three').Mesh<import('three').BufferGeometry, import('three').MeshStandardMaterial>;
          mesh.material.color.copy(helperColor);
        };
      })(),
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-sphere orbit-tint radius="0.35" position="0 1.3 -3.5"></a-sphere>
      <a-sphere orbit-tint radius="0.35" position="0 1.3 -3.5"></a-sphere>
      <a-sphere orbit-tint radius="0.35" position="0 1.3 -3.5"></a-sphere>
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    stage.caption('one helperVector, helperQuaternion and helperColor shared by every instance');
    if (stage.preview) sway(stage);
  },
});
