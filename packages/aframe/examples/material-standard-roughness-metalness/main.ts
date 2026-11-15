// The standard material: roughness across, metalness down, with an environment to reflect
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { panorama } from '../../shared/images.ts';

const roughness = [0, 0.25, 0.5, 0.75, 1];
const metalness = [0, 0.4, 0.8];

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-assets><img id="env" src="${panorama()}"></a-assets>
      <a-entity light="type: ambient; intensity: 0.4"></a-entity>
      <a-entity light="type: directional; intensity: 1.4" position="-1 3 1"></a-entity>
      ${metalness
        .map((m, row) =>
          roughness
            .map(
              (r, col) => `
      <a-sphere radius="0.38" position="${(col - 2) * 0.95} ${2.5 - row * 0.95} -3.5" segments-width="24" segments-height="16"
                material="color: #d9a05b; roughness: ${r}; metalness: ${m}; sphericalEnvMap: #env"></a-sphere>`,
            )
            .join(''),
        )
        .join('')}
      <a-text value="roughness 0 to 1" position="0 0.2 -3.5" width="3" align="center" color="#cfd8e3"></a-text>
      <a-text value="metalness 0 to 0.8, top to bottom" position="0 -0.1 -3.5" width="3" align="center" color="#8795a8"></a-text>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 8 });
  },
});
