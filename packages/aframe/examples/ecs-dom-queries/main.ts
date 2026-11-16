// The DOM gives ECS queries, events and lifecycle: [enemy]:not([alive]) and publish-subscribe events
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('enemy', {
      init() {
        this.el.setAttribute('material', 'color', '#ef2d5e');
      },
    });
    AFRAME.registerComponent('alive', {
      init() {
        this.el.setAttribute('material', 'color', '#7be0c3');
      },
      remove() {
        // Components do not know who listens: they just emit, and the event bubbles.
        this.el.emit('died', { id: this.el.id });
        this.el.setAttribute('material', 'color', '#555');
      },
    });
    AFRAME.registerComponent('scoreboard', {
      init() {
        this.score = 0;
        this.el.addEventListener('died', () => {
          this.score++;
          this.el.emit('scored', this.score);
        });
      },
    });
  },

  scene: `
    <a-scene scoreboard background="color: #0d1420">
      <a-sphere id="e1" enemy alive radius="0.4" position="-2.4 1.2 -3.5"></a-sphere>
      <a-sphere id="e2" enemy alive radius="0.4" position="-0.8 1.2 -3.5"></a-sphere>
      <a-sphere id="e3" enemy alive radius="0.4" position="0.8 1.2 -3.5"></a-sphere>
      <a-sphere id="e4" enemy alive radius="0.4" position="2.4 1.2 -3.5"></a-sphere>
      ${board('board', '0 3.6 -4.5', 7, 1.6, 70)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const count = (sel: string): number => document.querySelectorAll(sel).length;
    const show = (): void =>
      log.show(`querySelectorAll('[enemy]'): ${count('[enemy]')}\nquerySelectorAll('[enemy]:not([alive])'): ${count('[enemy]:not([alive])')}\nscoreboard heard 'died' ${stage.scene.components.scoreboard!.score} times`);
    show();
    stage.caption('[enemy]:not([alive]) and emit("died")');
    const kill = (): void => {
      const target = document.querySelector('[enemy][alive]') as Entity | null;
      target?.removeAttribute('alive');
      show();
    };
    const revive = (): void => {
      for (const e of document.querySelectorAll('[enemy]:not([alive])')) (e as Entity).setAttribute('alive', '');
      stage.scene.components.scoreboard!.score = 0;
      show();
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1000, (i) => (i % 5 === 0 ? revive() : kill()));
    } else if (stage.bar) {
      button(stage.bar, "removeAttribute('alive') on the next enemy", kill);
      button(stage.bar, 'Revive all', revive);
    }
  },
});
