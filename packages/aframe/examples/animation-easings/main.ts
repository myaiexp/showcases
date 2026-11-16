// Eight spheres run the same course with different easing functions
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

const easings = ['linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInOutCubic', 'easeOutExpo', 'easeOutBack', 'easeOutElastic'];

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      ${easings
        .map((easing, i) => {
          const y = 3 - i * 0.45;
          return `
      <a-text value="${easing}" position="-3.9 ${y} -4" width="3" align="left" color="#cfd8e3"></a-text>
      <a-sphere radius="0.16" position="-1 ${y} -4" color="hsl(${i * 40}, 70%, 60%)"
                animation="property: position; from: -1 ${y} -4; to: 3 ${y} -4; dur: 2000; easing: ${easing}; dir: alternate; loop: true"></a-sphere>`;
        })
        .join('')}
    </a-scene>`,
  run(stage) {
    if (stage.preview) sway(stage, { yaw: 5 });
  },
  height: 420,
});
