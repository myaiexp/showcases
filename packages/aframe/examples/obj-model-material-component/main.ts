// obj-model without mtl: material="…" colours the loaded meshes
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { obj } from '../../shared/models.ts';

export default aframeExample(import.meta.url, {
  scene: () => {
    const gem = obj.gem();
    const spin = 'animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"';
    return `
    <a-scene background="color: #10151c">
      <a-entity obj-model="obj: url(${gem})" material="shader: flat; color: #FFC65D" position="-2.2 1.6 -4" ${spin}></a-entity>
      <a-entity obj-model="obj: url(${gem})" material="wireframe: true; color: #4CC3D9" position="0 1.6 -4" ${spin}></a-entity>
      <a-entity obj-model="obj: url(${gem})" material="metalness: 0.9; roughness: 0.25; color: #c58bff" position="2.2 1.6 -4" ${spin}></a-entity>
    </a-scene>`;
  },
  run(stage) {
    stage.caption('flat, wireframe and metallic materials on one OBJ');
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
