// anchor and baseline: which point of the text block sits on the entity's position
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const anchors = ['left', 'center', 'right'];
const baselines = ['top', 'center', 'bottom'];

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      ${baselines
        .flatMap((baseline, r) =>
          anchors.map((anchor, c) => {
            const x = (c - 1) * 2.7;
            const y = 3.2 - r * 1.1;
            return `
      <a-entity position="${x} ${y} -4">
        <a-entity geometry="primitive: plane; width: 0.12; height: 0.12" material="shader: flat; color: #EF2D5E" position="0 0 0.02"></a-entity>
        <a-entity text="value: ${anchor} / ${baseline}; anchor: ${anchor}; baseline: ${baseline}; width: 1.8; color: #ffffff"></a-entity>
      </a-entity>`;
          }),
        )
        .join('')}
    </a-scene>`,
  run(stage) {
    stage.caption('red dot = entity position');
    if (stage.preview) sway(stage, { yaw: 5 });
  },
});
