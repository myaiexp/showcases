// Every lifecycle handler writes to a log: init, update, play, tick, pause and remove
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent<{ speed: number }>('lifecycle', {
      schema: { speed: { default: 1 } },
      init() {
        this.ticks = 0;
        this.el.emit('step', 'init()');
      },
      update(oldData) {
        this.el.emit('step', `update(): speed ${oldData.speed ?? 'none yet'} -> ${this.data.speed}`);
      },
      play() {
        this.el.emit('step', 'play()');
      },
      tick(_t, dt) {
        this.ticks++;
        this.el.object3D.rotation.y += (dt / 1000) * this.data.speed;
        if (this.ticks === 1) this.el.emit('step', 'tick() running every frame');
      },
      pause() {
        this.el.emit('step', 'pause()');
      },
      remove() {
        this.el.emit('step', 'remove()');
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="e" color="#4CC3D9" position="0 1.4 -3"></a-box>
      ${board('board', '0 3.5 -4', 6, 1.8, 60)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 6 });
    const el = stage.scene.querySelector('#e') as Entity;
    stage.scene.addEventListener('step', (evt) => log((evt as CustomEvent<string>).detail));
    const attach = (): void => el.setAttribute('lifecycle', 'speed: 1');
    attach();
    const actions = [() => el.setAttribute('lifecycle', 'speed', 3), () => el.pause(), () => el.play(), () => el.removeAttribute('lifecycle'), attach];
    if (stage.preview) {
      sway(stage);
      stage.every(1500, (i) => actions[(i - 1) % actions.length]!());
    } else if (stage.bar) {
      button(stage.bar, "setAttribute('lifecycle', 'speed', 3)", actions[0]!);
      button(stage.bar, 'pause()', actions[1]!);
      button(stage.bar, 'play()', actions[2]!);
      button(stage.bar, "removeAttribute('lifecycle')", actions[3]!);
      button(stage.bar, "setAttribute('lifecycle', ...)", attach);
    }
  },
});
