// The recommended way to script the scene: a component on <a-scene>, run after its children
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('do-something', {
      init() {
        const sceneEl = this.el;
        // The scene and its children are initialised before this component.
        const box = sceneEl.querySelector('a-box') as Entity;
        box.setAttribute('material', 'color', 'red');
        sceneEl.emit('note', `init(): scene has ${sceneEl.children.length} children, box loaded: ${box.hasLoaded}`);
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420" do-something>
      <a-box color="#4CC3D9" position="0 1.4 -3" animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-box>
      ${board('board', '0 3.5 -4', 6.4, 1, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 3 });
    log("<a-scene do-something>: its init() turned the box red");
    log(`do-something attached: ${'do-something' in stage.scene.components}`);
    if (stage.preview) sway(stage);
  },
});
