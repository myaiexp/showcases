// utils.throttle limits a function to once per interval while tick runs every frame
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('foo', {
      init() {
        // Set up throttling: this.everySecond runs at most once a second, with this as context.
        this.throttledFunction = AFRAME.utils.throttle(this.everySecond, 1000, this);
        this.seconds = 0;
        this.frames = 0;
      },
      everySecond() {
        this.seconds++;
        this.el.setAttribute('material', 'color', this.seconds % 2 ? '#ef2d5e' : '#4CC3D9');
      },
      tick() {
        this.throttledFunction(); // Called once a second.
        this.frames++; // Counted every frame.
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="e" foo color="#4CC3D9" position="0 1.5 -3"></a-box>
      ${board('board', '0 3.8 -4', 6.4, 1.2, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const foo = (stage.scene.querySelector('#e') as Entity).components.foo!;
    stage.every(250, () => log.show(`frames (tick calls): ${foo.frames}\nthrottled everySecond() calls: ${foo.seconds}`));
    stage.caption('throttle(this.everySecond, 1000, this)');
    if (stage.preview) sway(stage);
  },
});
