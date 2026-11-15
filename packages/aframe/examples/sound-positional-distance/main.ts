// A moving sound source: how distance changes the volume under each distance model
import { q } from '../../shared/comp-dom.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { sounds } from '../../shared/comp-audio.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-assets><audio id="river" src="${sounds.river()}" preload="auto"></audio></a-assets>
      <a-entity position="0 1.6 0" animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true">
        <a-sphere id="source" radius="0.3" color="#4CC3D9" position="0 0 -3"
                  sound="src: #river; loop: true; autoplay: true; distanceModel: inverse; refDistance: 1; rolloffFactor: 1"
                  animation="property: position; from: 0 0 -1.5; to: 0 0 -12; dur: 4000; dir: alternate; easing: easeInOutSine; loop: true"></a-sphere>
      </a-entity>
    </a-scene>`,
  run(stage) {
    const src = q(stage, '#source');
    stage.caption('A sound source circling the listener; click the view if you hear nothing');
    const set = (k: string) => (v: string | number | boolean) => src.setAttribute('sound', k, v);
    select(stage.bar!, 'distanceModel', ['inverse', 'linear', 'exponential'] as const, 'inverse', set('distanceModel'));
    slider(stage.bar!, 'refDistance', [0.5, 10, 0.5], 1, set('refDistance'));
    slider(stage.bar!, 'rolloffFactor', [0, 5, 0.1], 1, set('rolloffFactor'));
    slider(stage.bar!, 'maxDistance', [2, 30, 1], 30, set('maxDistance'));
    toggle(stage.bar!, 'positional', true, set('positional'));
  },
});
