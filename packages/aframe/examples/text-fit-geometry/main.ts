// Text with a geometry: text fits the plane, the plane fits the text, or both default to 1 m
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="fit" position="-2.6 2.6 -2.5"
                geometry="primitive: plane; width: 2.4; height: 0" material="color: #2a4a9b"
                text="value: This text will be as wide as the plane."></a-entity>
      <a-entity position="0.6 2.6 -2.5"
                geometry="primitive: plane; height: 0; width: 0" material="color: #2a4a9b"
                text="width: 2.4; value: The plane's width and height follow the text."></a-entity>
      <a-entity position="3.1 2.6 -2.5"
                geometry="primitive: plane" material="color: #2a4a9b"
                text="value: 1-wide\ndefault."></a-entity>
      <a-text value="text scales to geometry" position="-2.6 1.2 -2.5" width="2.6" align="center" color="#cfd8e3"></a-text>
      <a-text value="geometry scales to text" position="0.6 1.2 -2.5" width="2.6" align="center" color="#cfd8e3"></a-text>
      <a-text value="neither has a width" position="3.1 1.2 -2.5" width="2.6" align="center" color="#cfd8e3"></a-text>
    </a-scene>`,
  run(stage) {
    if (stage.preview) return sway(stage, { yaw: 5 });
    const fit = q(stage, '#fit');
    slider(stage.bar!, 'geometry width', [1, 3.5, 0.1], 2.4, (v) => fit.setAttribute('geometry', 'width', v));
  },
});
