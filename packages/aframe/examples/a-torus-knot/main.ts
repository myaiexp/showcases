// <a-torus-knot>: p and q wind the tube into different knots
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #18222d">
      <!-- p windings around the axis, q around the tube's circle. -->
      <a-torus-knot color="#B84A39" p="2" q="3" radius="0.6" radius-tubular="0.12" position="-2.2 1.6 -5" animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-torus-knot>
      <a-torus-knot color="#4CC3D9" p="2" q="7" radius="0.6" radius-tubular="0.06" segments-tubular="200" position="0 1.6 -5" animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-torus-knot>
      <a-torus-knot color="#FFC65D" p="3" q="5" radius="0.6" radius-tubular="0.08" segments-tubular="200" position="2.2 1.6 -5" animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-torus-knot>
      <!-- The docs' half knot: arc 180. -->
      <a-torus-knot color="#7BC8A4" arc="180" p="2" q="7" radius="0.3" radius-tubular="0.03" position="0 0.45 -3"></a-torus-knot>
      <a-plane rotation="-90 0 0" width="20" height="20" color="#2c3a48"></a-plane>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage);
  },
});
