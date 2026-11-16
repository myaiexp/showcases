// look-controls on a box: dragging turns the box while the camera stays put
import { aframeExample } from '../../shared/frame.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity camera="active: true" look-controls="enabled: false" position="0 1.6 0"></a-entity>
      <a-box id="box" look-controls geometry="width: 1.6; height: 1; depth: 1" material="color: #4CC3D9" position="0 1.6 -3.5"></a-box>
      <a-text value="drag to turn the box" position="0 0.5 -3.5" width="4" align="center" color="#cfd8e3"></a-text>
    </a-scene>`,
  run(stage) {
    const box = stage.scene.querySelector('#box') as Entity;
    if (stage.preview) {
      // Cards have no mouse: turn the box's own yaw and pitch objects the way a drag would.
      const look = box.components['look-controls'] as unknown as { yawObject: { rotation: { y: number } }; pitchObject: { rotation: { x: number } } };
      stage.every(40, (i) => {
        look.yawObject.rotation.y = i * 0.04;
        look.pitchObject.rotation.x = Math.sin(i * 0.03) * 0.5;
      });
    }
    stage.every(150, () => {
      const r = box.getAttribute('rotation');
      stage.caption(`box rotation: ${r.x.toFixed(0)} ${r.y.toFixed(0)} ${r.z.toFixed(0)}`);
    });
  },
});
