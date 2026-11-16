// setObject3D, getObject3D and removeObject3D manage the three.js objects under an entity
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" position="0 1.3 -3" animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 3.2 -4', 6, 1.6, 58)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const { THREE } = stage.AFRAME;
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 5 });
    const el = stage.scene.querySelector('#e') as Entity;
    el.addEventListener('object3dset', (evt) => log(`object3dset, detail.type: ${evt.detail.type}`));
    el.addEventListener('object3dremove', (evt) => log(`object3dremove, detail.type: ${evt.detail.type}`));

    const keys = (): string => `object3DMap keys: [${Object.keys(el.object3DMap)}]`;
    const add = (): void => {
      el.setObject3D('mesh', new THREE.Mesh(new THREE.TorusKnotGeometry(0.5, 0.15), new THREE.MeshStandardMaterial({ color: '#7be0c3' })));
      log(`${keys()}, getObject3D('mesh') is a ${el.getObject3D('mesh')?.type}`);
    };
    const remove = (): void => {
      el.removeObject3D('mesh');
      log(`${keys()}, 'mesh' in map: ${'mesh' in el.object3DMap}, value: ${el.object3DMap.mesh}`);
    };

    add();
    if (stage.preview) {
      sway(stage);
      stage.every(1800, (i) => (i % 2 ? remove() : add()));
    } else if (stage.bar) {
      button(stage.bar, "setObject3D('mesh', new THREE.Mesh())", add);
      button(stage.bar, "removeObject3D('mesh')", remove);
    }
  },
});
