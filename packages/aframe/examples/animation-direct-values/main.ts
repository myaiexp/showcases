// Tween object3D.position.y, object3D.rotation.z, material opacity and colour without setAttribute
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-box position="-2.4 1 -4" color="#FFC65D"
             animation="property: object3D.position.y; from: 1; to: 2.6; dur: 1200; dir: alternate; easing: easeInOutSine; loop: true"></a-box>
      <a-box position="-0.8 1.6 -4" color="#EF2D5E"
             animation="property: object3D.rotation.z; to: 360; dur: 3000; easing: linear; loop: true"></a-box>
      <a-box position="0.8 1.6 -4" color="#4CC3D9" material="transparent: true"
             animation="property: components.material.material.opacity; from: 1; to: 0.1; dur: 1500; dir: alternate; easing: linear; loop: true"></a-box>
      <a-box position="2.4 1.6 -4" color="#ffffff"
             animation="property: components.material.material.color; type: color; from: rgb(255, 80, 80); to: hsl(213, 100%, 70%); dur: 2000; dir: alternate; easing: linear; loop: true"></a-box>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
