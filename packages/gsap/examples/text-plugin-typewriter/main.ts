// TextPlugin: typewriter between two sentences, with delimiter, rtl and type options
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(TextPlugin);

const PHRASES = ['The quick brown fox jumps over the lazy dog.', 'The quick brown fox jumps over the sleepy cat.'];

const mount: Mount = (el, { preview }) => {
  const line = document.createElement('p');
  line.className = 'line';
  line.textContent = PHRASES[0] ?? '';
  el.append(line);

  const opts = { delimiter: '', rtl: false, type: 'default' };
  let phrase = 0;
  let tween: gsap.core.Tween | undefined;
  const readout = document.createElement('p');
  readout.className = 'readout';

  // One live tween at a time, held by handle and killed on the next run and on unmount.
  const type = (): void => {
    tween?.kill();
    phrase = (phrase + 1) % PHRASES.length;
    const text: TextPlugin.Vars = { value: PHRASES[phrase] ?? '', delimiter: opts.delimiter, rtl: opts.rtl };
    if (opts.type === 'diff') text.type = 'diff';
    readout.textContent = `text: ${JSON.stringify({ ...text, value: '…' })}`;
    tween = gsap.to(line, { duration: 2, text, ease: 'none' });
  };

  let timer = 0;
  if (preview) {
    type();
    timer = window.setInterval(type, 3000);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const select = (label: string, values: string[], set: (v: string) => void): HTMLLabelElement => {
      const l = document.createElement('label');
      const s = document.createElement('select');
      for (const v of values) s.append(new Option(v === '' ? '(characters)' : v === ' ' ? '(words)' : v, v));
      s.addEventListener('change', () => set(s.value));
      l.append(`${label} `, s);
      return l;
    };
    const rtl = document.createElement('label');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.addEventListener('change', () => (opts.rtl = cb.checked));
    rtl.append(cb, 'rtl');
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'Type';
    btn.addEventListener('click', type);
    controls.append(
      select('delimiter', ['', ' '], (v) => (opts.delimiter = v)),
      select('type', ['default', 'diff'], (v) => (opts.type = v)),
      rtl,
      btn,
    );
    el.append(controls, readout);
  }

  return () => {
    window.clearInterval(timer);
    tween?.kill();
  };
};

export default mount;
