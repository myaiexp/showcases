// Child entities inherit their parent's position, rotation and scale
import { aframeExample } from '../../shared/frame.ts';
import { slider } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-box id="parent" color="#ef2d5e" position="0 2 -6" rotation="0 45 45" scale="2 4 2" opacity="0.8" transparent="true">
        <a-sphere id="child" position="1 0 3" radius="0.4" color="#ffc65d"></a-sphere>
      </a-box>
      ${board('board', '0 4.8 -7', 8, 1.5, 80)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const { THREE } = stage.AFRAME;
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const parent = stage.scene.querySelector('#parent') as Entity;
    const child = stage.scene.querySelector('#child') as Entity;
    const w = new THREE.Vector3();
    const f = (v: { x: number; y: number; z: number }): string => `${v.x.toFixed(2)} ${v.y.toFixed(2)} ${v.z.toFixed(2)}`;
    const show = (): void => {
      child.object3D.getWorldPosition(w);
      log.show(`parent position ${f(parent.object3D.position)}\nchild local position ${f(child.object3D.position)}\nchild world position ${f(w)}`);
    };
    show();
    stage.caption('the parent moves, the child follows');
    stage.every(200, show);
    const move = (x: number): void => parent.setAttribute('position', { x, y: 2, z: -6 });
    if (stage.preview) {
      sway(stage);
      parent.setAttribute('animation', 'property: position; to: 2 2 -6; from: -2 2 -6; dir: alternate; dur: 2500; easing: easeInOutSine; loop: true');
    } else if (stage.bar) {
      slider(stage.bar, 'parent x', [-3, 3, 0.1], 0, move);
    }
  },
});
