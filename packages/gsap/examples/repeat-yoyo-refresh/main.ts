// repeat, yoyo and repeatRefresh with a random() value, compared on three tracks, plus a repeatDelay slider
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const rows = [
    { label: 'repeat: -1', code: "{ x: 80, repeat: -1 }" },
    { label: '+ yoyo: true', code: "{ x: 80, repeat: -1, yoyo: true }" },
    {
      label: '+ repeatRefresh',
      code: "{ x: 'random(-80, 80)', repeat: -1, yoyo: true, repeatRefresh: true }",
    },
  ];
  const wrap = document.createElement('div');
  wrap.className = preview ? 'rows compact' : 'rows';
  const balls: HTMLElement[] = [];
  for (const r of rows) {
    const row = document.createElement('div');
    row.className = 'row';
    const title = document.createElement('div');
    title.className = 'title';
    const b = document.createElement('strong');
    b.textContent = r.label;
    title.append(b);
    if (!preview) {
      const c = document.createElement('code');
      c.textContent = r.code;
      title.append(c);
    }
    const track = document.createElement('div');
    track.className = 'track';
    const ball = document.createElement('div');
    ball.className = 'ball';
    track.append(ball);
    balls.push(ball);
    row.append(title, track);
    wrap.append(row);
  }
  el.append(wrap);

  const tweens: gsap.core.Tween[] = [];
  const ctx = gsap.context(() => {
    const [a, b, c] = balls as [HTMLElement, HTMLElement, HTMLElement];
    const common = { duration: 1, ease: 'power1.inOut', repeat: -1 };
    tweens.push(
      gsap.to(a, { ...common, x: 80 }),
      gsap.to(b, { ...common, x: 80, yoyo: true }),
      gsap.to(c, { ...common, x: 'random(-80, 80)', yoyo: true, repeatRefresh: true }),
    );
  }, el);

  if (!preview) {
    const label = document.createElement('label');
    label.className = 'delay';
    const text = document.createElement('span');
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '0';
    range.max = '1.5';
    range.step = '0.1';
    range.value = '0';
    const show = (): void => {
      text.textContent = `repeatDelay(${Number(range.value).toFixed(1)})`;
    };
    show();
    range.addEventListener('input', () => {
      for (const t of tweens) t.repeatDelay(Number(range.value));
      show();
    });
    label.append(text, range);
    el.append(label);
  }

  return () => {
    ctx.revert();
  };
};

export default mount;
