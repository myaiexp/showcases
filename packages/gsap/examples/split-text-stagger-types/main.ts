// SplitText: one paragraph split into chars, words and lines, each with its own staggered entrance
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(SplitText);

type Kind = 'chars' | 'words' | 'lines';
const KINDS: Kind[] = ['chars', 'words', 'lines'];
const COPY = 'Break apart HTML text into characters, words, and lines for easy animation.';

const mount: Mount = (el, { preview }) => {
  const text = document.createElement('p');
  text.className = preview ? 'text compact' : 'text';
  text.textContent = COPY;
  const readout = document.createElement('p');
  readout.className = 'readout';
  el.append(text);

  let split: SplitText | undefined;
  let anim: gsap.core.Tween | undefined;

  const ctx = gsap.context(() => {
    // Splits inside a context are reverted with it.
    split = SplitText.create(text, { type: 'chars,words,lines' });
  }, el);

  const play = (kind: Kind): void => {
    // Created outside the context on purpose: each play makes a fresh tween, and a context
    // keeps every animation it records until revert(). The handle is reverted by hand instead.
    {
      if (!split) return;
      anim?.revert();
      if (kind === 'chars') {
        anim = gsap.from(split.chars, { x: 80, opacity: 0, duration: 0.7, ease: 'power4', stagger: 0.03 });
      } else if (kind === 'words') {
        anim = gsap.from(split.words, {
          y: -60, opacity: 0, rotation: 'random(-80, 80)', duration: 0.7, ease: 'back', stagger: 0.1,
        });
      } else {
        anim = gsap.from(split.lines, {
          rotationX: -100, transformOrigin: '50% 50% -80px', opacity: 0, duration: 0.8, ease: 'power3', stagger: 0.25,
        });
      }
      readout.textContent = `gsap.from(split.${kind}, { stagger })  (${split[kind].length} ${kind})`;
    }
  };

  let timer = 0;
  if (preview) {
    let i = 0;
    play(KINDS[0] ?? 'chars');
    timer = window.setInterval(() => play(KINDS[++i % KINDS.length] ?? 'chars'), 2200);
  } else {
    const bar = document.createElement('div');
    bar.className = 'bar';
    for (const kind of KINDS) {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = kind;
      b.addEventListener('click', () => play(kind));
      bar.append(b);
    }
    el.append(bar, readout);
    play('chars');
  }

  return () => {
    window.clearInterval(timer);
    anim?.revert();
    ctx.revert();
    split?.revert();
  };
};

export default mount;
