// pause() stops animations and calls pause on every component, children included; play() resumes
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('chatty', {
      pause() {
        this.el.emit('chat', 'pause() on #' + this.el.id);
      },
      play() {
        this.el.emit('chat', 'play() on #' + this.el.id);
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="ball" chatty geometry="primitive: sphere; radius: 0.5" material="color: #ef2d5e" position="0 1.3 -3"
                animation="property: object3D.position.y; to: 2.4; dir: alternate; dur: 900; easing: easeInOutQuad; loop: true">
        <a-box id="satellite" chatty color="#4CC3D9" scale="0.4 0.4 0.4" position="1.2 0 0"
               animation="property: rotation; to: 0 360 0; dur: 1500; easing: linear; loop: true"></a-box>
      </a-entity>
      ${board('board', '0 3.7 -4.5', 5.8, 1.4, 58)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    const el = stage.scene.querySelector('#ball') as Entity;
    stage.scene.addEventListener('chat', (evt) => log((evt as CustomEvent<string>).detail));
    if (stage.preview) {
      sway(stage);
      stage.every(1800, (i) => (i % 2 ? el.pause() : el.play()));
    } else if (stage.bar) {
      button(stage.bar, 'pause()', () => el.pause());
      button(stage.bar, 'play()', () => el.play());
    }
  },
});
