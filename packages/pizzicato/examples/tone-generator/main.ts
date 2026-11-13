// Pizzicato oscillator with waveform, frequency and volume controls
import Pizzicato, { type Wave } from 'pizzicato';
import type { Mount } from '@/types.ts';
import './style.css';

const WAVES: readonly Wave[] = ['sine', 'square', 'sawtooth', 'triangle'];

function slider(label: string, min: number, max: number, step: number, value: number) {
  const wrap = document.createElement('label');
  wrap.className = 'field';
  const text = document.createElement('span');
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  wrap.append(label + ' ', text, input);
  return { wrap, input, text };
}

const mount: Mount = (el) => {
  let sound: InstanceType<typeof Pizzicato.Sound> | null = null;

  const play = document.createElement('button');
  play.className = 'btn';
  play.textContent = 'Play';
  const waveField = document.createElement('label');
  waveField.className = 'field';
  const wave = document.createElement('select');
  for (const w of WAVES) wave.add(new Option(w, w, false, w === 'sawtooth'));
  waveField.append('waveform ', wave);
  const freq = slider('frequency', 80, 880, 1, 220);
  const vol = slider('volume', 0, 1, 0.05, 0.5);
  freq.text.textContent = '220 Hz';
  vol.text.textContent = '0.50';

  const row = document.createElement('div');
  row.className = 'row';
  row.append(play, waveField, freq.wrap, vol.wrap);
  el.append(row);

  const build = () => {
    const s = new Pizzicato.Sound({
      source: 'wave',
      options: { type: wave.value as Wave, frequency: Number(freq.input.value) },
    });
    s.volume = Number(vol.input.value);
    return s;
  };

  play.addEventListener('click', () => {
    void Pizzicato.context.resume();
    if (sound?.playing) {
      sound.stop();
      play.textContent = 'Play';
    } else {
      sound = build();
      sound.play();
      play.textContent = 'Stop';
    }
  });
  wave.addEventListener('change', () => {
    if (!sound?.playing) return;
    sound.stop();
    sound = build();
    sound.play();
  });
  freq.input.addEventListener('input', () => {
    freq.text.textContent = `${freq.input.value} Hz`;
    if (sound) sound.frequency = Number(freq.input.value);
  });
  vol.input.addEventListener('input', () => {
    vol.text.textContent = Number(vol.input.value).toFixed(2);
    if (sound) sound.volume = Number(vol.input.value);
  });

  return () => {
    sound?.stop();
    sound = null;
  };
};

export default mount;
