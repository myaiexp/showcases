// <a-text> sets the text component through attributes: font, colour, alignment, width
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const fonts = ['roboto', 'dejavu', 'exo2bold', 'exo2semibold', 'aileronsemibold', 'kelsonsans', 'monoid', 'mozillavr', 'sourcecodepro'];

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-text value="Hello, World!" position="0 2.75 -3" align="center" width="6" color="#FFC65D"></a-text>
      ${fonts
        .map(
          (font, i) => `
      <a-text value="${font}: The quick brown fox" font="${font}"
              position="${i % 2 ? 0.15 : -2.85} ${2.1 - Math.floor(i / 2) * 0.45} -3" width="2.7" color="#E6E6E6"></a-text>`,
        )
        .join('')}
      <a-text value="Now Interactable" geometry="primitive: plane; width: 1.6; height: 0.3" material="color: #2a4a6b"
              align="center" position="0 -0.2 -3" width="3"></a-text>
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 10 });
  },
});
