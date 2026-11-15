// <a-curvedimage>: a picture on part of a cylinder, sized with S = r × θ
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { panorama } from '../../shared/images.ts';

// The image is 2:1, so its arc length S must be twice its height.
const height = 2;
const radius = 4;
const arc = 2 * height; // S
const thetaLength = ((arc / radius) * 180) / Math.PI; // θ = S / r, in degrees

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #0f141b">
      <a-assets>
        <img id="my-image" src="${panorama({ top: '#0f3057', horizon: '#00a8cc', ground: '#21243d', hills: '#162447' })}">
      </a-assets>
      <!-- The docs' values: height 3, radius 5.7, theta-length 72, turned 100 degrees and scaled. -->
      <a-curvedimage src="#my-image" height="3.0" radius="5.7" theta-length="72" rotation="0 100 0" scale="0.8 0.8 0.8"></a-curvedimage>
      <!-- Height, radius and theta-length worked out from the 2:1 aspect ratio, centred in front. -->
      <a-curvedimage src="#my-image" height="${height}" radius="${radius}" theta-length="${thetaLength.toFixed(1)}"
                     theta-start="${(180 - thetaLength / 2).toFixed(1)}" position="0 1.6 0"></a-curvedimage>
      <a-text value="theta-length ${thetaLength.toFixed(1)} = (2 x ${height} / ${radius}) rad" align="center" position="0 0.3 -3" width="3"></a-text>
    </a-scene>`,

  run(stage) {
    if (stage.preview) sway(stage, { yaw: 40, seconds: 12 });
  },
});
