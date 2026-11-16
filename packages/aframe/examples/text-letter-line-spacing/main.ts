// Pixel spacing between letters and lines, tab width and a left offset
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="t" position="0 1.8 -3.5"
                text="value: Letters\\nand lines\\n\\tindent with a tab; width: 4; align: left; color: #FFC65D; letterSpacing: 0; lineHeight: 60; tabSize: 4"
                animation="property: text.letterSpacing; from: 0; to: 12; dur: 2400; dir: alternate; easing: easeInOutSine; loop: true"></a-entity>
    </a-scene>`,
  run(stage) {
    stage.caption('animating text.letterSpacing from 0 to 12');
    if (stage.preview) return sway(stage, { yaw: 4 });
    const t = q(stage, '#t');
    t.removeAttribute('animation');
    slider(stage.bar!, 'letterSpacing', [-5, 30, 1], 0, (v) => t.setAttribute('text', 'letterSpacing', v));
    slider(stage.bar!, 'lineHeight', [30, 140, 5], 60, (v) => t.setAttribute('text', 'lineHeight', v));
    slider(stage.bar!, 'tabSize', [0, 12, 1], 4, (v) => t.setAttribute('text', 'tabSize', v));
    slider(stage.bar!, 'xOffset', [0, 0.5, 0.05], 0, (v) => t.setAttribute('text', 'xOffset', v));
  },
});
