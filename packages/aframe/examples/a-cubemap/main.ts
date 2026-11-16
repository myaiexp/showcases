// <a-cubemap>: six images as an environment map that a metal sphere reflects
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { cubeFaces } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => {
    // Six faces in the order a-cubemap reads its children: +x, -x, +y, -y, +z, -z.
    const [px, nx, py, ny, pz, nz] = cubeFaces();
    return `
    <a-scene background="color: #10151c">
      <a-assets>
        <!-- Cubemap asset -->
        <a-cubemap id="reflection">
          <img src="${px}">
          <img src="${nx}">
          <img src="${py}">
          <img src="${ny}">
          <img src="${pz}">
          <img src="${nz}">
        </a-cubemap>
      </a-assets>
      <!-- Sphere with reflection. -->
      <a-sphere position="-0.9 1.4 -2.6" radius="0.7"
                material="envMap: #reflection; metalness: 1.0; roughness: 0.0"></a-sphere>
      <!-- A rougher box with the same map: the reflection blurs. -->
      <a-box position="0.9 1.4 -2.6" material="envMap: #reflection; metalness: 1.0; roughness: 0.2"
             animation="property: rotation; to: 360 360 0; dur: 14000; easing: linear; loop: true"></a-box>
    </a-scene>`;
  },

  run(stage) {
    if (stage.preview) sway(stage, { yaw: 25 });
    stage.caption('Each face is labelled: +X, -X, +Y, -Y, +Z, -Z');
  },
});
