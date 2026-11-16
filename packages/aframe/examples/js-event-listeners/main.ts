// emit, addEventListener and removeEventListener between entities
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="a" color="#4CC3D9" position="-1.6 1.2 -3"></a-box>
      <a-sphere id="b" color="#ef2d5e" radius="0.5" position="1.6 1.2 -3"></a-sphere>
      ${board('board', '0 3.6 -4.5', 7.4, 1.8, 74)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 5 });
    const entityEl = stage.scene.querySelector('#a') as Entity;
    const anotherEntityEl = stage.scene.querySelector('#b') as Entity;
    // A named function, so it can be removed later.
    function collisionHandler(event: CustomEvent<{ collidingEntity: Entity }>): void {
      log(`Entity collided with <${event.detail.collidingEntity.tagName.toLowerCase()}>`);
      entityEl.object3D.scale.setScalar(1.3);
      setTimeout(() => entityEl.object3D.scale.setScalar(1), 300);
    }
    let listening = false;
    const listen = (on: boolean): void => {
      if (on === listening) return;
      listening = on;
      if (on) entityEl.addEventListener('physicscollided', collisionHandler);
      else entityEl.removeEventListener('physicscollided', collisionHandler as EventListener);
      log(on ? "addEventListener('physicscollided')" : "removeEventListener('physicscollided')");
    };
    const emit = (): void => {
      entityEl.emit('physicscollided', { collidingEntity: anotherEntityEl }, false);
      if (!listening) log('emitted, but nobody is listening');
    };
    listen(true);
    if (stage.preview) {
      sway(stage);
      stage.every(1100, (i) => {
        if (i % 6 === 3) listen(false);
        if (i % 6 === 0) listen(true);
        emit();
      });
    } else if (stage.bar) {
      button(stage.bar, "emit('physicscollided', {...}, false)", emit);
      button(stage.bar, 'addEventListener', () => listen(true));
      button(stage.bar, 'removeEventListener', () => listen(false));
    }
  },
});
