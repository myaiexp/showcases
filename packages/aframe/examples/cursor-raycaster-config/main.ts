// cursor raycaster="far: …; interval: …; objects: .clickable" limits what a click reaches
import { aframeExample } from '../../shared/frame.ts';
import { ghost } from '../../shared/ghost.ts';
import { logger } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('flash-on-click', {
      init() {
        this.el.addEventListener('click', () => {
          this.el.setAttribute('material', 'emissive', '#ffffff');
          setTimeout(() => this.el.setAttribute('material', 'emissive', '#000000'), 250);
          this.el.sceneEl.emit('note', `${this.el.id} clicked`);
        });
      },
    });
  },
  scene: `
    <a-scene cursor="rayOrigin: mouse" raycaster="far: 6; interval: 100; objects: .clickable" background="color: #10151c">
      <a-box id="near-clickable" class="clickable" flash-on-click position="-1.8 1.6 -4" color="#7BC8A4"></a-box>
      <a-box id="not-clickable" flash-on-click position="0 1.6 -4" color="#EF2D5E"></a-box>
      <a-box id="far-clickable" class="clickable" flash-on-click position="1.8 1.6 -9" scale="2 2 2" color="#4CC3D9"></a-box>
    </a-scene>`,
  run(stage) {
    const log = logger(stage, 4);
    stage.scene.addEventListener('note', (e) => log((e as CustomEvent<string>).detail));
    stage.caption('Click each box: only the near .clickable one answers');
    if (!stage.preview) return;
    const mouse = ghost(stage);
    const stops = [0.35, 0.5, 0.65];
    stage.every(1300, async (i) => {
      await mouse.glide(stops[i % 3]!, 0.5, 500);
      mouse.click();
    });
  },
});
