// el.components.animation.animation is the anime.js object, .config what was passed to it
import { q } from '../../shared/comp-dom.ts';
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-sphere id="ball" radius="0.5" position="0 0.8 -3.5" color="#FF9E5E"
                animation="property: position; from: 0 0.8 -3.5; to: 0 2.6 -3.5; dur: 2400; dir: alternate; easing: easeInOutSine; loop: true"></a-sphere>
    </a-scene>`,
  run(stage) {
    const ball = q(stage, '#ball');
    const out = stage.readout();
    stage.every(120, () => {
      const anim = ball.components.animation as unknown as { animation: { progress: number; currentTime: number }; config: Record<string, unknown> };
      const text = `animation.progress = ${anim.animation.progress.toFixed(1)}%   currentTime = ${Math.round(anim.animation.currentTime)} ms`;
      stage.caption(text);
      if (out) out.textContent = `${text}\nconfig keys: ${Object.keys(anim.config).join(', ')}\nconfig.duration = ${String(anim.config.duration)}   config.easing = ${String(anim.config.easing)}`;
    });
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
