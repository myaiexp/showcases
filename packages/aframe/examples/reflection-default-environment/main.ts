// reflection on the scene: metallic spheres with and without the default environment
import { sway } from '../../shared/card.ts';
import { toggle } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene reflection="directionalLight: a-light#dirlight" background="color: #6fa8d6">
      <a-light id="dirlight" intensity="1" light="castShadow: true; type: directional" position="1 1 1"></a-light>
      <a-sphere position="-1.8 1.6 -3.5" radius="0.8" material="color: #ffffff; metalness: 1; roughness: 0.05"></a-sphere>
      <a-sphere position="0 1.6 -3.5" radius="0.8" material="color: #FFC65D; metalness: 1; roughness: 0.25"></a-sphere>
      <a-sphere position="1.8 1.6 -3.5" radius="0.8" material="color: #EF2D5E; metalness: 0.7; roughness: 0.1"></a-sphere>
      <a-plane rotation="-90 0 0" position="0 0 -3.5" width="10" height="8" color="#7a8f6b"></a-plane>
    </a-scene>`,
  run(stage) {
    const show = (): void => stage.caption(`reflection on the scene: ${stage.scene.hasAttribute('reflection')}`);
    show();
    const set = (on: boolean): void => {
      if (on) stage.scene.setAttribute('reflection', 'directionalLight: a-light#dirlight');
      else stage.scene.removeAttribute('reflection');
      show();
    };
    if (stage.bar) toggle(stage.bar, 'reflection', true, set);
    if (stage.preview) {
      sway(stage, { yaw: 8 });
      stage.every(2200, (i) => set(i % 2 === 0));
    }
  },
});
