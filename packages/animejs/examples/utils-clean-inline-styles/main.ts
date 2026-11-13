// utils.cleanInlineStyles() as onComplete: animated inline styles vanish, earlier set() styles stay
import { animate, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const mk = (label: string) => {
    const lane = document.createElement('div');
    lane.className = 'lane';
    const sq = document.createElement('div');
    sq.className = 'sq';
    const text = document.createElement('div');
    text.className = 'label';
    const style = document.createElement('code');
    style.className = 'style';
    text.append(label, document.createElement('br'), style);
    lane.append(sq, text);
    el.append(lane);
    return { sq, style };
  };
  const keep = mk('keep styles (default)');
  const clean = mk('onComplete: cleanInlineStyles');

  let anims: ReturnType<typeof animate>[] = [];
  let setter: ReturnType<typeof utils.set> | null = null;
  const show = (): void => {
    for (const { sq, style } of [keep, clean]) {
      style.textContent = sq.getAttribute('style') || '(no inline style)';
    }
  };
  const run = (): void => {
    anims.forEach((a) => a.revert());
    setter?.revert();
    // A style applied outside the animations: it should survive the cleanup.
    setter = utils.set([keep.sq, clean.sq], { scale: 0.75 });
    const common = { x: 220, borderRadius: '50%', duration: 1400, onUpdate: show };
    anims = [
      animate(keep.sq, { ...common, onComplete: show }),
      animate(clean.sq, {
        ...common,
        onComplete: (self) => {
          utils.cleanInlineStyles(self);
          show();
        },
      }),
    ];
  };

  run();
  const timer = window.setInterval(run, preview ? 3600 : 4200);
  if (!preview) {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'Replay';
    b.addEventListener('click', run);
    el.append(b);
  }

  return () => {
    window.clearInterval(timer);
    anims.forEach((a) => a.revert());
    setter?.revert();
  };
};

export default mount;
