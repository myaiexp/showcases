// cursor with rayOrigin: mouse turns mouse clicks on the canvas into click events on entities
import { aframeExample } from '../../shared/frame.ts';
import { ghost } from '../../shared/ghost.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    // The docs' cursor-listener: a sequential colour on each click.
    AFRAME.registerComponent('cursor-listener', {
      init() {
        let lastIndex = -1;
        const COLORS = ['#EF2D5E', '#7BC8A4', '#4CC3D9'];
        this.el.addEventListener('click', (evt: CustomEvent<{ intersection: { point: { x: number; y: number; z: number } } }>) => {
          lastIndex = (lastIndex + 1) % COLORS.length;
          this.el.setAttribute('material', 'color', COLORS[lastIndex]);
          const p = evt.detail.intersection.point;
          this.el.sceneEl.emit('clicked-at', `${this.el.id} clicked at ${p.x.toFixed(2)} ${p.y.toFixed(2)} ${p.z.toFixed(2)}`);
        });
      },
    });
  },

  scene: `
    <a-scene cursor="rayOrigin: mouse" raycaster="objects: [cursor-listener]" background="color: #141c26">
      <a-entity id="left" cursor-listener geometry="primitive: box" material="color: #4CC3D9" position="-1.6 1.5 -4"></a-entity>
      <a-entity id="middle" cursor-listener geometry="primitive: sphere; radius: 0.6" material="color: #4CC3D9" position="0 1.5 -4"></a-entity>
      <a-entity id="right" cursor-listener geometry="primitive: cylinder; radius: 0.5" material="color: #4CC3D9" position="1.6 1.5 -4"></a-entity>
    </a-scene>`,

  run(stage) {
    const out = stage.readout();
    stage.scene.addEventListener('clicked-at', (e) => {
      const line = (e as CustomEvent<string>).detail;
      stage.caption(line);
      if (out) out.textContent = `${line}\n${out.textContent}`.split('\n').slice(0, 6).join('\n');
    });
    stage.caption('Click a shape');

    if (stage.preview) {
      // Cards: a pretend mouse visits each shape and clicks it.
      const mouse = ghost(stage);
      const spots: [number, number][] = [[0.3, 0.5], [0.5, 0.5], [0.7, 0.5]];
      stage.every(1400, async (i) => {
        const [x, y] = spots[i % spots.length]!;
        await mouse.glide(x, y, 700);
        mouse.click();
      });
    }
  },
});
