// A row of squares: numerical vs range stagger values, with ease and modifier options
import { animate, stagger } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

interface Opts {
  range: boolean;
  ease: string;
  glow: boolean;
}

const mount: Mount = (el, { preview }) => {
  const row = document.createElement('div');
  row.className = 'row';
  const squares: HTMLElement[] = [];
  for (let i = 0; i < 11; i++) {
    const s = document.createElement('div');
    s.className = 'sq';
    squares.push(s);
    row.append(s);
  }
  el.append(row);

  const opts: Opts = { range: true, ease: 'inOut(3)', glow: true };
  let anim: { revert(): unknown } | undefined;

  const play = (): void => {
    anim?.revert();
    // Range value distributes between two values; numerical value adds a step per target.
    const y = opts.range ? stagger(['2.5rem', '-2.5rem'], { ease: opts.ease }) : stagger('-.5rem', { ease: opts.ease });
    // The modifier rewrites each staggered number into a box-shadow string.
    const glow = stagger([1, 0.25], {
      from: 'center',
      ease: opts.ease,
      modifier: (v: number) => `0 0 ${v * 24}px ${v * 12}px currentColor`,
    });
    anim = animate(squares, {
      y,
      ...(opts.glow ? { boxShadow: [{ to: glow }, { to: '0 0 0 0 currentColor' }] } : {}),
      delay: stagger([0, 500], { ease: opts.ease, from: 'center' }),
      duration: 500,
      ease: 'inOutQuad',
      loop: true,
      alternate: true,
    });
  };

  if (preview) {
    const eases = ['inOut(3)', 'linear', 'outQuad'];
    let n = 0;
    play();
    const timer = window.setInterval(() => {
      n++;
      opts.range = n % 2 === 0;
      opts.ease = eases[n % eases.length]!;
      play();
    }, 2800);
    return () => {
      window.clearInterval(timer);
      anim?.revert();
    };
  }

  const ui = document.createElement('div');
  ui.className = 'controls';
  const field = (label: string, input: HTMLElement): void => {
    const l = document.createElement('label');
    l.textContent = label;
    l.append(input);
    ui.append(l);
  };
  const mode = document.createElement('select');
  mode.append(new Option("range: stagger(['2.5rem', '-2.5rem'])", 'range'), new Option("numerical: stagger('-.5rem')", 'num'));
  mode.addEventListener('change', () => {
    opts.range = mode.value === 'range';
    play();
  });
  const ease = document.createElement('select');
  for (const e of ['linear', 'inOut(3)', 'outQuad', 'inExpo', 'outBounce']) ease.append(new Option(e, e));
  ease.value = opts.ease;
  ease.addEventListener('change', () => {
    opts.ease = ease.value;
    play();
  });
  const glow = document.createElement('input');
  glow.type = 'checkbox';
  glow.checked = true;
  glow.addEventListener('change', () => {
    opts.glow = glow.checked;
    play();
  });
  field('value', mode);
  field('ease', ease);
  field('modifier glow', glow);
  el.append(ui);
  play();

  return () => anim?.revert();
};

export default mount;
