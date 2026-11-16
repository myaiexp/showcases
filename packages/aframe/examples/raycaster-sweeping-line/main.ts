// A sweeping ray that shows its line and reports what it starts and stops hitting
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { logger } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('collider-check', {
      dependencies: ['raycaster'],
      init() {
        const note = (text: string): void => this.el.sceneEl.emit('note', text);
        this.el.addEventListener('raycaster-intersection', (evt: CustomEvent<{ els: HTMLElement[] }>) => note(`hit: ${evt.detail.els.map((e) => e.id).join(', ')}`));
        this.el.addEventListener('raycaster-intersection-cleared', (evt: CustomEvent<{ clearedEls: HTMLElement[] }>) => note(`cleared: ${evt.detail.clearedEls.map((e) => e.id).join(', ')}`));
      },
    });
  },
  scene: `
    <a-scene background="color: #10151c">
      <a-entity position="0 1.5 -1" rotation="0 90 0" animation="property: rotation; from: 0 50 0; to: 0 -50 0; dur: 3000; dir: alternate; easing: easeInOutSine; loop: true">
        <a-entity collider-check raycaster="objects: .collidable; showLine: true; far: 8; lineColor: #FFC65D"></a-entity>
      </a-entity>
      <a-box id="left" class="collidable" position="-2.4 1.5 -6" color="#EF2D5E"></a-box>
      <a-box id="middle" class="collidable" position="0 1.5 -8" color="#4CC3D9"></a-box>
      <a-box id="right" class="collidable" position="2.4 1.5 -6" color="#7BC8A4"></a-box>
      <a-sphere id="ignored" position="1 1.5 -4" radius="0.4" color="#888888"></a-sphere>
    </a-scene>`,
  run(stage) {
    const log = logger(stage, 6);
    stage.scene.addEventListener('note', (e) => log((e as CustomEvent<string>).detail));
    if (stage.preview) sway(stage, { yaw: 4 });
  },
});
