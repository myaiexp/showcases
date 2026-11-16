// sceneOnly: the component attaches to <a-scene> and is refused on any other entity
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent<{ color: string }>('mood', {
      sceneOnly: true,
      schema: { color: { default: '#0d1420' } },
      update() {
        this.el.setAttribute('background', 'color', this.data.color);
      },
    });
  },

  scene: `
    <a-scene mood="color: #1d2d4a">
      <a-box id="e" color="#ffc65d" position="0 1.4 -3" animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-box>
      ${board('board', '0 3.5 -4', 6.4, 1.4, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    const box = stage.scene.querySelector('#e') as Entity;
    log(`scene has mood: ${'mood' in stage.scene.components}`);
    const tryBox = (): void => {
      try {
        box.setAttribute('mood', 'color: red');
        log(`box has mood: ${'mood' in box.components}`);
      } catch (err) {
        log(`box.setAttribute('mood'): ${(err as Error).message}`);
      }
    };
    const colors = ['#1d2d4a', '#4a1d2d', '#1d4a2f'];
    if (stage.preview) {
      sway(stage);
      stage.every(1800, (i) => {
        if (i % 3 === 0) tryBox();
        else stage.scene.setAttribute('mood', 'color', colors[i % 3]);
      });
    } else if (stage.bar) {
      button(stage.bar, "scene.setAttribute('mood', ...)", () => stage.scene.setAttribute('mood', 'color', colors[Math.floor(Math.random() * 3)]));
      button(stage.bar, "box.setAttribute('mood', ...)", tryBox);
    }
  },
});
