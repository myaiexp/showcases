// Viewer camera attributes, CSS variables and ::part() styling
import '@babylonjs/viewer';
import type { HTML3DElement } from '@babylonjs/viewer';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { sampleGlb } from '../../shared/sample-model.ts';
import './style.css';

const CONTROLS: Array<[string, string]> = [
  ['Left drag, one finger, arrows', 'rotate around the target'],
  ['Right drag, two fingers, Ctrl+Shift+arrows', 'pan (move the target)'],
  ['Wheel, pinch, Alt+up/down', 'zoom'],
  ['Double click on the model', 'new target at that point'],
  ['Double click off the model', 'reset the camera pose'],
];

const mount: Mount = async (el, ctx) => {
  const url = URL.createObjectURL(await sampleGlb());
  const viewer = document.createElement('babylon-viewer') as HTML3DElement;
  viewer.setAttribute('source', url);
  viewer.setAttribute('extension', '.glb');
  viewer.setAttribute('animation-auto-play', '');
  viewer.setAttribute('clear-color', '#0a0d18');
  viewer.setAttribute('shadow-quality', 'none');
  viewer.classList.add('pill'); // ::part(tool-bar) and ::part(progress-bar) rules in style.css
  if (ctx.preview) {
    viewer.classList.add('bare');
    viewer.setAttribute('camera-auto-orbit', '');
    viewer.setAttribute('camera-auto-orbit-speed', '0.5');
    viewer.setAttribute('camera-auto-orbit-delay', '0');
  }
  el.append(viewer);

  let timer = 0;
  if (ctx.preview) {
    // The theme is plain CSS variables, so a timer can walk the hue.
    let hue = 220;
    timer = window.setInterval(() => viewer.style.setProperty('--ui-background-hue', String((hue = (hue + 4) % 360))), 60);
  } else {
    const grid = document.createElement('div');
    grid.className = 'controls';
    for (const [input, what] of CONTROLS) {
      const row = document.createElement('div');
      const b = document.createElement('b');
      b.textContent = `${input}: `;
      row.append(b, what);
      grid.append(row);
    }

    const panel = createPanel(el);
    const css = (name: string, value: string): void => viewer.style.setProperty(name, value);
    const orbit = { alpha: 1.2, beta: 1.2, radius: 8 };
    const applyOrbit = (): void => viewer.setAttribute('camera-orbit', `${orbit.alpha} ${orbit.beta} ${orbit.radius}`);
    panel.slider('camera-orbit alpha', -3.14, 3.14, 0.05, orbit.alpha, (v) => ((orbit.alpha = v), applyOrbit()));
    panel.slider('beta', 0.2, 3, 0.05, orbit.beta, (v) => ((orbit.beta = v), applyOrbit()));
    panel.slider('radius', 3, 16, 0.5, orbit.radius, (v) => ((orbit.radius = v), applyOrbit()));
    panel.row();
    panel.slider('camera-target y', -1, 3, 0.1, 1, (v) => viewer.setAttribute('camera-target', `0 ${v} 0`));
    panel.select('reset-mode', ['auto', 'reframe', 'camera'] as const, 'auto', (v) => viewer.setAttribute('reset-mode', v));
    panel.button('resetCamera()', () => viewer.resetCamera());
    panel.row();
    panel.slider('--ui-background-hue', 0, 360, 5, 220, (v) => css('--ui-background-hue', String(v)));
    panel.slider('--ui-background-lightness %', 5, 70, 1, 20, (v) => css('--ui-background-lightness', `${v}%`));
    panel.slider('--ui-background-opacity', 0.2, 1, 0.05, 0.8, (v) => css('--ui-background-opacity', String(v)));
    panel.row();
    panel.select('--ui-foreground-color', ['#e8ecf8', '#f2d27a', '#8be9a6'] as const, '#e8ecf8', (v) => css('--ui-foreground-color', v));
    panel.check('::part(tool-bar) pill style', true, (on) => viewer.classList.toggle('pill', on));
    el.append(grid);
  }

  return () => {
    window.clearInterval(timer);
    viewer.remove();
    URL.revokeObjectURL(url);
  };
};

export default mount;
