// Four ways to move an entity, and getAttribute('position') returning the live Vector3
import { fmt } from '../../shared/comp-log.ts';
import { q } from '../../shared/comp-dom.ts';
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-box id="box" position="0 1 -4" color="#FFC65D"></a-box>
      <a-plane rotation="-90 0 0" position="0 0 -4" width="14" height="10" color="#39475a"></a-plane>
    </a-scene>`,
  run(stage) {
    const el = q(stage, '#box');
    const p = el.object3D.position;
    const steps: [string, () => void][] = [
      ['object3D.position.set(-2, 2, -4)', () => p.set(-2, 2, -4)],
      ['object3D.position.x += 1', () => void (p.x += 1)],
      ['position.multiplyScalar(0.5)', () => void p.multiplyScalar(0.5)],
      ["setAttribute('position', {x: 1, y: 2, z: -5})", () => el.setAttribute('position', { x: 1, y: 2, z: -5 })],
    ];
    const show = (label: string): void => {
      const live = el.getAttribute('position');
      const text = `${label}\ngetAttribute('position') = ${fmt(live)}   same object as object3D.position: ${live === el.object3D.position}`;
      stage.caption(label);
      const out = stage.readout();
      if (out) out.textContent = text;
    };
    steps.forEach(([label, fn]) => stage.bar && button(stage.bar, label, () => (fn(), show(label))));
    if (stage.preview) stage.every(1200, (i) => (steps[(i - 1) % 4]![1](), show(steps[(i - 1) % 4]![0])));
    else show('press a button');
  },
});
