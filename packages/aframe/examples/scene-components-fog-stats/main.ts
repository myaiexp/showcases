// Components attach to the scene too: fog and stats on <a-scene>
import { aframeExample } from '../../shared/frame.ts';
import { select, toggle } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #8fa3b8" fog="type: linear; color: #8fa3b8; near: 2; far: 14">
      <a-box color="#ef2d5e" position="-1.2 0.5 -3"></a-box>
      <a-box color="#4CC3D9" position="1.2 0.5 -7"></a-box>
      <a-box color="#ffc65d" position="-1.2 0.5 -11"></a-box>
      <a-box color="#7be0c3" position="1.2 0.5 -15"></a-box>
      <a-plane rotation="-90 0 0" width="40" height="60" position="0 0 -20" color="#3b4a5a"></a-plane>
    </a-scene>`,

  run(stage) {
    const s = stage.scene;
    const near = (v: number): void => s.setAttribute('fog', { near: v });
    if (stage.preview) {
      sway(stage);
      stage.every(1200, (i) => near(i % 2 ? 2 : 8));
      stage.caption('<a-scene fog>');
    } else if (stage.bar) {
      const out = stage.readout();
      const show = (): void => {
        if (out) out.textContent = `fog data: ${JSON.stringify(s.getAttribute('fog'))}\nstats attached: ${'stats' in s.components}`;
      };
      show();
      select(stage.bar, 'fog type', ['linear', 'exponential'], 'linear', (v) => {
        s.setAttribute('fog', v === 'linear' ? { type: v, near: 2, far: 14 } : { type: v, density: 0.08 });
        show();
      });
      toggle(stage.bar, 'stats', false, (on) => {
        if (on) s.setAttribute('stats', '');
        else s.removeAttribute('stats');
        show();
      });
    }
  },
});
