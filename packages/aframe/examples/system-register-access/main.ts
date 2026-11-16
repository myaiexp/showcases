// A system named like a component is this.system there, and the scene holds the running instance
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerSystem<{ unit: number }>('my-component', {
      schema: { unit: { default: 0.5 } }, // System schema. Parses into this.data.
      init() {
        // Called on scene initialization.
        this.created = 'init() ran with unit ' + this.data.unit;
      },
    });
    AFRAME.registerComponent('my-component', {
      init() {
        this.el.setAttribute('scale', { x: this.system.data.unit, y: this.system.data.unit, z: this.system.data.unit });
        this.el.setAttribute('position', 'y', this.system.data.unit);
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420" my-component="unit: 1.2">
      <a-box my-component color="#4CC3D9" position="0 1.4 -3" animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-box>
      ${board('board', '0 3.5 -4', 6.8, 1.8, 66)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const box = document.querySelector('a-box') as Entity;
    log.show(
      [
        `scene.systems['my-component'].created: ${stage.scene.systems['my-component'].created}`,
        `component's this.system === scene.systems[...]: ${box.components['my-component']!.system === stage.scene.systems['my-component']}`,
        `AFRAME.systems has the registered prototype: ${typeof stage.AFRAME.systems['my-component']}`,
        `scene.systems has the instance: ${typeof stage.scene.systems['my-component']}`,
        `system data (from <a-scene my-component="unit: 1.2">): ${JSON.stringify(stage.scene.systems['my-component'].data)}`,
      ].join('\n'),
    );
    stage.caption('registerSystem, scene.systems[name], this.system');
    if (stage.preview) sway(stage);
  },
});
