// A schema with type and default at its top level is a single-property component
import { aframeExample } from '../../shared/frame.ts';
import { slider } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent<number>('foo', {
      schema: { type: 'int', default: 5 },
      update() {
        // The one value drives the box's height.
        this.el.setAttribute('geometry', { primitive: 'box', width: 0.6, depth: 0.6, height: this.data / 10 });
        this.el.object3D.position.y = this.data / 20;
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity foo position="-1.6 0 -3" material="color: #4CC3D9"></a-entity>
      <a-entity foo="20" position="0 0 -3" material="color: #ef2d5e"></a-entity>
      <a-entity foo="7.9" position="1.6 0 -3" material="color: #ffc65d"></a-entity>
      ${board('board', '0 3.4 -4', 6, 1, 60)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const els = [...stage.scene.querySelectorAll('[foo]')] as Entity[];
    const show = (): void => {
      log.show(els.map((e) => `foo=${JSON.stringify(e.getDOMAttribute('foo'))} -> data ${JSON.stringify(e.getAttribute('foo'))}`).join('\n'));
    };
    show();
    stage.caption('foo, foo="20", foo="7.9": int, default 5');
    if (stage.preview) {
      sway(stage);
      stage.every(1500, (i) => {
        els[1]!.setAttribute('foo', 10 + ((i * 7) % 20));
        show();
      });
    } else if (stage.bar) {
      slider(stage.bar, 'middle foo', [0, 30, 1], 20, (v) => {
        els[1]!.setAttribute('foo', v);
        show();
      });
    }
  },
});
