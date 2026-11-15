// light type: probe lights each angle from a cubemap
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { cubeFaces } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #10151c" light="defaultLightsEnabled: false">
      <a-assets>
        <a-cubemap id="room">${cubeFaces(64).map((src) => `<img src="${src}">`).join('')}</a-cubemap>
      </a-assets>
      <a-light type="probe" envMap="#room" intensity="2"></a-light>
      <a-sphere position="-1.5 1.6 -3.5" radius="0.9" color="#ffffff" animation="property: rotation; to: 0 360 0; dur: 10000; easing: linear; loop: true"></a-sphere>
      <a-box position="1.5 1.6 -3.5" color="#ffffff" animation="property: rotation; to: 0 360 0; dur: 10000; easing: linear; loop: true"></a-box>
    </a-scene>`,
  run(stage) {
    stage.caption('<a-light type="probe" envMap="#room">');
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
