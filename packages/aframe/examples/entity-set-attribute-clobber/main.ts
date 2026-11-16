// A third argument of true to setAttribute resets every property not passed
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

// The shared Entity type has no clobber overload yet, so type it here.
type Clobber = { setAttribute(name: string, value: object, clobber: boolean): void };

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" geometry="primitive: cylinder; height: 2; radius: 0.6" material="color: #7be0c3" position="0 1.3 -3"
                animation="property: rotation; to: 0 360 0; dur: 8000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 3.4 -4', 5.8, 1.2, 58)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 3 });
    const el = stage.scene.querySelector('#e') as Entity;
    const g = (): string => `height ${el.getAttribute('geometry').height}, radius ${el.getAttribute('geometry').radius}`;
    const reset = (): void => {
      (el as unknown as Clobber).setAttribute('geometry', { primitive: 'cylinder', height: 2, radius: 0.6 }, true);
    };
    const merge = (): void => {
      el.setAttribute('geometry', { radius: 0.3 });
      log(`{radius: 0.3}: ${g()}  (height kept)`);
    };
    const clobber = (): void => {
      (el as unknown as Clobber).setAttribute('geometry', { primitive: 'cylinder', radius: 0.3 }, true);
      log(`{radius: 0.3}, true: ${g()}  (height back to default)`);
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1800, (i) => {
        if (i % 3 === 1) merge();
        else if (i % 3 === 2) clobber();
        else reset();
      });
    } else if (stage.bar) {
      button(stage.bar, 'Merge {radius: 0.3}', merge);
      button(stage.bar, 'Clobber {radius: 0.3}, true', clobber);
      button(stage.bar, 'Reset', () => {
        reset();
        log(`reset: ${g()}`);
      });
    }
  },
});
