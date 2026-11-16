// Wait for model-loaded, then traverse the loaded mesh to change its materials
import { aframeExample } from '../../shared/frame.ts';
import { select } from '../../shared/controls.ts';
import { createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

import { glb } from '../../shared/models.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('modify-materials', {
      schema: { part: { default: 'Sail' }, color: { default: 'red' } },
      init() {
        // Wait for model to load.
        this.el.addEventListener('model-loaded', () => this.paint());
      },
      update() {
        if (this.el.getObject3D('mesh')) this.paint();
      },
      paint() {
        // Grab the mesh / scene.
        const obj = this.el.getObject3D('mesh')!;
        // Go over the submeshes and modify materials we want.
        obj.traverse((node: import('three').Object3D) => {
          const mesh = node as import('three').Mesh<import('three').BufferGeometry, import('three').MeshStandardMaterial>;
          if (mesh.name.indexOf(this.data.part) !== -1 && mesh.material) mesh.material.color.set(this.data.color);
        });
        this.el.sceneEl.emit('note', `recoloured the nodes named ${this.data.part}* to ${this.data.color}`);
      },
    });
  },

  scene: () => `
    <a-scene background="color: #0d1420">
      <a-assets>
        <a-asset-item id="mill" response-type="arraybuffer" src="${glb.windmill()}"></a-asset-item>
      </a-assets>
      <a-entity id="m" gltf-model="#mill" modify-materials position="0 0 -4.5"
                animation="property: rotation; to: 0 360 0; dur: 14000; easing: linear; loop: true"></a-entity>
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { max: 2 });
    stage.scene.addEventListener('note', (evt) => log((evt as CustomEvent<string>).detail));
    stage.caption('model-loaded, then getObject3D("mesh").traverse(...)');
    const m = stage.scene.querySelector('#m') as Entity;
    if (m.getObject3D('mesh')) log('model loaded already');
    if (stage.preview) sway(stage);
    else if (stage.bar) {
      select(stage.bar, 'sail colour', ['red', '#7be0c3', '#4CC3D9', 'white'], 'red', (v) => m.setAttribute('modify-materials', 'color', v));
    }
  },
});
