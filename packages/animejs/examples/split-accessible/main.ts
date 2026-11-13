// SplitText accessible: the visually hidden copy next to the aria-hidden split spans
import { animate, splitText, stagger } from 'animejs';
import type { TextSplitter } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const REVEALED = 'position:absolute;left:0;top:0;width:100%;height:100%;color:var(--accent);outline:1px dotted currentColor;';

const mount: Mount = (el, { preview }) => {
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent = 'Split text by words, but keep one readable copy.';
  el.append(p);

  const readout = document.createElement('pre');
  readout.className = 'table';
  let split: TextSplitter | null = null;
  let fade: ReturnType<typeof animate> | null = null;
  let accessible = true;
  let reveal = false;

  const describe = (s: TextSplitter): string => {
    const hidden = s.words.filter((w: HTMLElement) => w.getAttribute('aria-hidden') === 'true').length;
    const copy = accessible ? (s.$target.firstChild as HTMLElement) : null;
    return [
      `accessible: ${accessible}`,
      copy ? `first child: <span> visually hidden copy, "${copy.textContent}"` : 'first child: none, no accessible copy',
      `split words: ${s.words.length}, with aria-hidden="true": ${hidden}`,
      accessible ? 'a screen reader reads the copy once' : 'a screen reader reads each word span on its own',
    ].join('\n');
  };

  const render = (): void => {
    fade?.revert();
    split?.revert();
    split = splitText(p, { accessible });
    if (accessible && reveal) {
      // lift the copy out of its visually-hidden style so it can be seen
      (split.$target.firstChild as HTMLElement).style.cssText = REVEALED;
      fade = animate(split.words, { opacity: 0.3, delay: stagger(40) });
    } else {
      fade = null;
    }
    readout.textContent = describe(split);
  };
  render();

  let timer = 0;
  const buttons: Array<[HTMLButtonElement, () => void]> = [];
  if (preview) {
    const states: Array<[boolean, boolean]> = [[true, false], [true, true], [false, false]];
    let i = 0;
    timer = window.setInterval(() => {
      [accessible, reveal] = states[++i % states.length] ?? [true, false];
      render();
    }, 2000);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    ([
      ['Toggle accessible', () => { accessible = !accessible; render(); }],
      ['Toggle show copy', () => { reveal = !reveal; render(); }],
    ] as const).forEach(([label, fn]) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      b.addEventListener('click', fn);
      buttons.push([b, fn]);
      panel.append(b);
    });
    el.append(panel);
  }
  el.append(readout);

  return () => {
    window.clearInterval(timer);
    buttons.forEach(([b, fn]) => b.removeEventListener('click', fn));
    fade?.revert();
    split?.revert();
  };
};

export default mount;
