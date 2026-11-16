// getAttribute returns values, and position and scale are the live three.js vectors
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" geometry="primitive: sphere; radius: 0.6" material="color: #4CC3D9" visible="true" position="0 1.3 -3"></a-entity>
      ${board('board', '0 3.8 -4.5', 7.8, 2.4, 78)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const el = stage.scene.querySelector('#e') as Entity;
    const show = (): void => {
      const pos = el.getAttribute('position');
      log.show(
        [
          `getAttribute('geometry') -> radius ${el.getAttribute('geometry').radius}, primitive ${el.getAttribute('geometry').primitive}`,
          `getAttribute('visible') -> ${el.getAttribute('visible')} (${typeof el.getAttribute('visible')})`,
          `getAttribute('position') === object3D.position: ${pos === el.object3D.position}`,
          `getAttribute('rotation') -> ${JSON.stringify(el.getAttribute('rotation'))} (degrees, a plain object)`,
          `object3D.rotation.y -> ${el.object3D.rotation.y.toFixed(3)} (radians, an Euler)`,
        ].join('\n'),
      );
    };
    show();
    stage.caption('position and scale come back as three.js Vector3s');
    const turn = (): void => {
      el.setAttribute('rotation', { x: 0, y: 45 + Math.round(Math.random() * 90), z: 0 });
      el.getAttribute('position').x = (Math.random() - 0.5) * 3;
      show();
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1700, turn);
    } else if (stage.bar) {
      button(stage.bar, 'setAttribute rotation, then change position.x directly', turn);
    }
  },
});
