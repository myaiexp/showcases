// init runs for markup, for setAttribute on an attached entity, and when an entity gets attached
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('probe', {
      init() {
        this.el.setAttribute('material', 'color', '#ffc65d');
        this.el.sceneEl.emit('step', `init() on #${this.el.id}`);
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="static" probe color="#4CC3D9" position="-2 1.2 -3"></a-box>
      <a-box id="plain" color="#6a7a8c" position="0 1.2 -3"></a-box>
      ${board('board', '0 3.4 -4', 6, 1.4, 60)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    stage.scene.addEventListener('step', (evt) => log((evt as CustomEvent<string>).detail));
    log('init() on #static: set in the HTML');
    const plain = stage.scene.querySelector('#plain') as Entity;
    let extra: Entity | null = null;

    const onAttached = (): void => {
      plain.removeAttribute('probe');
      plain.setAttribute('material', 'color', '#6a7a8c');
      plain.setAttribute('probe', '');
    };
    const onAppend = (): void => {
      if (extra) stage.scene.removeChild(extra);
      extra = document.createElement('a-sphere') as Entity;
      extra.id = 'late';
      extra.setAttribute('radius', '0.5');
      extra.setAttribute('position', '2 1.2 -3');
      extra.setAttribute('probe', '');
      log('probe set on a detached entity: no init() yet');
      stage.scene.appendChild(extra);
    };

    if (stage.preview) {
      sway(stage);
      stage.every(1800, (i) => (i % 2 ? onAttached() : onAppend()));
    } else if (stage.bar) {
      button(stage.bar, "setAttribute('probe') on an attached entity", onAttached);
      button(stage.bar, 'set on a new entity, then appendChild', onAppend);
    }
  },
});
