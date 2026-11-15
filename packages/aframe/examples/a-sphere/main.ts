// <a-sphere>: radius, segments, and phi and theta cut-outs
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #18222d">
      <!-- Basic sphere. -->
      <a-sphere color="yellow" radius="0.8" position="-2.2 1.2 -5"></a-sphere>
      <!-- Few segments: a faceted ball. -->
      <a-sphere color="#4CC3D9" radius="0.6" segments-width="8" segments-height="6" flat-shading="true"
                position="0 0.9 -4" animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-sphere>
      <!-- theta-length 90 keeps the top quarter: a dome. -->
      <a-sphere color="#EF2D5E" radius="0.8" theta-length="90" side="double" position="2.2 0.4 -5"></a-sphere>
      <!-- phi-length takes a wedge out, animated. -->
      <a-sphere color="#7BC8A4" radius="0.5" side="double" position="0 2.3 -5"
                animation="property: geometry.phiLength; from: 360; to: 60; dur: 2500; dir: alternate; loop: true; easing: easeInOutSine"></a-sphere>
      <a-plane rotation="-90 0 0" width="20" height="20" color="#2c3a48"></a-plane>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage);
  },
});
