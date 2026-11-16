// Re-sending identical animation data through setAttribute is ignored; emitting a startEvent is not
import { q } from '../../shared/comp-dom.ts';
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-box id="viaSet" position="-2 1.6 -4" color="#EF2D5E"></a-box>
      <a-box id="viaEmit" position="2 1.6 -4" color="#4CC3D9"
             animation__slide="property: position; to: 2 3 -4; from: 2 1.6 -4; dur: 800; easing: easeOutQuad; startEvents: slide"></a-box>
      <a-text value="setAttribute" position="-2 0.6 -4" align="center" width="4" color="#cfd8e3"></a-text>
      <a-text value="emit" position="2 0.6 -4" align="center" width="4" color="#cfd8e3"></a-text>
    </a-scene>`,
  run(stage) {
    const set = q(stage, '#viaSet');
    const emit = q(stage, '#viaEmit');
    const out = stage.readout();
    const counts = { setAttribute: 0, emit: 0 };
    const show = (): void => {
      const text = `animationcomplete  via setAttribute: ${counts.setAttribute}   via emit: ${counts.emit}`;
      stage.caption(text);
      if (out) out.textContent = text;
    };
    set.addEventListener('animationcomplete', () => (counts.setAttribute++, show()));
    emit.addEventListener('animationcomplete__slide', () => (counts.emit++, show()));
    show();

    const fireSet = (): void => {
      set.object3D.position.set(-2, 1.6, -4);
      set.setAttribute('animation', { property: 'position', from: '-2 1.6 -4', to: '-2 3 -4', dur: 800, easing: 'easeOutQuad' });
    };
    const fireEmit = (): void => emit.emit('slide', null, false);
    if (stage.bar) {
      button(stage.bar, 'setAttribute (same data)', fireSet);
      button(stage.bar, 'emit startEvent', fireEmit);
    }
    if (stage.preview) stage.every(1800, () => (fireSet(), fireEmit()));
  },
});
