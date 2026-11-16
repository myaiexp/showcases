// A-Frame's parent-child entities map one-to-one onto the three.js scene graph
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="parent" color="#4CC3D9" position="0 1 -3" animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true">
        <a-sphere id="child" radius="0.4" color="#ffc65d" position="1.4 0 0"></a-sphere>
        <a-light id="lamp" type="point" intensity="0.6" position="0 1.2 0"></a-light>
      </a-box>
      ${board('board', '0 3.6 -4.5', 7.4, 2.2, 74)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const tree = (o: import('three').Object3D, depth = 0, out: string[] = []): string[] => {
      const el = (o as unknown as { el?: Entity }).el;
      out.push(`${'  '.repeat(depth)}${o.type}${el?.id ? `  (el: #${el.id})` : ''}`);
      for (const c of o.children) {
        // Skip the board's own objects to keep the picture of the docs' example.
        if ((c as unknown as { el?: Entity }).el?.id === 'board') continue;
        tree(c, depth + 1, out);
      }
      return out;
    };
    log.show(tree(stage.scene.object3D).slice(0, 14).join('\n'));
    stage.caption('scene.object3D, printed as a tree');
    if (stage.preview) sway(stage);
  },
});
