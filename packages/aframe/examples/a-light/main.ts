// <a-light>: the docs' directional, point, ambient and probe lights
import { toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { cubeFaces } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => {
    const faces = cubeFaces(64).map((src) => `<img src="${src}">`).join('');
    return `
    <a-scene background="color: #0d1117">
      <a-assets>
        <a-cubemap id="pisa">${faces}</a-cubemap>
      </a-assets>
      <!-- Red directional light shining from the top left. -->
      <a-light id="directional" color="red" position="-1 1 0"></a-light>
      <!-- Blue point light, here circling above the spheres. -->
      <a-entity animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true" position="0 0 -4">
        <a-light id="point" type="point" color="blue" intensity="2" position="1.5 2 0"></a-light>
      </a-entity>
      <!-- Dim ambient lighting. -->
      <a-light id="ambient" type="ambient" color="#222"></a-light>
      <!-- Probe light: ambient light from an environment map. -->
      <a-light id="probe" type="probe" envMap="#pisa" intensity="0.3"></a-light>

      <a-sphere position="-1.5 1.2 -4" radius="0.6" color="#FFF"></a-sphere>
      <a-sphere position="0 1.2 -4" radius="0.6" color="#FFF"></a-sphere>
      <a-sphere position="1.5 1.2 -4" radius="0.6" color="#FFF"></a-sphere>
      <a-plane rotation="-90 0 0" width="10" height="10" position="0 0 -4" color="#FFF"></a-plane>
    </a-scene>`;
  },

  run(stage) {
    if (!stage.bar) return;
    // Hiding a light entity's object turns that light off.
    for (const id of ['directional', 'point', 'ambient', 'probe']) {
      const light = stage.scene.querySelector(`#${id}`)!;
      toggle(stage.bar, id, true, (v) => light.setAttribute('visible', v));
    }
    stage.caption('Adding any light removes A-Frame\'s default lights');
  },
});
