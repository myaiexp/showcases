// Entity properties hasLoaded, isPlaying, object3D, object3DMap and sceneEl, read live
import { aframeExample } from '../../shared/frame.ts';
import { button } from '../../shared/controls.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-entity id="lamp" geometry="primitive: torusKnot; radius: 0.5; radiusTubular: 0.12" material="color: #7be0c3; emissive: #7be0c3; emissiveIntensity: 0.5"
                light="type: point; intensity: 0.6" position="0 0.9 -2.5"
                animation="property: rotation; to: 0 360 0; dur: 7000; easing: linear; loop: true"></a-entity>
      ${board('board', '0 3.1 -4', 5, 1.7, 52)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const el = stage.scene.querySelector('#lamp') as Entity;
    const read = (): void => {
      log.show(
        [
          `hasLoaded: ${el.hasLoaded}`,
          `isPlaying: ${el.isPlaying}`,
          `object3D: ${el.object3D.type}, ${el.object3D.children.length} children`,
          `object3DMap keys: ${Object.keys(el.object3DMap).join(', ')}`,
          `sceneEl === scene: ${el.sceneEl === stage.scene}`,
        ].join('\n'),
      );
    };
    read();
    stage.every(300, read);
    stage.caption('Entity properties, read every 300 ms');

    if (stage.preview) {
      sway(stage);
      // Pause and play every few seconds so isPlaying flips.
      stage.every(2500, (i) => (i % 2 ? el.pause() : el.play()));
    } else if (stage.bar) {
      button(stage.bar, 'pause()', () => el.pause());
      button(stage.bar, 'play()', () => el.play());
    }
  },
});
