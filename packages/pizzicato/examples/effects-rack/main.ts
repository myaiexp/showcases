// Pizzicato drone with toggleable distortion, delay, tremolo and low-pass effects
import Pizzicato, { type Effect } from 'pizzicato';
import type { Mount } from '@/types.ts';
import './style.css';

interface Rack {
  name: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  make: (v: number) => Effect;
  apply: (fx: Effect, v: number) => void;
  format: (v: number) => string;
}

const E = Pizzicato.Effects;
const fixed = (v: number) => v.toFixed(2);
const RACK: readonly Rack[] = [
  {
    name: 'Distortion', label: 'gain', min: 0, max: 1, step: 0.05, value: 0.4,
    make: (v) => new E.Distortion({ gain: v }),
    apply: (fx, v) => { (fx as InstanceType<typeof E.Distortion>).gain = v; },
    format: fixed,
  },
  {
    name: 'Delay', label: 'feedback', min: 0, max: 0.9, step: 0.05, value: 0.6,
    make: (v) => new E.Delay({ feedback: v, time: 0.3, mix: 0.5 }),
    apply: (fx, v) => { (fx as InstanceType<typeof E.Delay>).feedback = v; },
    format: fixed,
  },
  {
    name: 'Tremolo', label: 'speed', min: 1, max: 15, step: 1, value: 6,
    make: (v) => new E.Tremolo({ speed: v, depth: 0.8, mix: 0.9 }),
    apply: (fx, v) => { (fx as InstanceType<typeof E.Tremolo>).speed = v; },
    format: String,
  },
  {
    name: 'Low-pass filter', label: 'cutoff', min: 100, max: 2000, step: 20, value: 600,
    make: (v) => new E.LowPassFilter({ frequency: v, peak: 8 }),
    apply: (fx, v) => { (fx as InstanceType<typeof E.LowPassFilter>).frequency = v; },
    format: (v) => `${v} Hz`,
  },
];

const mount: Mount = (el) => {
  const drone = new Pizzicato.Sound({ source: 'wave', options: { type: 'sawtooth', frequency: 110 } });
  drone.volume = 0.4;
  const attached = new Set<Effect>();

  const play = document.createElement('button');
  play.className = 'btn';
  play.textContent = 'Play drone';
  play.addEventListener('click', () => {
    void Pizzicato.context.resume();
    if (drone.playing) {
      drone.stop();
      play.textContent = 'Play drone';
    } else {
      drone.play();
      play.textContent = 'Stop drone';
    }
  });

  const grid = document.createElement('div');
  grid.className = 'fx-grid';
  for (const r of RACK) {
    const fx = r.make(r.value);
    const card = document.createElement('div');
    card.className = 'fx';
    const head = document.createElement('div');
    head.className = 'fx-head';
    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    const sw = document.createElement('label');
    sw.className = 'switch';
    sw.append(toggle, ' on');
    head.append(Object.assign(document.createElement('span'), { textContent: r.name }), sw);

    const field = document.createElement('label');
    field.className = 'field';
    const val = document.createElement('span');
    val.textContent = r.format(r.value);
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = String(r.min);
    slider.max = String(r.max);
    slider.step = String(r.step);
    slider.value = String(r.value);
    field.append(`${r.label} `, val, slider);
    card.append(head, field);
    grid.append(card);

    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        drone.addEffect(fx);
        attached.add(fx);
      } else {
        drone.removeEffect(fx);
        attached.delete(fx);
      }
      card.classList.toggle('on', toggle.checked);
    });
    slider.addEventListener('input', () => {
      r.apply(fx, Number(slider.value));
      val.textContent = r.format(Number(slider.value));
    });
  }
  el.append(play, grid);

  return () => {
    drone.stop();
    for (const fx of attached) drone.removeEffect(fx);
    attached.clear();
  };
};

export default mount;
