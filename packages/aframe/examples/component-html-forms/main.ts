// Single-property components read like an attribute; multi-property ones read like inline CSS
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-sphere id="single" position="-1.6 1.3 -3" radius="0.5" color="#ef2d5e"></a-sphere>
      <a-entity id="multi" position="1.6 1.3 -3" geometry="primitive: sphere; radius: 0.2" material="color: #ffc65d; shader: flat"
                light="type: point; color: crimson; intensity: 1.5"></a-entity>
      ${board('board', '0 3.4 -4', 6.4, 1.6, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const single = stage.scene.querySelector('#single') as Entity;
    const multi = stage.scene.querySelector('#multi') as Entity;
    const show = (): void => {
      const p = single.getAttribute('position');
      const l = multi.getAttribute('light');
      log.show(
        [
          '<a-entity position="1 2 3">  single property: the value is the data',
          `  position data: ${JSON.stringify({ x: p.x, y: p.y, z: p.z })}`,
          '<a-entity light="type: point; color: crimson">  properties like inline CSS',
          `  light data: type ${l.type}, color ${l.color}, intensity ${l.intensity}`,
        ].join('\n'),
      );
      stage.caption('position="1 2 3"   light="type: point; color: crimson"');
    };
    show();
    if (stage.preview) {
      sway(stage);
      stage.every(1500, (i) => multi.setAttribute('light', 'color', i % 2 ? '#4CC3D9' : 'crimson'));
    } else if (stage.bar) {
      button(stage.bar, "setAttribute('position', '-1.6 2 -3')", () => {
        single.setAttribute('position', '-1.6 2 -3');
        show();
      });
      button(stage.bar, "setAttribute('light', 'color', 'lime')", () => {
        multi.setAttribute('light', 'color', 'lime');
        show();
      });
    }
  },
});
