// A box component builds a three.js mesh in init, updates it in update and removes it in remove
import { aframeExample } from '../../shared/frame.ts';
import { button, select, slider } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const { THREE } = AFRAME;
    AFRAME.registerComponent<{ width: number; height: number; depth: number; color: string }>('box', {
      schema: {
        width: { type: 'number', default: 1 },
        height: { type: 'number', default: 1 },
        depth: { type: 'number', default: 1 },
        color: { type: 'color', default: '#AAA' },
      },

      // Initial creation and setting of the mesh.
      init() {
        const data = this.data;
        const el = this.el;
        this.geometry = new THREE.BoxGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({ color: data.color });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        el.setObject3D('mesh', this.mesh);
      },

      // Update the mesh in response to property updates.
      update(oldData) {
        const data = this.data;
        const el = this.el;
        // If oldData is empty, we are in the initialization process: nothing to update.
        if (Object.keys(oldData).length === 0) return;
        const mesh = el.getObject3D('mesh') as import('three').Mesh<import('three').BufferGeometry, import('three').MeshStandardMaterial>;
        if (data.width !== oldData.width || data.height !== oldData.height || data.depth !== oldData.depth) {
          mesh.geometry.dispose();
          mesh.geometry = new THREE.BoxGeometry(data.width, data.height, data.depth);
        }
        if (data.color !== oldData.color) mesh.material.color = new THREE.Color(data.color);
      },

      remove() {
        this.el.removeObject3D('mesh');
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" box="width: 0.5; height: 0.25; depth: 1; color: orange" position="0 1.3 -3"
                animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 3.6 -4.5', 6, 1, 60)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const el = stage.scene.querySelector('#e') as Entity;
    const show = (): void => log.show(el.components.box ? `box data: ${JSON.stringify(el.getAttribute('box'))}\nobject3DMap: ${Object.keys(el.object3DMap)}` : 'component removed\nobject3DMap: ' + JSON.stringify(Object.keys(el.object3DMap)));
    show();
    stage.caption('box="width: 0.5; height: 0.25; depth: 1; color: orange"');
    if (stage.preview) {
      sway(stage);
      stage.every(1400, (i) => {
        el.setAttribute('box', { width: 0.5 + (i % 3) * 0.4, height: 0.25 + (i % 4) * 0.3, color: ['orange', '#4CC3D9', '#ef2d5e'][i % 3] });
        show();
      });
    } else if (stage.bar) {
      slider(stage.bar, 'width', [0.2, 2, 0.1], 0.5, (v) => {
        el.setAttribute('box', 'width', v);
        show();
      });
      slider(stage.bar, 'height', [0.2, 2, 0.1], 0.25, (v) => {
        el.setAttribute('box', 'height', v);
        show();
      });
      select(stage.bar, 'color', ['orange', '#4CC3D9', '#ef2d5e', 'white'], 'orange', (v) => {
        el.setAttribute('box', 'color', v);
        show();
      });
      button(stage.bar, "removeAttribute('box')", () => {
        el.removeAttribute('box');
        show();
      });
      button(stage.bar, "setAttribute('box', '')", () => {
        el.setAttribute('box', '');
        show();
      });
    }
  },
});
