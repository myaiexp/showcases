// The events object attaches handlers on play and detaches them on pause and remove
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('foo', {
      events: {
        click(this: { el: Entity }) {
          this.el.setAttribute('material', 'color', '#' + Math.floor(0x404040 + Math.random() * 0xbfbfbf).toString(16));
          this.el.sceneEl.emit('step', 'This entity was clicked!');
        },
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="e" foo color="#4CC3D9" position="0 1.4 -3" animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-box>
      ${board('board', '0 3.5 -4', 6, 1.2, 60)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    stage.scene.addEventListener('step', (evt) => log((evt as CustomEvent<string>).detail));
    const e = stage.scene.querySelector('#e') as Entity;
    const click = (): void => {
      e.emit('click');
      if (!e.isPlaying) log('click ignored: paused, so the handler is detached');
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1200, (i) => {
        if (i % 6 === 3) e.pause();
        else if (i % 6 === 0) e.play();
        click();
      });
    } else if (stage.bar) {
      button(stage.bar, "emit('click')", click);
      button(stage.bar, 'pause()', () => e.pause());
      button(stage.bar, 'play()', () => e.play());
      button(stage.bar, "removeAttribute('foo')", () => e.removeAttribute('foo'));
    }
  },
});
