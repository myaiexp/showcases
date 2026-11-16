// The scene element's properties: camera, canvas, renderer, object3D, systems and time
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-box color="#4CC3D9" position="0 1.4 -3" animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-box>
      ${board('board', '0 3.6 -4', 6.6, 2.4, 66)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const s = stage.scene;
    const behaviors = (s as unknown as { behaviors: unknown }).behaviors;
    const count = (b: unknown): string =>
      Array.isArray(b) ? String(b.length) : Object.entries(b as Record<string, unknown[]>).map(([k, v]) => `${k} ${v.length}`).join(', ');
    stage.every(300, () =>
      log.show(
        [
          `behaviors (components with tick/tock): ${count(behaviors)}`,
          `camera: ${s.camera.type}, fov ${s.camera.fov}`,
          `canvas: ${s.canvas.tagName.toLowerCase()} ${s.canvas.width}x${s.canvas.height}`,
          `isMobile: ${(s as unknown as { isMobile: boolean }).isMobile}`,
          `object3D: ${s.object3D.type} with ${s.object3D.children.length} children`,
          `renderer: ${s.renderer.constructor.name}`,
          `renderStarted: ${s.renderStarted}`,
          `systems: ${Object.keys(s.systems).length} instantiated`,
          `time: ${Math.round(s.time)}`,
        ].join('\n'),
      ),
    );
    stage.caption('scene.camera, canvas, renderer, object3D, systems, time');
    if (stage.preview) sway(stage);
  },
});
