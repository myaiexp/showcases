// AFRAME.ANIME is the bundled anime.js: a timeline chains moves that animation cannot express
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('anime-path', {
      init() {
        const position = this.el.object3D.position;
        const timeline = AFRAME.ANIME.timeline({ loop: true, easing: 'easeInOutSine', duration: 700 });
        timeline
          .add({ targets: position, x: 1.8, y: 2.4 })
          .add({ targets: position, x: 0, y: 1.2, duration: 500, easing: 'easeOutBack' })
          .add({ targets: position, x: -1.8, y: 2.4 })
          .add({ targets: position, x: 0, y: 0.5, duration: 900, easing: 'easeInQuad' });
        this.timeline = timeline;
      },
      remove() {
        this.timeline.pause();
      },
    });
  },
  scene: `
    <a-scene background="color: #10151c">
      <a-sphere anime-path position="0 0.5 -4" radius="0.4" color="#7BC8A4"></a-sphere>
      <a-plane rotation="-90 0 0" width="14" height="14" position="0 0 -4" color="#243040"></a-plane>
    </a-scene>`,
  run(stage) {
    stage.caption('anime.timeline() on object3D.position');
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
