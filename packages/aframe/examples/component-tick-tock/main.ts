// tick runs every frame before rendering and tock after, each with time and timeDelta
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('clock', {
      init() {
        this.ticks = 0;
        this.tocks = 0;
        this.order = [];
      },
      tick(time, timeDelta) {
        this.ticks++;
        this.lastDelta = timeDelta;
        this.lastTime = time;
        this.el.object3D.rotation.y += timeDelta / 1200;
        if (this.order.length < 4) this.order.push('tick');
      },
      tock(_time, _timeDelta, camera) {
        this.tocks++;
        // component.md documents a camera argument; 1.8.0 passes it to systems' tock only.
        this.camera = camera ? camera.type : 'undefined (1.8.0 passes it to systems only)';
        if (this.order.length < 4) this.order.push('tock');
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="e" clock color="#4CC3D9" position="0 1.4 -3"></a-box>
      ${board('board', '0 3.5 -4', 6, 1.6, 60)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const c = (stage.scene.querySelector('#e') as Entity).components.clock!;
    stage.every(250, () =>
      log.show(
        [
          `first frames: ${c.order.join(' -> ')}`,
          `tick calls ${c.ticks}, last timeDelta ${Math.round(c.lastDelta)} ms, time ${Math.round(c.lastTime)} ms`,
          `tock calls ${c.tocks}, camera argument: ${c.camera}`,
        ].join('\n'),
      ),
    );
    stage.caption('tick(time, timeDelta) / tock(time, timeDelta, camera)');
    if (stage.preview) sway(stage);
  },
});
