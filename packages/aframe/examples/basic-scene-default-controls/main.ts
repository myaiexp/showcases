// The default controls: drag to look and WASD to move, read from the camera entity
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-box color="red" position="0 2 -5" rotation="0 45 45" scale="2 2 2"></a-box>
      <a-box color="#4CC3D9" position="-4 1 -3"></a-box>
      <a-box color="#ffc65d" position="4 1 -3"></a-box>
      <a-plane rotation="-90 0 0" width="30" height="30" color="#33414f"></a-plane>
    </a-scene>`,

  run(stage) {
    const cam = stage.scene.camera.el;
    const out = stage.readout();
    const deg = (r: number): number => Math.round((r * 180) / Math.PI);
    stage.every(200, () => {
      const p = cam.object3D.position;
      const r = cam.object3D.rotation;
      const text = `camera position ${p.x.toFixed(2)} ${p.y.toFixed(2)} ${p.z.toFixed(2)}   rotation ${deg(r.x)} ${deg(r.y)} ${deg(r.z)}`;
      if (out) out.textContent = text;
    });
    stage.caption('drag the mouse to look, W A S D or the arrow keys to move');
    if (stage.preview) sway(stage, { yaw: 25, pitch: 8 });
  },
});
