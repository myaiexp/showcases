// Nested scales multiply; object3D.scale is updated in place
import { fmt } from '../../shared/comp-log.ts';
import { q } from '../../shared/comp-dom.ts';
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="outer" position="-1.5 0.3 -4" scale="2 2 2">
        <a-entity id="inner" scale="1.5 1.5 1.5" position="0 0.5 0">
          <a-box id="box" width="0.4" height="0.4" depth="0.4" color="#4CC3D9"></a-box>
        </a-entity>
      </a-entity>
      <a-box position="1.5 0.6 -4" width="0.4" height="0.4" depth="0.4" color="#cccccc" scale="3 3 3"></a-box>
      <a-text value="nested 2 x 1.5 = 3" position="-1.5 -0.2 -4" width="3" align="center" color="#cfd8e3"></a-text>
      <a-text value="scale 3" position="1.5 -0.2 -4" width="3" align="center" color="#cfd8e3"></a-text>
    </a-scene>`,
  run(stage) {
    const inner = q(stage, '#inner');
    const s = inner.object3D.scale;
    const show = (label: string): void => {
      const text = `${label}\ninner getAttribute('scale') = ${fmt(inner.getAttribute('scale'))}   box world scale = ${fmt(q(stage, '#box').object3D.getWorldScale(new stage.AFRAME.THREE.Vector3()))}`;
      stage.caption(label);
      const out = stage.readout();
      if (out) out.textContent = text;
    };
    const steps: [string, () => void][] = [
      ['object3D.scale.set(1, 2, 3)', () => s.set(1, 2, 3)],
      ['object3D.scale.x += 1', () => void (s.x += 1)],
      ['object3D.scale.multiplyScalar(0.5)', () => void s.multiplyScalar(0.5)],
      ["setAttribute('scale', {x: 1.5, y: 1.5, z: 1.5})", () => inner.setAttribute('scale', { x: 1.5, y: 1.5, z: 1.5 })],
    ];
    steps.forEach(([label, fn]) => stage.bar && button(stage.bar, label, () => (fn(), show(label))));
    if (stage.preview) stage.every(1300, (i) => (steps[(i - 1) % 4]![1](), show(steps[(i - 1) % 4]![0])));
    else show('press a button');
  },
});
