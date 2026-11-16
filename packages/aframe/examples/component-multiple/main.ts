// multiple lets one entity hold several instances, told apart by this.id and this.attrName
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent<{ color: string; height: number }>('mark', {
      multiple: true,
      schema: { color: { default: 'white' }, height: { default: 1 } },
      update() {
        const { THREE } = AFRAME;
        const index = Number(this.id === 'blue') ;
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), new THREE.MeshStandardMaterial({ color: this.data.color }));
        mesh.position.set(index * 1.2 - 0.6, this.data.height, 0);
        // attrName ("mark__red") gives each instance its own key in object3DMap.
        this.el.setObject3D(this.attrName, mesh);
        this.el.sceneEl.emit('step', `update(): id "${this.id}", attrName "${this.attrName}"`);
      },
      remove() {
        this.el.removeObject3D(this.attrName);
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="e" position="0 0.3 -3" mark__red="color: crimson; height: 0.6" mark__blue="color: #4CC3D9; height: 1.4"></a-entity>
      ${board('board', '0 3.5 -4', 6.4, 1.6, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 5 });
    stage.scene.addEventListener('step', (evt) => log((evt as CustomEvent<string>).detail));
    const e = stage.scene.querySelector('#e') as Entity;
    const keys = (): void => log(`object3DMap: ${Object.keys(e.object3DMap).join(', ')}`);
    stage.every(2000, (i) => {
      e.setAttribute('mark__blue', 'height', 0.6 + (i % 3) * 0.5);
      keys();
    });
    if (stage.preview) sway(stage);
    else if (stage.bar) {
      button(stage.bar, "removeAttribute('mark__red')", () => {
        e.removeAttribute('mark__red');
        keys();
      });
      button(stage.bar, "setAttribute('mark__red', ...)", () => e.setAttribute('mark__red', 'color: crimson; height: 0.6'));
    }
  },
});
