// loop: N, delay and dir change when and how often an animation plays
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const lanes = [
  ['loop: 0 (once)', ''],
  ['loop: 3', 'loop: 3'],
  ['delay: 1500', 'delay: 1500; loop: true'],
  ['dir: reverse', 'dir: reverse; loop: true'],
  ['dir: alternate', 'dir: alternate; loop: true'],
] as const;

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      ${lanes
        .map(([label, opts], i) => {
          const x = -3.2 + i * 1.6;
          return `
      <a-sphere radius="0.28" position="${x} 0.4 -4" color="hsl(${i * 60 + 10}, 70%, 60%)"
                animation="property: position; from: ${x} 0.4 -4; to: ${x} 2.8 -4; dur: 1200; easing: easeInOutQuad; ${opts}"></a-sphere>
      <a-text value="${label}" position="${x} 0 -4" width="2.2" align="center" color="#cfd8e3"></a-text>`;
        })
        .join('')}
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 5 });
  },
  height: 420,
});
