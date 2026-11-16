// A component sets a THREE.PointLight with setObject3D and removes it in remove
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const { THREE } = AFRAME;
    AFRAME.registerComponent('pointlight', {
      init() {
        this.el.setObject3D('light', new THREE.PointLight('#ffd9a0', 30, 0, 2));
      },
      remove() {
        // Remove Object3D.
        this.el.removeObject3D('light');
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="lamp" pointlight geometry="primitive: sphere; radius: 0.15" material="color: #ffd9a0; shader: flat" position="0 1.4 -3"
                animation="property: object3D.position.x; from: -2; to: 2; dir: alternate; dur: 2400; easing: easeInOutSine; loop: true"></a-entity>
      <a-box color="#7be0c3" position="-1.2 0.5 -3.5"></a-box>
      <a-box color="#ef2d5e" position="1.2 0.5 -3.5"></a-box>
      ${board('board', '0 3.6 -4.5', 7, 1.2, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const lamp = stage.scene.querySelector('#lamp') as Entity;
    const show = (): void => {
      const light = lamp.getObject3D('light');
      log.show(light ? `getObject3D('light') -> ${light.type}\nlight.el === entity: ${(light as unknown as { el: Entity }).el === lamp}` : "getObject3D('light') -> undefined (removed)");
    };
    show();
    stage.caption('setObject3D("light", new THREE.PointLight())');
    if (stage.preview) {
      sway(stage);
      stage.every(2200, (i) => {
        if (i % 2) lamp.removeAttribute('pointlight');
        else lamp.setAttribute('pointlight', '');
        show();
      });
    } else if (stage.bar) {
      button(stage.bar, "removeAttribute('pointlight')", () => {
        lamp.removeAttribute('pointlight');
        show();
      });
      button(stage.bar, "setAttribute('pointlight', '')", () => {
        lamp.setAttribute('pointlight', '');
        show();
      });
    }
  },
});
