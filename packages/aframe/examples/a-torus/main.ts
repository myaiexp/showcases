// <a-torus>: arc, radius and radius-tubular
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #18222d">
      <!-- The docs' torus: three quarters of a thin ring. -->
      <a-torus color="#43A367" arc="270" radius="1" radius-tubular="0.05" position="-1.8 1.6 -5"></a-torus>
      <!-- A fat torus with few segments. -->
      <a-torus color="#FFC65D" radius="0.6" radius-tubular="0.3" segments-radial="8" segments-tubular="12" flat-shading="true"
               position="0.3 1.4 -4.5" animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-torus>
      <!-- arc grows from a sliver to a full ring. -->
      <a-torus color="#EF2D5E" radius="0.7" radius-tubular="0.12" position="2.2 1.6 -5"
               animation="property: geometry.arc; from: 10; to: 360; dur: 3000; dir: alternate; loop: true; easing: easeInOutCubic"></a-torus>
      <a-plane rotation="-90 0 0" width="20" height="20" color="#2c3a48"></a-plane>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage);
  },
});
