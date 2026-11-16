// Components register themselves with their system, which then manages all of them
import { aframeExample } from '../../shared/frame.ts';
import { button, toggle } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerSystem('bobber', {
      init() {
        this.entities = [] as Entity[];
      },
      registerMe(el: Entity) {
        this.entities.push(el);
      },
      unregisterMe(el: Entity) {
        const index = this.entities.indexOf(el);
        this.entities.splice(index, 1);
      },
      tick(time: number) {
        // One loop over every registered entity, in one place.
        for (let i = 0; i < this.entities.length; i++) {
          this.entities[i].object3D.position.y = 1 + Math.sin(time / 500 + i) * 0.5;
        }
      },
    });
    AFRAME.registerComponent('bobber', {
      init() {
        this.system.registerMe(this.el);
      },
      remove() {
        this.system.unregisterMe(this.el);
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-sphere id="s0" bobber radius="0.35" color="#4CC3D9" position="-1.8 1 -3"></a-sphere>
      <a-sphere id="s1" bobber radius="0.35" color="#ef2d5e" position="-0.6 1 -3"></a-sphere>
      <a-sphere id="s2" bobber radius="0.35" color="#ffc65d" position="0.6 1 -3"></a-sphere>
      <a-sphere id="s3" bobber radius="0.35" color="#7be0c3" position="1.8 1 -3"></a-sphere>
      ${board('board', '0 3.5 -4', 6, 1, 60)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const system = stage.scene.systems.bobber;
    const spheres = [...stage.scene.querySelectorAll('a-sphere')] as Entity[];
    const show = (): void => log.show(`system.entities.length: ${system.entities.length}\nids: ${system.entities.map((e: Entity) => e.id).join(', ')}`);
    show();
    stage.caption('registerMe() in init, unregisterMe() in remove');
    const toggle1 = (i: number): void => {
      const s = spheres[i % spheres.length]!;
      if (s.hasAttribute('bobber')) s.removeAttribute('bobber');
      else s.setAttribute('bobber', '');
      show();
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1300, toggle1);
    } else if (stage.bar) {
      spheres.forEach((s, i) => button(stage.bar!, `toggle bobber on #${s.id}`, () => toggle1(i)));
    }
  },
});
