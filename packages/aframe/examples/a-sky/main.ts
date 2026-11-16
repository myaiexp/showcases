// <a-sky>: an equirectangular image around the camera, or a plain colour
import { sway } from '../../shared/card.ts';
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { panorama } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene>
      <a-assets>
        <img id="sky" src="${panorama()}">
      </a-assets>
      <!-- An equirectangular image as a background: a 2:1 image wrapped on a huge inward-facing sphere. -->
      <a-sky src="#sky" rotation="0 -90 0"></a-sky>
      <a-box color="#4CC3D9" position="0 1.2 -3" animation="property: rotation; to: 0 360 0; dur: 10000; easing: linear; loop: true"></a-box>
    </a-scene>`,

  run(stage) {
    if (stage.preview) sway(stage, { yaw: 60, pitch: 6, seconds: 14 });
    const sky = stage.scene.querySelector('a-sky')!;
    if (!stage.bar) return;
    let plain = false;
    const toggle = button(stage.bar, 'Plain colour', () => {
      // A plain colour as a background: drop the image, keep the sphere.
      plain = !plain;
      sky.setAttribute('material', plain ? { src: '', color: '#6EBAA7' } : { src: '#sky', color: '#FFF' });
      toggle.textContent = plain ? 'Image' : 'Plain colour';
    });
    stage.caption('Drag to look around');
  },
});
