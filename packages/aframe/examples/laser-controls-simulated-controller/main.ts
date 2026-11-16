// laser-controls on a pretend controller: emit the events a headset would send
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { logger } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('toggle-colour', {
      init() {
        this.el.addEventListener('click', () => {
          const on = this.el.getAttribute('data-on') !== 'true';
          this.el.setAttribute('data-on', String(on));
          this.el.setAttribute('material', 'color', on ? '#7BC8A4' : '#EF2D5E');
          this.el.sceneEl.emit('note', `${this.el.id}: click from the trigger`);
        });
      },
    });
  },
  scene: `
    <a-scene background="color: #10151c">
      <!-- The "hand": a laser-controls entity that we swing by animation, since no controller tracks it here. -->
      <a-entity id="hand" laser-controls="hand: right; model: false" raycaster="objects: .links; far: 8" position="0.4 1.3 -0.5"
                animation="property: rotation; from: 0 40 0; to: 0 -40 0; dur: 4000; dir: alternate; easing: easeInOutSine; loop: true"></a-entity>
      <a-box id="left" class="links" toggle-colour position="-1.4 1.4 -4" color="#EF2D5E"></a-box>
      <a-box id="right" class="links" toggle-colour position="2.2 1.4 -4" color="#EF2D5E"></a-box>
    </a-scene>`,
  run(stage) {
    const hand = q(stage, '#hand');
    const log = logger(stage, 5);
    stage.scene.addEventListener('note', (e) => log((e as CustomEvent<string>).detail));
    const connect = (): void => {
      // tracked-controls' event: a controller connected. The name picks laser-controls' cursor settings.
      hand.emit('controllerconnected', { name: 'vive-controls' }, false);
      log('controllerconnected -> raycaster showLine and cursor configured');
    };
    const trigger = (): void => {
      hand.emit('triggerdown', null, false);
      hand.emit('triggerup', null, false);
    };
    stage.caption('emit controllerconnected, then triggerdown / triggerup');
    if (stage.bar) {
      button(stage.bar, 'controllerconnected', connect);
      button(stage.bar, 'triggerdown + triggerup', trigger);
    }
    if (stage.preview) {
      sway(stage, { yaw: 6 });
      connect();
      stage.every(1000, trigger);
    }
  },
});
