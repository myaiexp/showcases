// engine.speed and engine.fps sliders acting on every animation in a particle field at once
import { engine, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { addParticle, buildField } from './particles.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const field = buildField();
  el.append(field);
  const anims: JSAnimation[] = [];
  const count = preview ? 30 : 90;
  for (let i = 0; i < count; i++) anims.push(addParticle(field).anim);

  // Preview cards share one engine with the page, so only the full view changes it.
  if (preview) return () => anims.forEach((a) => a.revert());

  const saved = { speed: engine.speed, fps: engine.fps };
  const panel = document.createElement('div');
  panel.className = 'panel';
  const cleanups: (() => void)[] = [];
  const slider = (name: string, min: number, max: number, step: number, start: number, apply: (v: number) => void): void => {
    const row = document.createElement('label');
    row.className = 'field-row';
    const label = document.createElement('span');
    label.textContent = name;
    const input = document.createElement('input');
    input.type = 'range';
    input.min = String(min);
    input.max = String(max);
    input.step = String(step);
    input.value = String(start);
    const value = document.createElement('span');
    value.className = 'value';
    value.textContent = String(start);
    const onInput = (): void => {
      value.textContent = input.value;
      apply(+input.value);
    };
    input.addEventListener('input', onInput);
    cleanups.push(() => input.removeEventListener('input', onInput));
    row.append(label, input, value);
    panel.append(row);
  };
  slider('engine.speed', 0.1, 2, 0.01, 1, (v) => (engine.speed = v));
  slider('engine.fps', 1, 240, 1, saved.fps, (v) => (engine.fps = v));
  el.append(panel);

  return () => {
    cleanups.forEach((fn) => fn());
    engine.speed = saved.speed;
    engine.fps = saved.fps;
    anims.forEach((a) => a.revert());
  };
};

export default mount;
