// The three keyframes forms (object array, percentage, simple arrays) tracing a path in three stages
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const BOX = preview ? 20 : 28; // box size in px
  const D = preview ? 36 : 52; // travel distance in px inside each stage
  const row = document.createElement('div');
  row.className = 'stages';
  row.style.setProperty('--box', `${BOX}px`);
  row.style.setProperty('--stage', `${BOX + D}px`);
  const boxes: HTMLElement[] = [];
  const forms = [
    { name: 'Object keyframes', code: 'keyframes: [{x, duration}, {y, delay}, ...]' },
    { name: 'Percentage keyframes', code: 'keyframes: {"0%": {...}, "50%": {...}}' },
    { name: 'Array keyframes', code: 'keyframes: {x: [0, D, D, 0, 0], y: [...]}' },
  ];
  for (const f of forms) {
    const col = document.createElement('div');
    col.className = 'col';
    const stage = document.createElement('div');
    stage.className = 'stage';
    const box = document.createElement('div');
    box.className = 'box';
    stage.append(box);
    boxes.push(box);
    col.append(stage);
    if (!preview) {
      const t = document.createElement('strong');
      t.textContent = f.name;
      const c = document.createElement('code');
      c.textContent = f.code;
      col.append(t, c);
    }
    row.append(col);
  }
  el.append(row);

  const ctx = gsap.context(() => {
    const [a, b, c] = boxes;
    const loop = { repeat: -1, repeatDelay: 0.6 };
    gsap.to(a!, {
      ...loop,
      keyframes: [
        { x: D, duration: 0.6, ease: 'sine.out' },
        { y: D, duration: 0.6, delay: 0.2 }, // delay makes a gap
        { rotation: 360, x: 0, duration: 0.8, delay: -0.2 }, // negative delay overlaps
      ],
      ease: 'power1.inOut',
    });
    gsap.to(b!, {
      ...loop,
      keyframes: {
        '0%': { x: D, y: 0 },
        '50%': { x: D, y: D, ease: 'sine.out' },
        '100%': { x: 0, y: D },
        easeEach: 'expo.inOut',
      },
      ease: 'none',
      duration: 2.4,
    });
    gsap.to(c!, {
      ...loop,
      keyframes: {
        x: [0, D, D, 0, 0],
        y: [0, 0, D, D, 0],
        easeEach: 'power1.inOut',
      },
      ease: 'none',
      duration: 2.4,
    });
  }, el);

  return () => {
    ctx.revert();
  };
};

export default mount;
