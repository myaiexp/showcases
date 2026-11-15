// scale="1 1 -1" reflects a sphere so its texture shows on the inside
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { panorama } from '../../shared/images.ts';
import { q } from '../../shared/comp-dom.ts';
import { toggle } from '../../shared/controls.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene>
      <a-assets><img id="sky" src="${panorama()}"></a-assets>
      <a-entity id="dome" geometry="primitive: sphere; radius: 50; segmentsWidth: 48; segmentsHeight: 24" material="src: #sky; shader: flat" scale="1 1 -1"></a-entity>
      <a-text value="" id="note" position="0 3.2 -3" width="5" align="center" color="#ffffff"></a-text>
      <a-box position="0 1.2 -3" color="#EF2D5E" animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-box>
    </a-scene>`,
  run(stage) {
    const dome = q(stage, '#dome');
    const note = q(stage, '#note');
    const show = (): void => {
      const text = `dome scale: ${JSON.stringify(dome.getAttribute('scale'))}`;
      note.setAttribute('text', 'value', text);
      stage.caption(text);
    };
    show();
    if (stage.bar) toggle(stage.bar, 'scale z = -1 (reflected)', true, (v) => (dome.setAttribute('scale', `1 1 ${v ? -1 : 1}`), show()));
    if (stage.preview) sway(stage, { yaw: 40, seconds: 12 });
  },
});
