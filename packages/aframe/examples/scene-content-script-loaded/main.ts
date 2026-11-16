// Without a component: wait for hasLoaded or the loaded event, then run
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity geometry="primitive: box" material="color: #4CC3D9" position="0 1.4 -3" animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 3.5 -4', 6.4, 1, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 3 });
    // The docs' pattern. By the time run() is called the scene has loaded, so the first branch is taken.
    const scene = document.querySelector('a-scene') as Entity;

    function run(): void {
      const entity = scene.querySelector('a-entity') as Entity;
      entity.setAttribute('material', 'color', 'red');
      log(`run(): scene.hasLoaded was ${scene.hasLoaded}, entity turned red`);
    }

    if (scene.hasLoaded) {
      run();
    } else {
      scene.addEventListener('loaded', run);
    }
    if (stage.preview) sway(stage);
    else if (stage.bar) button(stage.bar, 'Run again', run);
  },
});
