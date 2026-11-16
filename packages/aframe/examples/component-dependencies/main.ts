// dependencies make A-Frame initialise the listed components first, whatever the attribute order
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const order: string[] = [];
    const make = (name: string, dependencies: string[]): void => {
      AFRAME.registerComponent(name, {
        dependencies,
        init() {
          order.push(name);
          this.el.sceneEl.emit('step', `init order: ${order.join(', ')}`);
        },
      });
    };
    make('a', ['b']); // Initialises last.
    make('b', ['c']); // Second.
    make('c', []); // First.
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="e" a color="#4CC3D9" position="0 1.4 -3" animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-box>
      ${board('board', '0 3.5 -4', 6, 1.2, 60)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 3 });
    stage.scene.addEventListener('step', (evt) => log((evt as CustomEvent<string>).detail));
    const e = stage.scene.querySelector('#e') as Entity;
    log(`<a-box a> was attached; its components: ${Object.keys(e.components).filter((k) => 'abc'.includes(k)).join(', ')}`);
    stage.caption('a depends on b, b depends on c: c, b, a');
    if (stage.preview) sway(stage);
  },
});
