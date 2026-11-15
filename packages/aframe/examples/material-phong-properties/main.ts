// Phong's own properties, live: shininess, reflectivity, refract and refractionRatio
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { cubeFaces } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => {
    const [px, nx, py, ny, pz, nz] = cubeFaces();
    return `
    <a-scene background="color: #10151c">
      <a-assets>
        <a-cubemap id="sky"><img src="${px}"><img src="${nx}"><img src="${py}"><img src="${ny}"><img src="${pz}"><img src="${nz}"></a-cubemap>
      </a-assets>
      <a-entity light="type: directional; intensity: 1.2" position="-1 3 2"></a-entity>
      <a-torus-knot id="knot" position="0 1.7 -3.2" geometry="radius: 0.6; radiusTubular: 0.16"
                    material="shader: phong; color: #bbbbbb; specular: #ffffff; shininess: 60; reflectivity: 0.9; envMap: #sky"
                    animation="property: rotation; to: 0 360 0; dur: 10000; easing: linear; loop: true"></a-torus-knot>
    </a-scene>`;
  },
  run(stage) {
    if (stage.preview) return sway(stage, { yaw: 6 });
    const knot = q(stage, '#knot');
    const set = (k: string) => (v: number | boolean | string) => knot.setAttribute('material', k, v);
    slider(stage.bar!, 'shininess', [0, 200, 5], 60, set('shininess'));
    slider(stage.bar!, 'reflectivity', [0, 1, 0.05], 0.9, set('reflectivity'));
    select(stage.bar!, 'combine', ['mix', 'add', 'multiply'], 'mix', set('combine'));
    toggle(stage.bar!, 'refract', false, set('refract'));
    slider(stage.bar!, 'refractionRatio', [0.5, 1, 0.01], 0.98, set('refractionRatio'));
  },
});
