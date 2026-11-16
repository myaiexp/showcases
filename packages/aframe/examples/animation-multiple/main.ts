// animation__name lets one entity run rotation, position and colour animations together
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-box position="0 1.2 -4" color="#4CC3D9"
             animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"
             animation__2="property: position; from: -1.5 1.2 -4; to: 1.5 1.2 -4; dur: 2500; dir: alternate; easing: easeInOutSine; loop: true"
             animation__color="property: material.color; from: #4CC3D9; to: #EF2D5E; dur: 2500; dir: alternate; easing: linear; loop: true"></a-box>
      <a-plane rotation="-90 0 0" width="20" height="20" color="#243040"></a-plane>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
