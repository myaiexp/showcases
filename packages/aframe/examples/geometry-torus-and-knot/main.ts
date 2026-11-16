// torus arc and torusKnot p/q: coprime pairs make knots, others make links
import { sway } from '../../shared/card.ts';
import { slider } from '../../shared/controls.ts';
import { q } from '../../shared/comp-dom.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity geometry="primitive: torus; radius: 0.8; radiusTubular: 0.2; arc: 180" material="color: #FFC65D" position="-2 1.7 -4"
                animation="property: rotation; to: 360 0 0; dur: 7000; easing: linear; loop: true"></a-entity>
      <a-entity id="knot" geometry="primitive: torusKnot; radius: 0.7; radiusTubular: 0.14; p: 3; q: 7; segmentsTubular: 120" material="color: #4CC3D9; metalness: 0.4; roughness: 0.3" position="2 1.7 -4"
                animation="property: rotation; to: 0 360 0; dur: 9000; easing: linear; loop: true"></a-entity>
    </a-scene>`,
  run(stage) {
    stage.caption('torusKnot p: 3, q: 7');
    if (stage.preview) return sway(stage, { yaw: 6 });
    const knot = q(stage, '#knot');
    const state = { p: 3, q: 7 };
    const set = (k: 'p' | 'q') => (v: number) => {
      state[k] = v;
      knot.setAttribute('geometry', k, v);
      stage.caption(`torusKnot p: ${state.p}, q: ${state.q}`);
    };
    slider(stage.bar!, 'p', [1, 9, 1], 3, set('p'));
    slider(stage.bar!, 'q', [1, 9, 1], 7, set('q'));
  },
});
