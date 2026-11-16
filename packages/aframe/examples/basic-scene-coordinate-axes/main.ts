// A right-handed coordinate system in metres, with rotation in degrees by the right-hand rule
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity position="-0.6 0 -3">
        <a-cylinder color="#ef2d5e" radius="0.03" height="1.5" rotation="0 0 -90" position="0.75 0 0"></a-cylinder>
        <a-cone color="#ef2d5e" radius-bottom="0.08" height="0.2" rotation="0 0 -90" position="1.6 0 0"></a-cone>
        <a-text value="+X (right)" color="#ef2d5e" position="1.9 0.15 0" width="2.2" align="left"></a-text>
        <a-cylinder color="#7be0c3" radius="0.03" height="1.5" position="0 0.75 0"></a-cylinder>
        <a-cone color="#7be0c3" radius-bottom="0.08" height="0.2" position="0 1.6 0"></a-cone>
        <a-text value="+Y (up)" color="#7be0c3" position="0 1.95 0" width="2.2" align="center"></a-text>
        <a-cylinder color="#4CC3D9" radius="0.03" height="1.5" rotation="90 0 0" position="0 0 0.75"></a-cylinder>
        <a-cone color="#4CC3D9" radius-bottom="0.08" height="0.2" rotation="90 0 0" position="0 0 1.6"></a-cone>
        <a-text value="+Z (toward you)" color="#4CC3D9" position="0.1 0.15 1.9" width="2.2" align="left"></a-text>
        <a-box color="#ffc65d" width="0.5" height="0.5" depth="0.5" position="0 0 0"
               animation="property: rotation; to: 0 90 0; dur: 3000; easing: easeInOutSine; dir: alternate; loop: true"></a-box>
      </a-entity>
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    stage.caption('metres; +X right, +Y up, +Z toward you; positive rotation turns counter-clockwise about an axis you look along');
    if (stage.preview) sway(stage, { yaw: 25 });
  },
});
