// The scene emits loaded and renderstart, and holds the vr-mode state only while in VR
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

// Events that fire before run() starts are caught from setup.
const early: string[] = [];

export default aframeExample(import.meta.url, {
  setup() {
    const t0 = performance.now();
    for (const name of ['loaded', 'renderstart']) {
      document.addEventListener(name, (evt) => {
        if (evt.target instanceof HTMLElement && evt.target.tagName === 'A-SCENE') early.push(`${name} at +${Math.round(performance.now() - t0)} ms`);
      }, true);
    }
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box color="#4CC3D9" position="0 1.4 -3" animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-box>
      ${board('board', '0 3.6 -4', 6.6, 2, 66)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 7 });
    const s = stage.scene;
    for (const line of early) log(`scene ${line}`);
    for (const name of ['enter-vr', 'exit-vr']) s.addEventListener(name, () => log(`${name} event`));
    log(`sceneEl.is('vr-mode'): ${s.is('vr-mode')}; hasLoaded: ${s.hasLoaded}; renderStarted: ${s.renderStarted}`);
    if (stage.preview) sway(stage);
    else if (stage.bar) {
      button(stage.bar, 'scene.enterVR()', () => {
        s.enterVR().then(
          () => log('entered VR'),
          (err: unknown) => log(`enterVR() rejected: ${(err as Error)?.message ?? err}`),
        );
      });
      button(stage.bar, "scene.is('vr-mode')", () => log(`is('vr-mode'): ${s.is('vr-mode')}`));
    }
  },
});
