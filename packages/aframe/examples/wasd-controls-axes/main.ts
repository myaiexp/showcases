// wsAxis / adAxis choose which axes the keys move; wsInverted / adInverted flip them
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { select, toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { fmt } from '../../shared/comp-log.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-box id="mover" wasd-controls="wsAxis: y; adAxis: z; adInverted: true; acceleration: 40" position="0 1.6 -4" color="#EF2D5E"></a-box>
      <a-plane rotation="-90 0 0" position="0 0 -4" width="12" height="12" color="#39475a"></a-plane>
    </a-scene>`,
  run(stage) {
    const mover = q(stage, '#mover');
    stage.every(150, () => stage.caption(`box position ${fmt(mover.object3D.position)}`));
    if (stage.preview) {
      sway(stage, { yaw: 12 });
      const key = (type: string, code: string): void => void window.dispatchEvent(new KeyboardEvent(type, { code, bubbles: true }));
      const keys = ['KeyW', 'KeyD', 'KeyS', 'KeyA'];
      key('keydown', keys[0]!);
      stage.every(1500, (i) => {
        key('keyup', keys[(i - 1) % 4]!);
        key('keydown', keys[i % 4]!);
      });
      return;
    }
    const axes = ['x', 'y', 'z'] as const;
    const set = (k: string) => (v: string | boolean) => mover.setAttribute('wasd-controls', k, v);
    select(stage.bar!, 'wsAxis', axes, 'y', set('wsAxis'));
    select(stage.bar!, 'adAxis', axes, 'z', set('adAxis'));
    toggle(stage.bar!, 'wsInverted', false, set('wsInverted'));
    toggle(stage.bar!, 'adInverted', true, set('adInverted'));
  },
});
