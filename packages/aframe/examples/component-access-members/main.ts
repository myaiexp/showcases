// A component's own members and methods are reachable through entity.components
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('foo', {
      init() {
        this.bar = 'baz';
        this.hits = 0;
      },
      qux(amount: number) {
        this.hits += amount;
        this.el.object3D.scale.setScalar(1 + this.hits / 10);
        return this.hits;
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-sphere foo color="#7be0c3" radius="0.5" position="0 1.4 -3"></a-sphere>
      ${board('board', '0 3.5 -4', 6, 1.2, 60)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    const fooComponent = (document.querySelector('[foo]') as Entity).components.foo!;
    log(`fooComponent.bar -> ${fooComponent.bar}`);
    const call = (): void => {
      const n = fooComponent.qux(1);
      log(`fooComponent.qux(1) -> ${n}`);
      if (n >= 5) fooComponent.qux(-5);
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1200, call);
    } else if (stage.bar) {
      button(stage.bar, 'components.foo.qux(1)', call);
    }
  },
});
