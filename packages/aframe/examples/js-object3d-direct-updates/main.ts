// Position, rotation, scale and visible can be set on object3D directly; getAttribute still agrees
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="e" color="#ffc65d" position="0 1.3 -3"></a-box>
      ${board('board', '0 3.8 -4.5', 7.8, 2, 78)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const { THREE } = stage.AFRAME;
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 5 });
    const el = stage.scene.querySelector('#e') as Entity;
    const steps: [string, () => void][] = [
      ['object3D.position.set(1, 2, -3)', () => el.object3D.position.set(1, 2, -3)],
      ['object3D.position.x += 1.5', () => (el.object3D.position.x += 1.5)],
      ['object3D.position.multiplyScalar(0.5)', () => el.object3D.position.multiplyScalar(0.5)],
      ['object3D.rotation.y = THREE.MathUtils.degToRad(45)', () => (el.object3D.rotation.y = THREE.MathUtils.degToRad(45))],
      // The docs also list rotation.divideScalar(2), but THREE.Euler has no such method in 1.8's three.js.
      ['object3D.rotation.y /= 2', () => (el.object3D.rotation.y /= 2)],
      ['object3D.scale.set(2, 2, 2)', () => el.object3D.scale.set(2, 2, 2)],
      ['object3D.scale.z += 1.5', () => (el.object3D.scale.z += 1.5)],
      ['object3D.visible = false', () => (el.object3D.visible = false)],
      ['object3D.visible = true', () => (el.object3D.visible = true)],
      ['reset', () => {
        el.object3D.position.set(0, 1.3, -3);
        el.object3D.rotation.set(0, 0, 0);
        el.object3D.scale.set(1, 1, 1);
      }],
    ];
    const step = (i: number): void => {
      const [text, fn] = steps[i % steps.length]!;
      fn();
      const p = el.getAttribute('position');
      log(`${text}  ->  getAttribute('position') ${p.x.toFixed(1)} ${p.y.toFixed(1)} ${p.z.toFixed(1)}, visible ${el.getAttribute('visible')}`);
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1200, (i) => step(i - 1));
    } else if (stage.bar) {
      let i = 0;
      button(stage.bar, 'Next object3D change', () => step(i++));
    }
  },
});
