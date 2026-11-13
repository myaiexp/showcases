// ScrambleText: swap a line between two phrases while choosing the scramble character set
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(ScrambleTextPlugin);

const PHRASES = ['Decoding the signal', 'Mix it up with GSAP'];
const SETS = ['upperCase', 'lowerCase', 'upperAndLowerCase', 'XO', '01'];

const mount: Mount = (el, { preview }) => {
  const line = document.createElement('div');
  line.className = 'line';
  line.textContent = PHRASES[0] ?? '';
  el.append(line);

  let phrase = 0;
  let chars = SETS[0] ?? 'upperCase';
  let revealDelay = 0.3;
  let speed = 1;
  let rightToLeft = false;
  let tween: gsap.core.Tween | undefined;

  // One live tween at a time, held by handle and killed on the next scramble and on unmount.
  const scramble = (): void => {
    tween?.kill();
    phrase = (phrase + 1) % PHRASES.length;
    tween = gsap.to(line, {
      duration: 2,
      ease: 'none',
      scrambleText: { text: PHRASES[phrase] ?? '', chars, revealDelay, speed, rightToLeft },
    });
  };

  let timer = 0;
  if (preview) {
    let i = 0;
    const next = (): void => {
      chars = SETS[i++ % SETS.length] ?? 'upperCase';
      scramble();
    };
    next();
    timer = window.setInterval(next, 2600);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const select = document.createElement('select');
    for (const s of SETS) select.append(new Option(`chars: "${s}"`, s));
    select.addEventListener('change', () => (chars = select.value));
    const slider = (label: string, min: number, max: number, step: number, value: number, set: (v: number) => void) => {
      const l = document.createElement('label');
      const out = document.createElement('span');
      const r = document.createElement('input');
      r.type = 'range';
      r.min = String(min);
      r.max = String(max);
      r.step = String(step);
      r.value = String(value);
      const upd = (): void => {
        set(Number(r.value));
        out.textContent = r.value;
      };
      r.addEventListener('input', upd);
      upd();
      l.append(`${label} `, r, ' ', out);
      return l;
    };
    const rtl = document.createElement('label');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.addEventListener('change', () => (rightToLeft = cb.checked));
    rtl.append(cb, 'rightToLeft');
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'Scramble';
    btn.addEventListener('click', scramble);
    controls.append(
      select,
      slider('revealDelay', 0, 1.5, 0.1, revealDelay, (v) => (revealDelay = v)),
      slider('speed', 0.1, 2, 0.1, speed, (v) => (speed = v)),
      rtl,
      btn,
    );
    el.append(controls);
  }

  return () => {
    window.clearInterval(timer);
    tween?.kill();
  };
};

export default mount;
