// A system does the heavy lifting; its component only manages data through its lifecycle
import { aframeExample } from '../../shared/frame.ts';
import { slider } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const { THREE } = AFRAME;
    AFRAME.registerSystem('tower', {
      // The logic: build a complicated object from plain data.
      createComplexObject(data: { floors: number; color: string }) {
        const group = new THREE.Group();
        for (let i = 0; i < data.floors; i++) {
          const w = 1.4 - (i / data.floors) * 0.9;
          const floor = new THREE.Mesh(new THREE.BoxGeometry(w, 0.3, w), new THREE.MeshStandardMaterial({ color: new THREE.Color(data.color).offsetHSL(0, 0, i * 0.03) }));
          floor.position.y = i * 0.32;
          group.add(floor);
        }
        return group;
      },
    });
    AFRAME.registerComponent<{ floors: number; color: string }>('tower', {
      schema: { floors: { default: 4 }, color: { default: '#4CC3D9' } },
      init() {
        this.myObject = null;
      },
      update() {
        // The component only hands its data over.
        this.myObject = this.system.createComplexObject(this.data);
        this.el.setObject3D('tower', this.myObject);
      },
      remove() {
        this.el.removeObject3D('tower');
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" tower="floors: 4" position="0 0.2 -3" animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 3.5 -4', 6.4, 1, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const el = stage.scene.querySelector('#e') as Entity;
    const show = (): void => log.show(`component.update() -> system.createComplexObject(data): ${el.getObject3D('tower')!.children.length} floors built`);
    show();
    stage.caption('system.createComplexObject(this.data)');
    if (stage.preview) {
      sway(stage);
      stage.every(1500, (i) => {
        el.setAttribute('tower', 'floors', 2 + (i % 6));
        show();
      });
    } else if (stage.bar) {
      slider(stage.bar, 'floors', [1, 10, 1], 4, (v) => {
        el.setAttribute('tower', 'floors', v);
        show();
      });
    }
  },
});
