// align: left | center | right positions each line inside a multi-line text block
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const value = 'A-Frame\\nis a web framework\\nfor building\\nvirtual reality';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      ${(['left', 'center', 'right'] as const)
        .map(
          (align, i) => `
      <a-entity text="value: ${value}; align: ${align}; width: 2.6; color: #FFC65D" position="${(i - 1) * 2.9} 2 -4"></a-entity>
      <a-entity text="value: align ${align}; width: 2.6; align: center; color: #cfd8e3" position="${(i - 1) * 2.9} 0.8 -4"></a-entity>`,
        )
        .join('')}
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 5 });
  },
});
