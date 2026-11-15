// <a-dodecahedron>: radius and detail, from faceted to nearly round
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #18222d">
      <!-- detail adds subdivisions: 0 is the plain solid. -->
      <a-dodecahedron color="#FF926B" radius="0.7" detail="0" flat-shading="true" position="-2 1.4 -5" animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-dodecahedron>
      <a-dodecahedron color="#FF926B" radius="0.7" detail="1" flat-shading="true" position="0 1.4 -5" animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-dodecahedron>
      <a-dodecahedron color="#FF926B" radius="0.7" detail="3" position="2 1.4 -5" animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-dodecahedron>
      <!-- The same solid as a wireframe shows its faces. -->
      <a-dodecahedron color="#FFFFFF" radius="0.45" wireframe="true" position="0 0.45 -3.5"></a-dodecahedron>
      <a-plane rotation="-90 0 0" width="20" height="20" color="#2c3a48"></a-plane>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage);
  },
});
