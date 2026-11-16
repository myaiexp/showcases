// remove runs on removeAttribute and when the entity is detached, to undo what the component added
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent('halo', {
      init() {
        const { THREE } = AFRAME;
        this.el.setObject3D('halo', new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.05, 8, 40), new THREE.MeshBasicMaterial({ color: '#ffc65d' })));
        this.el.sceneEl.emit('step', `halo added: object3DMap [${Object.keys(this.el.object3DMap)}]`);
      },
      remove() {
        this.el.removeObject3D('halo');
        this.el.sceneEl.emit('step', `remove(): object3DMap [${Object.keys(this.el.object3DMap)}]`);
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-sphere id="a" halo radius="0.5" color="#4CC3D9" position="-1.6 1.4 -3"></a-sphere>
      <a-sphere id="b" halo radius="0.5" color="#ef2d5e" position="1.6 1.4 -3"></a-sphere>
      ${board('board', '0 3.5 -4', 6.4, 1.4, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 4 });
    stage.scene.addEventListener('step', (evt) => log((evt as CustomEvent<string>).detail));
    const a = stage.scene.querySelector('#a') as Entity;
    const b = stage.scene.querySelector('#b') as Entity;
    const drop = (): void => a.removeAttribute('halo');
    const regrow = (): void => a.setAttribute('halo', '');
    const detach = (): void => {
      if (b.parentNode) stage.scene.removeChild(b);
    };
    const reattach = (): void => {
      if (!b.parentNode) stage.scene.appendChild(b);
    };
    if (stage.preview) {
      sway(stage);
      stage.every(1500, (i) => [drop, regrow, detach, reattach][(i - 1) % 4]!());
    } else if (stage.bar) {
      button(stage.bar, "removeAttribute('halo') on the blue sphere", drop);
      button(stage.bar, "setAttribute('halo', '')", regrow);
      button(stage.bar, 'removeChild the red sphere', detach);
      button(stage.bar, 'appendChild it back', reattach);
    }
  },
});
