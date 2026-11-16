// setAttribute with an object, a single property and a plain attribute, as the docs list them
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" geometry="primitive: box" material="color: #4CC3D9" position="0 1.3 -3"></a-entity>
      ${board('board', '0 3.2 -4', 5.8, 1.4, 58)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    const el = stage.scene.querySelector('#e') as Entity;
    const forms: [string, () => void][] = [
      ["setAttribute('position', {x: 1, y: 2, z: -3})", () => el.setAttribute('position', { x: 1, y: 2, z: -3 })],
      ["setAttribute('geometry', {width: 2, height: 0.5})", () => el.setAttribute('geometry', { width: 2, height: 0.5 })],
      ["setAttribute('material', 'color', 'crimson')", () => el.setAttribute('material', 'color', 'crimson')],
      ["setAttribute('visible', false)", () => el.setAttribute('visible', false)],
      ["setAttribute('visible', true)", () => el.setAttribute('visible', true)],
      ["setAttribute('position', '0 1.3 -3')  (string)", () => el.setAttribute('position', '0 1.3 -3')],
      ["setAttribute('geometry', 'width: 1; height: 1')", () => el.setAttribute('geometry', 'width: 1; height: 1')],
      ["setAttribute('material', {color: '#4CC3D9'})", () => el.setAttribute('material', { color: '#4CC3D9' })],
    ];
    const run = (i: number): void => {
      const [text, fn] = forms[i % forms.length]!;
      fn();
      log(text);
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1400, (i) => run(i - 1));
    } else if (stage.bar) {
      let i = 0;
      button(stage.bar, 'Next setAttribute form', () => run(i++));
      for (const [text] of forms) log(text);
    }
  },
});
