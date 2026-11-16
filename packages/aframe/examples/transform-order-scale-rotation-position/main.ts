// scale, then rotation, then position: one entity, the same chain nested, and the wrong order
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const bar = 'geometry="primitive: box; width: 0.5; height: 0.5; depth: 0.5"';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <!-- One entity: scale, then rotation, then position. -->
      <a-entity ${bar} material="color: #4CC3D9" scale="3 1 1" rotation="0 0 45" position="-3 1.5 -4"></a-entity>

      <!-- The same chain made by hand: position outermost, scale innermost. -->
      <a-entity position="0 1.5 -4">
        <a-entity rotation="0 0 45">
          <a-entity ${bar} material="color: #7BC8A4" scale="3 1 1"></a-entity>
        </a-entity>
      </a-entity>

      <!-- Rotation innermost, scale outside it: the stretch is applied after the turn and skews. -->
      <a-entity position="3 1.5 -4">
        <a-entity scale="3 1 1">
          <a-entity ${bar} material="color: #EF2D5E" rotation="0 0 45"></a-entity>
        </a-entity>
      </a-entity>
      <a-text value="one entity" position="-3 0.3 -4" width="3" align="center" color="#cfd8e3"></a-text>
      <a-text value="nested in order" position="0 0.3 -4" width="3" align="center" color="#cfd8e3"></a-text>
      <a-text value="scale outside rotation" position="3 0.3 -4" width="3.4" align="center" color="#cfd8e3"></a-text>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 5 });
  },
});
