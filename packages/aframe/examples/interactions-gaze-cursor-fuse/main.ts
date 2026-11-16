// A fuse cursor on the camera clicks whatever it gazes at for a set time
import { aframeExample } from '../../shared/frame.ts';
import { createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('cycle-color', {
      init() {
        const colors = ['#ef2d5e', '#ffc65d', '#7be0c3', '#4CC3D9'];
        let i = 0;
        this.el.addEventListener('click', () => {
          i = (i + 1) % colors.length;
          this.el.setAttribute('material', 'color', colors[i]);
          this.el.sceneEl.emit('note', `click on #${this.el.id}`);
        });
        this.el.addEventListener('fusing', () => this.el.setAttribute('scale', '1.2 1.2 1.2'));
        this.el.addEventListener('mouseleave', () => this.el.setAttribute('scale', '1 1 1'));
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="left" class="clickable" cycle-color color="#4CC3D9" position="-2.2 1.6 -4"></a-box>
      <a-sphere id="mid" class="clickable" cycle-color color="#4CC3D9" radius="0.6" position="0 1.6 -4"></a-sphere>
      <a-cone id="right" class="clickable" cycle-color color="#4CC3D9" radius-bottom="0.6" height="1.1" position="2.2 1.6 -4"></a-cone>
      <a-camera>
        <a-entity cursor="fuse: true; fuseTimeout: 450" raycaster="objects: .clickable" position="0 0 -1"
                  geometry="primitive: ring; radiusInner: 0.015; radiusOuter: 0.025" material="color: white; shader: flat"></a-entity>
      </a-camera>
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { max: 3 });
    stage.scene.addEventListener('note', (evt) => log((evt as CustomEvent<string>).detail));
    stage.caption('Look at a shape: after the fuse timeout it clicks');
    if (stage.preview) sway(stage, { yaw: 22, seconds: 7 });
    else log('Drag to look at a shape and hold the cursor on it for 450 ms.');
  },
});
