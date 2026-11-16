// line="start: …; end: …; color: …" and line__2 for a second line on the same entity
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="lines" position="0 0 -4"
                line="start: 0 1 0; end: 2 0 -3; color: red"
                line__2="start: -2 3 3; end: 0 3 -3; color: green; opacity: 0.6"
                line__sweep="start: 0 0.2 0; end: -2 2 0; color: #4CC3D9"
                animation="property: line__sweep.end; from: -2 0.2 0; to: -2 3 0; dur: 2200; dir: alternate; easing: easeInOutSine; loop: true"></a-entity>
    </a-scene>`,
  run(stage) {
    const el = q(stage, '#lines');
    stage.caption(`object3DMap: ${Object.keys(el.object3DMap).join(', ')}`);
    if (stage.preview) return sway(stage, { yaw: 12 });
    const out = stage.readout();
    if (out) out.textContent = `el.getObject3D('line') is a ${el.getObject3D('line')!.type}; el.getObject3D('line__2') is a ${el.getObject3D('line__2')!.type}`;
    toggle(stage.bar!, 'line__2 visible', true, (v) => el.setAttribute('line__2', 'visible', v));
  },
});
