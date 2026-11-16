// utils.throttleTick wraps a tick handler so it runs at most once per interval
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('steps', {
      init() {
        // Set up the tick throttling: tick now runs every 500 ms.
        this.tick = AFRAME.utils.throttleTick(this.tick, 500, this);
        this.calls = 0;
      },
      tick(_t: number, _dt: number) {
        this.calls++;
        this.el.object3D.rotation.y += Math.PI / 6;
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="e" steps color="#ffc65d" position="0 1.5 -3"></a-box>
      ${board('board', '0 3.8 -4', 6.4, 1.2, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const c = (stage.scene.querySelector('#e') as Entity).components.steps!;
    stage.every(250, () => log.show(`tick body ran ${c.calls} times\n(about 2 a second, not 60)`));
    stage.caption('this.tick = AFRAME.utils.throttleTick(this.tick, 500, this)');
    if (stage.preview) sway(stage);
  },
});
