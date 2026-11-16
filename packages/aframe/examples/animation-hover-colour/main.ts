// A mouse cursor's mouseenter and mouseleave start colour tweens on the entity under it
import { aframeExample } from '../../shared/frame.ts';
import { ghost } from '../../shared/ghost.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene cursor="rayOrigin: mouse" background="color: #10151c">
      <a-entity geometry="primitive: box" material="color: red" position="0 1.6 -3" rotation="0 30 0"
        animation__mouseenter="property: components.material.material.color; type: color; to: blue; startEvents: mouseenter; dur: 500"
        animation__mouseleave="property: components.material.material.color; type: color; to: red; startEvents: mouseleave; dur: 500"
        animation__customevent="property: components.material.material.color; type: color; from: red; to: blue; startEvents: triggeranimation; dur: 500"></a-entity>
    </a-scene>`,
  run(stage) {
    stage.caption('Move the mouse over the box');
    if (!stage.preview) return;
    const mouse = ghost(stage);
    mouse.move(0.1, 0.5);
    stage.every(1400, (i) => void mouse.glide(i % 2 ? 0.5 : 0.1, 0.5, 500));
  },
});
