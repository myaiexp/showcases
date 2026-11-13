// Control panel: toggles and sliders for the scene's background and environment properties
import * as THREE from 'three/webgpu';
import { h } from '@/ui/dom.ts';

export function makePanel(scene: THREE.Scene, envMap: THREE.Texture): HTMLElement {
  const slider = (label: string, min: number, max: number, value: number, set: (v: number) => void): HTMLElement => {
    const out = h('output', {}, value.toFixed(2));
    const input = h('input', { type: 'range', min: String(min), max: String(max), step: '0.01', value: String(value) });
    input.addEventListener('input', () => {
      set(Number(input.value));
      out.textContent = Number(input.value).toFixed(2);
    });
    return h('label', {}, `${label} `, input, ' ', out);
  };
  const check = (label: string, set: (on: boolean) => void): HTMLElement => {
    const box = h('input', { type: 'checkbox', checked: '' });
    box.addEventListener('change', () => set(box.checked));
    return h('label', {}, box, ` ${label}`);
  };

  return h(
    'div',
    { class: 'panel' },
    check('scene.background = map', (on) => (scene.background = on ? envMap : new THREE.Color(0x202830))),
    check('scene.environment = map', (on) => (scene.environment = on ? envMap : null)),
    slider('backgroundBlurriness', 0, 1, scene.backgroundBlurriness, (v) => (scene.backgroundBlurriness = v)),
    slider('backgroundIntensity', 0, 2, scene.backgroundIntensity, (v) => (scene.backgroundIntensity = v)),
    slider('environmentIntensity', 0, 3, scene.environmentIntensity, (v) => (scene.environmentIntensity = v)),
  );
}
