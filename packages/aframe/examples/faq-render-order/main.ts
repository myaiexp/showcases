// Transparent objects render in DOM order unless sortTransparentObjects sorts them far to near
import { aframeExample } from '../../shared/frame.ts';
import { toggle } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420" renderer="sortTransparentObjects: false">
      <!-- Listed near-to-far: without sorting the near panes draw first and the far ones then paint over them. -->
      <a-plane id="p1" width="2" height="2" color="#ef2d5e" opacity="0.6" transparent="true" position="-0.5 1.6 -2.5"></a-plane>
      <a-plane id="p2" width="2" height="2" color="#4CC3D9" opacity="0.6" transparent="true" position="0 1.6 -3.2"></a-plane>
      <a-plane id="p3" width="2" height="2" color="#ffc65d" opacity="0.6" transparent="true" position="0.5 1.6 -3.9"></a-plane>
      ${board('board', '0 3.8 -5.5', 7.4, 1.3, 74)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const scene = stage.scene;
    const set = (on: boolean): void => {
      scene.setAttribute('renderer', { sortTransparentObjects: on });
      log.show(`renderer sortTransparentObjects: ${on}\n${on ? 'transparent objects: furthest to nearest' : 'transparent objects: DOM order (pane 1 first)'}`);
    };
    set(false);
    let renderOrderOn = false;
    const order = (on: boolean): void => {
      renderOrderOn = on;
      // Object3D.renderOrder wins over everything: the lowest value draws first.
      (['#p3', '#p2', '#p1'] as const).forEach((id, i) => ((scene.querySelector(id) as Entity).getObject3D('mesh')!.renderOrder = on ? i : 0));
      log.show(`renderer sortTransparentObjects: ${scene.getAttribute('renderer').sortTransparentObjects}\nrenderOrder ${on ? 'set: 0 far, 1 middle, 2 near' : 'all 0'}`);
    };
    if (stage.preview) {
      sway(stage, { yaw: 20 });
      stage.every(2000, (i) => set(i % 2 === 1));
    } else if (stage.bar) {
      toggle(stage.bar, 'sortTransparentObjects', false, set);
      toggle(stage.bar, 'renderOrder far to near', renderOrderOn, order);
    }
  },
});
