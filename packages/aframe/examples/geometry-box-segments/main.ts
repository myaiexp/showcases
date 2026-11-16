// A box's width, height, depth and segment counts, changed live through setAttribute
import { sway } from '../../shared/card.ts';
import { slider } from '../../shared/controls.ts';
import { q } from '../../shared/comp-dom.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="shape" geometry="primitive: box; width: 1.6; height: 1.2; depth: 1; segmentsWidth: 4; segmentsHeight: 3; segmentsDepth: 2"
                material="color: #4CC3D9; wireframe: true" position="0 1.6 -3.5"
                animation="property: rotation; to: 0 360 0; dur: 12000; easing: linear; loop: true"></a-entity>
    </a-scene>`,
  run(stage) {
    if (stage.preview) return sway(stage, { yaw: 6 });
    const shape = q(stage, '#shape');
    const set = (prop: string) => (v: number) => shape.setAttribute('geometry', prop, v);
    const bar = stage.bar!;
    slider(bar, 'width', [0.2, 3, 0.1], 1.6, set('width'));
    slider(bar, 'height', [0.2, 3, 0.1], 1.2, set('height'));
    slider(bar, 'depth', [0.2, 3, 0.1], 1, set('depth'));
    slider(bar, 'segmentsWidth', [1, 12, 1], 4, set('segmentsWidth'));
    slider(bar, 'segmentsHeight', [1, 12, 1], 3, set('segmentsHeight'));
    slider(bar, 'segmentsDepth', [1, 12, 1], 2, set('segmentsDepth'));
  },
});
