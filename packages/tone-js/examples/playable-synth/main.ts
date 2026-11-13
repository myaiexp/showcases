// Tone.Synth keyboard: eight note buttons and a waveform selector
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import './style.css';

const NOTES = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'] as const;
const WAVES = ['sine', 'triangle', 'square', 'sawtooth'] as const;
type Wave = (typeof WAVES)[number];

const mount: Mount = (el) => {
  const synth = new Tone.Synth({ oscillator: { type: 'triangle' } }).toDestination();
  const timers = new Set<number>();

  const keys = document.createElement('div');
  keys.className = 'keys';
  for (const note of NOTES) {
    const btn = document.createElement('button');
    btn.className = 'key';
    btn.textContent = note;
    btn.addEventListener('click', async () => {
      await Tone.start();
      synth.triggerAttackRelease(note, '8n');
      btn.classList.add('lit');
      const id = window.setTimeout(() => {
        timers.delete(id);
        btn.classList.remove('lit');
      }, 150);
      timers.add(id);
    });
    keys.append(btn);
  }

  const field = document.createElement('label');
  field.className = 'field';
  const select = document.createElement('select');
  select.className = 'select';
  for (const w of WAVES) select.add(new Option(w, w, false, w === 'triangle'));
  select.addEventListener('change', () => {
    synth.oscillator.type = select.value as Wave;
  });
  field.append('oscillator ', select);

  el.append(keys, field);

  return () => {
    for (const id of timers) clearTimeout(id);
    timers.clear();
    synth.triggerRelease();
    synth.dispose();
  };
};

export default mount;
