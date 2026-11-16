// target: #id aims a directional light from its orientation, here down its own -Z axis
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c" light="defaultLightsEnabled: false">
      <a-entity light="type: ambient; color: #223"></a-entity>
      <a-light id="sun" type="directional" intensity="1.4" position="0 0 0" rotation="-90 0 0" target="#directionaltarget"
               animation="property: rotation; from: -90 0 0; to: -30 0 0; dur: 3000; dir: alternate; easing: easeInOutSine; loop: true">
        <a-entity id="directionaltarget" position="0 0 -1"></a-entity>
      </a-light>
      <a-box position="0 1 -3.5" width="1" height="2" depth="1" color="#d9d9d9"></a-box>
      <a-plane rotation="-90 0 0" position="0 0 -3.5" width="12" height="12" color="#4a5b70"></a-plane>
    </a-scene>`,
  run(stage) {
    stage.caption('the light turns about X: straight down to a low angle');
    if (stage.preview) return sway(stage, { yaw: 6 });
    const sun = q(stage, '#sun');
    slider(stage.bar!, 'light rotation.x', [-90, 0, 1], -90, (v) => {
      sun.removeAttribute('animation');
      sun.setAttribute('rotation', `${v} 0 0`);
    });
  },
});
