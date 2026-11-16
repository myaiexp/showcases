// utils.device checks: headset connected, mobile, tablet, standalone VR
import { aframeExample } from '../../shared/frame.ts';
import { board, createLog } from '../../shared/core-log.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #0d1420">
      <a-torus color="#4CC3D9" radius="0.6" radius-tubular="0.15" position="0 1.5 -3" animation="property: rotation; to: 360 360 0; dur: 9000; easing: linear; loop: true"></a-torus>
      ${board('board', '0 3.8 -4', 6.4, 1.6, 64)}
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -3" color="#33414f"></a-plane>
    </a-scene>`,

  async run(stage) {
    const { device } = stage.AFRAME.utils;
    const log = createLog(stage, { board: stage.scene.querySelector('#board') as Entity, caption: false });
    const headset = await Promise.resolve(device.checkHeadsetConnected!());
    log.show(
      [
        `checkHeadsetConnected() -> ${headset}`,
        `isMobile() -> ${device.isMobile!()}`,
        `isTablet() -> ${device.isTablet!()}`,
        `isMobileVR() -> ${device.isMobileVR!()}`,
      ].join('\n'),
    );
    stage.caption('AFRAME.utils.device');
    if (stage.preview) sway(stage);
  },
});
