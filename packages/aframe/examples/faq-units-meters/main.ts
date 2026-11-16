// A-Frame units are metres at 1:1: one-metre cubes beside a 1.8 m figure on a ruler
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';

export default aframeExample(import.meta.url, {
  scene: () => {
    const marks = [1, 2, 3, 4, 5].map((m) => `<a-box position="${m * 1.4 - 4.2} 0.5 -5" width="1" height="1" depth="1" color="${m % 2 ? '#4CC3D9' : '#6db3c7'}"></a-box>
      <a-text value="1 m" position="${m * 1.4 - 4.2} 1.25 -5" align="center" width="3" color="#fff"></a-text>`).join('\n');
    return `
    <a-scene background="color: #0d1420">
      ${marks}
      <a-entity position="1.5 0 -3">
        <a-cylinder radius="0.22" height="1.45" position="0 0.725 0" color="#ffc65d"></a-cylinder>
        <a-sphere radius="0.17" position="0 1.62 0" color="#ffc65d"></a-sphere>
        <a-text value="1.8 m person" position="0 2.1 0" align="center" width="3" color="#ffc65d"></a-text>
      </a-entity>
      <a-plane rotation="-90 0 0" width="14" height="10" position="0 0 -4" color="#33414f"></a-plane>
    </a-scene>`;
  },

  run(stage) {
    const cam = stage.scene.camera.el;
    stage.caption(`1 unit = 1 metre; the camera stands at y = ${cam.object3D.position.y} (eye height)`);
    if (stage.preview) sway(stage);
  },
});
