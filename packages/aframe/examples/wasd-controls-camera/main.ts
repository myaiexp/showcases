// wasd-controls on the camera: acceleration, fly and enabled
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { fmt } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c">
      <a-entity id="cam" camera look-controls wasd-controls="acceleration: 100" position="0 1.6 0"></a-entity>
      ${Array.from({ length: 12 }, (_, i) => `<a-box position="${i % 2 ? 2.5 : -2.5} 1 ${-3 - i * 3}" color="hsl(${i * 30}, 70%, 60%)"></a-box>`).join('')}
      <a-plane rotation="-90 0 0" position="0 0 -15" width="14" height="60" color="#39475a"></a-plane>
    </a-scene>`,
  run(stage) {
    const cam = q(stage, '#cam');
    stage.every(150, () => stage.caption(`camera position ${fmt(cam.object3D.position)}`));
    if (stage.preview) {
      // No keyboard in a card: send W and D key events to the window, as a hand on the keys would.
      sway(stage, { yaw: 10 });
      const key = (type: string, code: string): void => void window.dispatchEvent(new KeyboardEvent(type, { code, bubbles: true }));
      key('keydown', 'KeyW');
      stage.every(3200, (i) => {
        key('keyup', 'KeyW');
        key('keydown', i % 2 ? 'KeyS' : 'KeyW');
      });
      return;
    }
    slider(stage.bar!, 'acceleration', [10, 300, 10], 100, (v) => cam.setAttribute('wasd-controls', 'acceleration', v));
    toggle(stage.bar!, 'fly', false, (v) => cam.setAttribute('wasd-controls', 'fly', v));
    toggle(stage.bar!, 'enabled', true, (v) => cam.setAttribute('wasd-controls', 'enabled', v));
  },
});
