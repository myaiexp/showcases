// before and after order every component's tick globally, whatever the registration order
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const frame = { time: -1, names: [] as string[] };
    const record = (name: string, time: number, el: Entity): void => {
      if (time !== frame.time) {
        frame.time = time;
        frame.names = [];
      }
      if (!frame.names.includes(name)) frame.names.push(name);
      el.sceneEl.emit('order', frame.names.join(' -> '));
    };
    // foo is registered first but says it runs after bar.
    AFRAME.registerComponent('foo', {
      after: ['bar'],
      tick(time) {
        record('foo', time, this.el);
      },
    });
    AFRAME.registerComponent('bar', {
      before: ['foo'],
      tick(time) {
        record('bar', time, this.el);
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box foo bar color="#4CC3D9" position="-1.4 1.4 -3"></a-box>
      <a-box foo color="#ef2d5e" position="1.4 1.4 -3"></a-box>
      <a-box bar color="#ffc65d" position="0 1.4 -4.5"></a-box>
      ${board('board', '0 3.5 -4', 6, 1.2, 60)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    let last = '';
    stage.scene.addEventListener('order', (evt) => (last = (evt as CustomEvent<string>).detail));
    stage.every(300, () => log.show(`Last frame's tick order across all entities:\n${last}`));
    stage.caption('bar (before: foo) always ticks before foo (after: bar)');
    if (stage.preview) sway(stage);
  },
});
