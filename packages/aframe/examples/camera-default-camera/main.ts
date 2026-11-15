// Inspect the default camera A-Frame adds, then take over by adding a camera of our own
import { sway } from '../../shared/card.ts';
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { fmt } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-box position="-1 1.6 -3" color="#4CC3D9"></a-box>
      <a-sphere position="1 1.6 -3" radius="0.6" color="#EF2D5E"></a-sphere>
      <a-plane rotation="-90 0 0" width="12" height="12" color="#39475a"></a-plane>
    </a-scene>`,
  run(stage) {
    const report = (): void => {
      const el = stage.scene.camera.el;
      const text = `active camera: ${el.hasAttribute('data-aframe-default-camera') ? 'the default one' : 'our own'}   components: ${Object.keys(el.components).filter((n) => /camera|controls/.test(n)).join(', ')}   position ${fmt(el.object3D.position)}`;
      stage.caption(text);
      const out = stage.readout();
      if (out) out.textContent = text;
    };
    stage.every(250, report);
    if (stage.preview) return sway(stage, { yaw: 12 });
    button(stage.bar!, 'add <a-entity camera> at 0 3 3', () => {
      const cam = document.createElement('a-entity');
      cam.setAttribute('camera', '');
      cam.setAttribute('look-controls', '');
      cam.setAttribute('position', '0 3 3');
      stage.scene.append(cam);
    });
  },
});
