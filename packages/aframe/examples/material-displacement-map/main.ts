// displacementMap pushes vertices of a segmented plane up by a noise image
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { noise } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-assets><img id="height" src="${noise(5, 128, 6)}"></a-assets>
      <a-entity light="type: ambient; intensity: 0.3"></a-entity>
      <a-entity light="type: directional; intensity: 1.2" position="-2 3 1"></a-entity>
      <a-entity id="land" geometry="primitive: plane; width: 6; height: 4; segmentsWidth: 80; segmentsHeight: 50"
                material="color: #7BC8A4; flatShading: true; displacementMap: #height; displacementScale: 1.2; displacementBias: 0.5"
                position="0 0.8 -4.5" rotation="-65 0 0"
                animation="property: material.displacementTextureOffset; from: 0 0; to: 1 0; dur: 14000; easing: linear; loop: true"></a-entity>
    </a-scene>`,
  run(stage) {
    if (stage.preview) return sway(stage, { yaw: 6 });
    const land = q(stage, '#land');
    slider(stage.bar!, 'displacementScale', [0, 3, 0.1], 1.2, (v) => land.setAttribute('material', 'displacementScale', v));
    slider(stage.bar!, 'displacementBias', [0, 1, 0.05], 0.5, (v) => land.setAttribute('material', 'displacementBias', v));
  },
});
