// Tune a directional light's shadow camera: frustum size and shadow map resolution
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c">
      <a-entity light="type: ambient; intensity: 0.5"></a-entity>
      <a-entity id="sun" light="type: directional; castShadow: true; intensity: 0.8; shadowCameraVisible: true;
                                 shadowCameraLeft: -3; shadowCameraRight: 3; shadowCameraTop: 3; shadowCameraBottom: -3;
                                 shadowMapWidth: 512; shadowMapHeight: 512" position="-3 5 -1"></a-entity>
      <a-box position="-1.2 0.6 -4" width="1.2" height="1.2" depth="1.2" color="#EF2D5E" shadow></a-box>
      <a-sphere position="1.2 0.8 -4" radius="0.6" color="#4CC3D9" shadow
                animation="property: position; to: 3.6 0.8 -4; dur: 4000; dir: alternate; easing: easeInOutSine; loop: true"></a-sphere>
      <a-plane rotation="-90 0 0" position="0 0 -4" width="12" height="12" color="#8da3bf" shadow="receive: true"></a-plane>
    </a-scene>`,
  run(stage) {
    stage.caption('shadowCameraVisible: true, frustum ±3, shadow map 512');
    if (stage.preview) return sway(stage, { yaw: 6, pitch: 8 });
    const sun = q(stage, '#sun');
    const frustum = (v: number): void => {
      for (const side of ['Left', 'Bottom']) sun.setAttribute('light', `shadowCamera${side}`, -v);
      for (const side of ['Right', 'Top']) sun.setAttribute('light', `shadowCamera${side}`, v);
    };
    slider(stage.bar!, 'frustum ±', [1, 8, 0.5], 3, frustum);
    slider(stage.bar!, 'shadow map size', [64, 2048, 64], 512, (v) => {
      sun.setAttribute('light', 'shadowMapWidth', v);
      sun.setAttribute('light', 'shadowMapHeight', v);
    });
    slider(stage.bar!, 'shadowBias', [-0.002, 0.002, 0.0001], 0, (v) => sun.setAttribute('light', 'shadowBias', v));
  },
});
