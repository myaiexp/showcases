// Custom events press and release the cursor through downEvents / upEvents
import { q } from '../../shared/comp-dom.ts';
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { logger } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity camera look-controls position="0 1.6 0">
        <a-entity id="cursor" cursor="downEvents: pressbutton; upEvents: releasebutton"
                  position="0 0 -1" geometry="primitive: ring; radiusInner: 0.015; radiusOuter: 0.025" material="color: white; shader: flat"></a-entity>
      </a-entity>
      <a-box id="target" position="0 1.6 -3.5" color="#4CC3D9"></a-box>
    </a-scene>`,
  run(stage) {
    const target = q(stage, '#target');
    const cursor = q(stage, '#cursor');
    const log = logger(stage, 5);
    target.addEventListener('mousedown', () => (target.setAttribute('scale', '0.8 0.8 0.8'), log('mousedown on the box (from pressbutton)')));
    target.addEventListener('mouseup', () => (target.setAttribute('scale', '1 1 1'), log('mouseup on the box (from releasebutton)')));
    target.addEventListener('click', () => {
      target.setAttribute('color', `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);
      log('click');
    });
    const press = (): void => cursor.emit('pressbutton', null, false);
    const release = (): void => cursor.emit('releasebutton', null, false);
    stage.caption('cursor="downEvents: pressbutton; upEvents: releasebutton"');
    if (stage.bar) {
      button(stage.bar, 'emit pressbutton', press);
      button(stage.bar, 'emit releasebutton', release);
    }
    if (stage.preview) stage.every(1000, (i) => (i % 2 ? press() : release()));
  },
});
