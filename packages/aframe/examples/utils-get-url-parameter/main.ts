// utils.getUrlParameter reads a query parameter, or an empty string
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-box color="#4CC3D9" position="0 1.5 -3" animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-box>
      ${board('board', '0 3.8 -4', 6.4, 1.4, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const { getUrlParameter } = stage.AFRAME.utils;
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const show = (): void => {
      log.show(
        [
          `page query: "${location.search}"`,
          `getUrlParameter('testing') -> "${getUrlParameter('testing')}"`,
          `getUrlParameter('missing') -> "${getUrlParameter('missing')}"`,
        ].join('\n'),
      );
    };
    show();
    stage.caption('?testing=aframe -> getUrlParameter("testing")');
    const visit = (query: string): void => {
      // Pretend the page was opened with this query string.
      history.replaceState(null, '', query);
      show();
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1800, (i) => visit(i % 2 ? '?testing=aframe' : '?'));
    } else if (stage.bar) {
      button(stage.bar, '?testing=aframe', () => visit('?testing=aframe'));
      button(stage.bar, '?testing=vr&missing=', () => visit('?testing=vr&missing='));
      button(stage.bar, 'no query', () => visit('?'));
    }
  },
});
