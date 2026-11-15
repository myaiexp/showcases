// Raycasters ignore text; a plane geometry on the entity gives the cursor something to hit
import { aframeExample } from '../../shared/frame.ts';
import { ghost } from '../../shared/ghost.ts';
import { logger } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('hit-glow', {
      init() {
        this.el.addEventListener('mouseenter', () => {
          this.el.setAttribute('text', 'color', '#7BC8A4');
          this.el.sceneEl.emit('hit', `${this.el.id}: mouseenter`);
        });
        this.el.addEventListener('mouseleave', () => this.el.setAttribute('text', 'color', '#ffffff'));
      },
    });
  },
  scene: `
    <a-scene cursor="rayOrigin: mouse" raycaster="objects: [hit-glow]" background="color: #10151c">
      <a-entity id="text-only" hit-glow text="value: text only; width: 3; align: center" position="-2 2 -4"></a-entity>
      <a-entity id="with-plane" hit-glow geometry="primitive: plane; width: 3; height: 0.8" material="color: #2a3b50"
                text="value: text + plane; width: 2.6; align: center" position="2 2 -4"></a-entity>
    </a-scene>`,
  run(stage) {
    const log = logger(stage, 4);
    stage.scene.addEventListener('hit', (e) => log((e as CustomEvent<string>).detail));
    stage.caption('Hover both labels');
    if (!stage.preview) return;
    const mouse = ghost(stage);
    mouse.move(0.2, 0.4);
    stage.every(1300, (i) => void mouse.glide(i % 2 ? 0.72 : 0.28, 0.4, 600));
  },
});
