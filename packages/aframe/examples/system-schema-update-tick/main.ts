// A system has a schema read from the scene's attribute, update, tick, pause and play
import { aframeExample } from '../../shared/frame.ts';
import { button, slider } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerSystem('spinner', {
      schema: { speed: { default: 1 } },
      init() {
        this.angle = 0;
        this.ticks = 0;
      },
      update(oldData: { speed?: number }) {
        this.sceneEl.emit('step', `update(): speed ${oldData.speed ?? 'unset'} -> ${this.data.speed}`);
      },
      tick(_t: number, dt: number) {
        this.ticks++;
        this.angle += (dt / 1000) * this.data.speed;
        const el = this.sceneEl.querySelector('#e');
        if (el) el.object3D.rotation.y = this.angle;
      },
      pause() {
        this.sceneEl.emit('step', 'pause()');
      },
      play() {
        this.sceneEl.emit('step', 'play()');
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420" spinner="speed: 1.5">
      <a-box id="e" color="#4CC3D9" position="0 1.4 -3"></a-box>
      ${board('board', '0 3.5 -4', 6, 1.4, 60)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    stage.scene.addEventListener('step', (evt) => log((evt as CustomEvent<string>).detail));
    const speeds = [1.5, 4, -2, 0.5];
    if (stage.preview) {
      sway(stage);
      stage.every(1600, (i) => {
        stage.scene.setAttribute('spinner', { speed: speeds[i % 4] });
        if (i % 4 === 0) {
          stage.scene.pause();
          setTimeout(() => stage.scene.play(), 800);
        }
      });
    } else if (stage.bar) {
      slider(stage.bar, 'spinner speed', [-4, 4, 0.5], 1.5, (v) => stage.scene.setAttribute('spinner', { speed: v }));
      button(stage.bar, 'scene.pause()', () => stage.scene.pause());
      button(stage.bar, 'scene.play()', () => stage.scene.play());
    }
  },
});
