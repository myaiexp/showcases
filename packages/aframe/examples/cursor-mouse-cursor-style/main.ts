// mouseCursorStylesEnabled: a pointer cursor over entities in rayOrigin: mouse mode
import { toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { ghost } from '../../shared/ghost.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene cursor="rayOrigin: mouse; mouseCursorStylesEnabled: true" background="color: #10151c">
      <a-box position="0 1.6 -3.5" width="1.6" height="1.6" depth="1.6" color="#FFC65D"
             animation="property: rotation; to: 0 360 0; dur: 10000; easing: linear; loop: true"></a-box>
    </a-scene>`,
  run(stage) {
    const report = (): void => {
      const hover = stage.scene.canvas.classList.contains('a-mouse-cursor-hover');
      const text = `canvas class a-mouse-cursor-hover (pointer cursor): ${hover ? 'on' : 'off'}   mouseCursorStylesEnabled: ${stage.scene.getAttribute('cursor').mouseCursorStylesEnabled}`;
      stage.caption(text);
      const out = stage.readout();
      if (out) out.textContent = text;
    };
    stage.every(150, report);
    if (stage.bar) toggle(stage.bar, 'mouseCursorStylesEnabled', true, (v) => stage.scene.setAttribute('cursor', 'mouseCursorStylesEnabled', v));
    if (stage.preview) {
      const mouse = ghost(stage);
      mouse.move(0.1, 0.5);
      stage.every(1500, (i) => void mouse.glide(i % 2 ? 0.5 : 0.1, 0.5, 600));
    }
  },
});
