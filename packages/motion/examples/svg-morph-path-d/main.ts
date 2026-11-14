// Toolbar icons that morph by animating the path's d attribute (menu/close, play/pause, avatar shapes)
import { animate, delay, press, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

// Motion interpolates d number by number, so both shapes need the same commands in the same order.
interface Morph {
  label: string;
  a: string;
  b: string;
  c?: string;
  fill: boolean;
}
const MORPHS: Morph[] = [
  { label: 'Menu', fill: false, a: 'M4 7 L20 7 M4 12 L20 12 M4 17 L20 17', b: 'M6 6 L18 18 M12 12 L12 12 M6 18 L18 6' },
  { label: 'Play', fill: true, a: 'M7 5 L7 19 L12 16.5 L12 7.5 Z M12 7.5 L12 16.5 L19 12 L19 12 Z', b: 'M7 5 L7 19 L10 19 L10 5 Z M14 5 L14 19 L17 19 L17 5 Z' },
  {
    label: 'Avatar',
    fill: true,
    a: 'M12 3 C16.97 3 21 7.03 21 12 C21 16.97 16.97 21 12 21 C7.03 21 3 16.97 3 12 C3 7.03 7.03 3 12 3 Z',
    b: 'M12 3 C19 3 21 5 21 12 C21 19 19 21 12 21 C5 21 3 19 3 12 C3 5 5 3 12 3 Z',
    c: 'M12 3 L21 12 L12 21 L3 12 L12 3 Z',
  },
];
const SVG = 'http://www.w3.org/2000/svg';

const mount: Mount = (el, { preview }) => {
  const bar = document.createElement('div');
  bar.className = 'bar';
  el.append(bar);
  el.classList.toggle('is-full', !preview);
  let duration = 0.45;
  let ease: 'easeInOut' | 'circOut' | 'backOut' = 'easeInOut';

  const icons = MORPHS.map((m) => {
    const button = document.createElement('button');
    button.className = 'icon';
    button.setAttribute('aria-label', m.label);
    const svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    const path = document.createElementNS(SVG, 'path');
    path.setAttribute('d', m.a);
    if (m.fill) path.setAttribute('fill', 'currentColor');
    else path.setAttribute('fill', 'none');
    svg.append(path);
    button.append(svg);
    const cap = document.createElement('span');
    cap.textContent = m.label;
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.append(button, cap);
    bar.append(cell);
    return { m, button, path, step: 0 };
  });

  let ui: ReturnType<typeof panel> | undefined;
  const scope = scopeMotion(el, () => {
    const next = (i: number): void => {
      const icon = icons[i]!;
      const shapes = icon.m.c ? [icon.m.a, icon.m.b, icon.m.c] : [icon.m.a, icon.m.b];
      icon.step = (icon.step + 1) % shapes.length;
      // The whole morph: animate the d attribute to the next shape.
      animate(icon.path, { d: shapes[icon.step]! }, { duration, ease });
    };
    icons.forEach((icon, i) => press(icon.button, () => (_e, info) => info.success && next(i)));

    if (preview) {
      icons.forEach((_, i) => {
        const tick = (): void => {
          next(i);
          delay(tick, 2.4 + i * 0.3);
        };
        delay(tick, 0.6 + i * 0.5);
      });
    }
  });

  if (!preview) {
    ui = panel(el);
    ui.slider('duration', { min: 0.1, max: 1.5, step: 0.05, value: duration }, (v) => (duration = v));
    ui.select('ease', ['easeInOut', 'circOut', 'backOut'] as const, ease, (v) => (ease = v));
    hint(el, 'Click an icon: its path data (d) morphs to the next shape. The avatar cycles circle, squircle, diamond. Every shape has the same commands in the same order.');
  }

  return () => {
    scope.cancel();
    ui?.dispose();
  };
};

export default mount;
