// Events on the hit entities and the closest-entity event on the raycaster
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { logger } from '../../shared/comp-log.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('lights-up', {
      init() {
        this.el.addEventListener('raycaster-intersected', () => {
          this.el.setAttribute('material', 'emissive', '#ffffff');
          this.el.sceneEl.emit('note', `${this.el.id}: raycaster-intersected`);
        });
        this.el.addEventListener('raycaster-intersected-cleared', () => {
          this.el.setAttribute('material', 'emissive', '#000000');
          this.el.sceneEl.emit('note', `${this.el.id}: raycaster-intersected-cleared`);
        });
      },
    });
  },
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="ray" position="0 1.5 0" rotation="0 90 0" raycaster="objects: [lights-up]; showLine: true; far: 10"
                animation="property: rotation; from: 0 40 0; to: 0 -40 0; dur: 5000; dir: alternate; easing: linear; loop: true"></a-entity>
      <a-box id="near" lights-up position="-2 1.5 -4" color="#EF2D5E"></a-box>
      <a-box id="far" lights-up position="0 1.5 -7" color="#4CC3D9" scale="1.5 1.5 1.5"></a-box>
      <a-box id="side" lights-up position="2 1.5 -4" color="#7BC8A4"></a-box>
    </a-scene>`,
  run(stage) {
    const log = logger(stage, 7);
    stage.scene.addEventListener('note', (e) => log((e as CustomEvent<string>).detail));
    const ray = stage.scene.querySelector('#ray') as Entity;
    ray.addEventListener('raycaster-closest-entity-changed', (e) => log(`ray: closest-entity-changed (${e.detail?.el?.id ?? 'none'})`));
    if (stage.preview) sway(stage, { yaw: 4 });
  },
});
