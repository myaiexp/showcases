// Default lights are replaced as soon as you add a-light entities of your own
import { aframeExample } from '../../shared/frame.ts';
import { toggle } from '../../shared/controls.ts';
import { sway } from '../../shared/card.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene>
      <a-box color="red" position="-1.5 2 -5" rotation="0 45 45" scale="2 2 2"></a-box>
      <a-sphere color="#4CC3D9" position="2 1.5 -4"></a-sphere>
      <a-plane rotation="-90 0 0" width="30" height="30" color="#667788"></a-plane>
      <a-sky color="#223a3a"></a-sky>
    </a-scene>`,

  run(stage) {
    const scene = stage.scene;
    const own: Entity[] = [];
    const set = (on: boolean): void => {
      while (own.length) scene.removeChild(own.pop()!);
      if (on) {
        for (const attrs of [{ type: 'ambient', color: '#445451' }, { type: 'point', intensity: '2', position: '2 4 4' }]) {
          const light = document.createElement('a-light') as Entity;
          for (const [k, v] of Object.entries(attrs)) light.setAttribute(k, v);
          scene.appendChild(light);
          own.push(light);
        }
      }
      stage.caption(on ? '<a-light type="ambient" color="#445451"> and <a-light type="point" intensity="2" position="2 4 4">' : 'no lights in the markup: A-Frame adds an ambient and a directional light');
    };
    set(false);
    if (stage.preview) {
      sway(stage);
      stage.every(2200, (i) => set(i % 2 === 1));
    } else if (stage.bar) {
      toggle(stage.bar, 'own lights (ambient + point)', false, set);
    }
  },
});
