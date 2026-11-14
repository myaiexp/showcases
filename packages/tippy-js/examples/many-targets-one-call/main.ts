// A palette in three rows, each row given its tips by a different kind of target
import tippy, { type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const HEX = ['#ef4444', '#f59e0b', '#22c55e', '#06b6d4', '#6366f1', '#ec4899', '#a3a3a3'];

function row(parent: HTMLElement, title: string, colors: string[]): { swatches: HTMLElement[]; result: HTMLElement } {
  const line = document.createElement('div');
  line.className = 'row';
  const label = document.createElement('span');
  label.className = 'label';
  label.textContent = title;
  const swatches = colors.map((hex) => {
    const s = document.createElement('button');
    s.className = 'swatch';
    s.style.background = hex;
    s.setAttribute('data-hex', hex);
    s.setAttribute('aria-label', hex);
    return s;
  });
  const result = document.createElement('code');
  result.className = 'result';
  line.append(label, ...swatches, result);
  parent.append(line);
  return { swatches, result };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 270, hint: 'Hover any swatch: its tip shows its own hex code.' });
  const a = row(stage.root, 'One element', HEX.slice(0, 1));
  const b = row(stage.root, 'An array', HEX.slice(1, 4));
  const c = row(stage.root, 'A NodeList', HEX.slice(4));

  // The tip text is a function of the element it belongs to.
  const shared = {
    content: (ref: Element) => ref.getAttribute('data-hex') ?? '',
    appendTo: stage.root,
    placement: 'right',
  } as const;

  // A single Element gives back a single Instance.
  const one = stage.own(tippy(a.swatches[0]!, shared));
  // An Element[] and a NodeList both give back an Instance[].
  const many = stage.own(tippy(b.swatches, shared));
  const list = stage.own(tippy(c.swatches[0]!.parentElement!.querySelectorAll('.swatch'), shared));

  const kind = (r: Instance | Instance[]): string => (Array.isArray(r) ? `Instance[${r.length}]` : 'Instance');
  a.result.textContent = `→ ${kind(one)}`;
  b.result.textContent = `→ ${kind(many)}`;
  c.result.textContent = `→ ${kind(list)}`;

  if (stage.preview) {
    const all = [...a.swatches, ...b.swatches, ...c.swatches];
    stage.play(async (wait) => {
      for (const s of all) {
        await stage.ghost.hover(s, 380);
        await wait(380);
      }
      stage.ghost.leave();
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
