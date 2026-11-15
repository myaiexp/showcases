// width, wrapCount and whiteSpace decide where a long text breaks
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { select, slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-plane position="0 1.8 -4.01" width="5" height="3.2" color="#1c2635"></a-plane>
      <a-entity id="t" position="0 1.8 -4"
                text="value: Text can be wrapped by specifying width in A-Frame units, and wrapCount says roughly how many characters fit before a break.; width: 4.5; wrapCount: 28; color: #ffffff; anchor: center; baseline: center"
                animation="property: text.width; from: 3; to: 4.8; dur: 3500; dir: alternate; easing: easeInOutSine; loop: true"></a-entity>
    </a-scene>`,
  run(stage) {
    stage.caption('text="width: …; wrapCount: 28"');
    if (stage.preview) return sway(stage, { yaw: 4 });
    const t = q(stage, '#t');
    t.removeAttribute('animation');
    slider(stage.bar!, 'width', [1, 5, 0.1], 4.5, (v) => t.setAttribute('text', 'width', v));
    slider(stage.bar!, 'wrapCount', [8, 60, 1], 28, (v) => t.setAttribute('text', 'wrapCount', v));
    select(stage.bar!, 'whiteSpace', ['normal', 'pre', 'nowrap'], 'normal', (v) => t.setAttribute('text', 'whiteSpace', v));
  },
});
