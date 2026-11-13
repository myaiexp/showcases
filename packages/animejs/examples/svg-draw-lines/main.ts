// Line drawing: svg.createDrawable proxies animated through `draw`, then driven by hand with sliders
import { animate, stagger, svg } from 'animejs';
import type { Mount } from '@/types.ts';
import { buildSvg } from './shapes.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const shapes = buildSvg(el);
  const drawables = svg.createDrawable(shapes);

  const loop = (): ReturnType<typeof animate> =>
    animate(drawables, {
      draw: ['0 0', '0 1', '1 1'],
      ease: 'inOutQuad',
      duration: 2000,
      delay: stagger(100),
      loop: true,
    });
  let animation: ReturnType<typeof animate> | undefined = loop();

  if (preview) {
    return () => animation?.revert();
  }

  // Full view: set `draw` directly from two sliders ("start end", each between 0 and 1)
  const controls = document.createElement('div');
  controls.className = 'controls';
  const readout = document.createElement('div');
  readout.className = 'readout';
  const sliders: HTMLInputElement[] = [];
  const apply = (): void => {
    const [a = 0, b = 1] = sliders.map(s => Number(s.value));
    const value = `${Math.min(a, b)} ${Math.max(a, b)}` as `${number} ${number}`;
    for (const d of drawables) d.draw = value;
    readout.textContent = `draw = '${value}'`;
  };
  const addSlider = (name: string, initial: number): void => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'range';
    input.min = '0';
    input.max = '1';
    input.step = '0.01';
    input.value = String(initial);
    input.addEventListener('input', () => {
      // Taking over by hand: stop the looping animation first
      animation?.revert();
      animation = undefined;
      apply();
    });
    label.append(name, input);
    sliders.push(input);
    controls.append(label);
  };
  addSlider('start', 0);
  addSlider('end', 1);

  const buttons = document.createElement('div');
  buttons.className = 'buttons';
  const play = document.createElement('button');
  play.className = 'btn btn-primary';
  play.textContent = 'Animate draw';
  play.addEventListener('click', () => {
    animation?.revert();
    animation = loop();
    readout.textContent = "animating draw: ['0 0', '0 1', '1 1']";
  });
  buttons.append(play);
  controls.append(buttons, readout);
  el.append(controls);
  readout.textContent = "animating draw: ['0 0', '0 1', '1 1']";

  return () => animation?.revert();
};

export default mount;
