// rotation: degrees through the attribute, radians through object3D.rotation, children inherit
import { fmt } from '../../shared/comp-log.ts';
import { q } from '../../shared/comp-dom.ts';
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="parent" position="0 1.6 -3.5" rotation="0 45 0">
        <a-box id="child1" width="1.4" height="0.5" depth="0.5" color="#EF2D5E"></a-box>
        <a-box id="child2" position="0 1 0" rotation="15 45 30" width="1" height="0.3" depth="0.3" color="#4CC3D9"></a-box>
      </a-entity>
    </a-scene>`,
  run(stage) {
    const { THREE } = stage.AFRAME;
    const parent = q(stage, '#parent');
    const child = q(stage, '#child2');
    const show = (label: string): void => {
      const text = `${label}\nparent getAttribute('rotation') = ${fmt(parent.getAttribute('rotation'))} (degrees)   object3D.rotation.y = ${parent.object3D.rotation.y.toFixed(3)} rad\nchild2 local ${fmt(child.getAttribute('rotation'))}   world yaw = ${THREE.MathUtils.radToDeg(child.object3D.getWorldQuaternion(new THREE.Quaternion()).y * 2).toFixed(0)} (approx.)`;
      stage.caption(label);
      const out = stage.readout();
      if (out) out.textContent = text;
    };
    const steps: [string, () => void][] = [
      ['object3D.rotation.set(degToRad(15), degToRad(30), degToRad(90))', () => parent.object3D.rotation.set(THREE.MathUtils.degToRad(15), THREE.MathUtils.degToRad(30), THREE.MathUtils.degToRad(90))],
      ['object3D.rotation.x += Math.PI', () => void (parent.object3D.rotation.x += Math.PI)],
      ["setAttribute('rotation', {x: 15, y: 30, z: 90})", () => parent.setAttribute('rotation', { x: 15, y: 30, z: 90 })],
      ["setAttribute('rotation', {x: 0, y: 45, z: 0})", () => parent.setAttribute('rotation', { x: 0, y: 45, z: 0 })],
    ];
    const names = ['rotation.set(degToRad…)', 'rotation.x += Math.PI', 'setAttribute 15 30 90', 'setAttribute 0 45 0'];
    steps.forEach(([label, fn], n) => stage.bar && button(stage.bar, names[n]!, () => (fn(), show(label))));
    if (stage.preview) stage.every(1500, (i) => (steps[(i - 1) % 4]![1](), show(steps[(i - 1) % 4]![0])));
    else show('press a button');
  },
});
