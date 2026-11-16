// entity.components reaches each component's data and API, even its three.js objects
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    // A component that exposes an API: other code calls pulse() through entity.components.
    AFRAME.registerComponent('beacon', {
      init() {
        this.count = 0;
      },
      pulse() {
        this.count++;
        this.el.setAttribute('material', 'emissiveIntensity', 1);
        setTimeout(() => this.el.setAttribute('material', 'emissiveIntensity', 0.1), 250);
        return this.count;
      },
    });
  },

  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="lamp" beacon geometry="primitive: sphere; radius: 0.6" position="0 1.2 -3"
                material="color: #ffb347; emissive: #ffb347; emissiveIntensity: 0.1"></a-entity>
      ${board('board', '0 2.9 -4', 5, 1.5, 52)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, max: 5 });
    const el = document.querySelector('#lamp') as Entity;

    const inspect = (): void => {
      // The docs' two examples: a component's three.js object, and a component method.
      const camera = (document.querySelector('a-entity[camera]') as Entity).components.camera!;
      log.show(
        [
          `Object.keys(el.components): ${Object.keys(el.components).join(', ')}`,
          `components.material.material: ${el.components.material!.material.type}`,
          `camera.camera: ${camera.camera.type}, fov ${camera.camera.fov}`,
          `components.beacon.pulse() -> ${el.components.beacon!.pulse()}`,
        ].join('\n'),
      );
    };
    inspect();

    if (stage.preview) {
      sway(stage);
      stage.every(1800, inspect);
    } else if (stage.bar) {
      button(stage.bar, 'Call components.beacon.pulse()', inspect);
    }
  },
});
