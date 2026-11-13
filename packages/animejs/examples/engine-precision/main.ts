// engine.precision slider with a live readout of the rounded transform string on one particle
import { engine, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { addParticle, buildField } from './particles.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const field = buildField();
  el.append(field);
  const anims: JSAnimation[] = [];
  let sample: HTMLElement | undefined;
  for (let i = 0; i < (preview ? 25 : 80); i++) {
    const p = addParticle(field, preview ? 0.6 : 1);
    anims.push(p.anim);
    sample ??= p.el;
  }

  const readout = document.createElement('pre');
  readout.className = 'readout';
  // transform on the first particle, sampled a few times per second
  const timer = window.setInterval(() => {
    readout.textContent = `precision ${engine.precision}\n${sample?.style.transform ?? ''}`;
  }, 120);
  el.append(readout);

  if (preview) {
    return () => {
      window.clearInterval(timer);
      anims.forEach((a) => a.revert());
    };
  }

  const saved = engine.precision;
  const panel = document.createElement('label');
  panel.className = 'panel field-row';
  const label = document.createElement('span');
  label.textContent = 'engine.precision';
  const input = document.createElement('input');
  input.type = 'range';
  input.min = '0';
  input.max = '5';
  input.step = '1';
  input.value = String(saved);
  const value = document.createElement('span');
  value.className = 'value';
  value.textContent = input.value;
  const onInput = (): void => {
    value.textContent = input.value;
    engine.precision = +input.value;
  };
  input.addEventListener('input', onInput);
  panel.append(label, input, value);
  el.append(panel);

  return () => {
    window.clearInterval(timer);
    input.removeEventListener('input', onInput);
    engine.precision = saved;
    anims.forEach((a) => a.revert());
  };
};

export default mount;
