// getChildren, getById, recent, remove and clear on a master timeline with a nested timeline
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const dots = h('div', 'dots', '', wrap);
  const d = [1, 2, 3, 4, 5].map(() => h('div', 'box', '', dots)) as unknown as [
    HTMLElement,
    HTMLElement,
    HTMLElement,
    HTMLElement,
    HTMLElement,
  ];
  const out = h('pre', 'readout', '', wrap);

  let timer = 0;
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, defaults: { duration: 0.6, ease: 'power2.inOut' } });
    const nested = gsap.timeline({ id: 'nested' });
    nested.to(d[3], { id: 'four', y: 28 }).to(d[4], { id: 'five', y: 28 });
    tl.to(d[0], { id: 'one', y: 28 })
      .to(d[1], { id: 'two', y: 28 })
      .to(d[2], { id: 'three', y: 28 })
      .add(nested, 0.3);

    type Kid = gsap.core.Tween | gsap.core.Timeline;
    const kids = (nested?: boolean, tweens?: boolean, timelines?: boolean, after?: number): Kid[] =>
      tl.getChildren(nested, tweens, timelines, after) as Kid[];
    const name = (a: Kid): string => {
      const id = a.vars.id as string | undefined;
      return `${a instanceof gsap.core.Timeline ? 'timeline' : 'tween'}${id ? ' "' + id + '"' : ''} @${a.startTime().toFixed(1)}s`;
    };
    const list = (title: string, items: Kid[]): void => {
      out.textContent = `${title}\n=> ${items.length}: ${items.map(name).join(', ') || 'nothing'}`;
    };
    const flash = (target: Element | null): void => {
      d.forEach((x) => x.classList.toggle('hl', x === target));
    };
    const queries: Array<[string, () => void]> = [
      ['getChildren(false)', () => list('getChildren(false, true, true): direct children only', kids(false))],
      ['getChildren()', () => list('getChildren(): nested ones too', kids())],
      ['tweens only', () => list('getChildren(true, true, false): tweens, no timelines', kids(true, true, false))],
      ['after 1s', () => list('getChildren(true, true, true, 1): start at 1s or later', kids(true, true, true, 1))],
      ['getById("five")', () => {
        const t = tl.getById('five') as gsap.core.Tween | undefined; // searches inside the nested timeline too
        flash((t?.targets()[0] as Element | undefined) ?? null);
        out.textContent = `getById("five") => ${t ? name(t) : 'undefined'}`;
      }],
      ['recent()', () => {
        const r = tl.recent() as Kid | undefined;
        out.textContent = `recent() => ${r ? name(r) : 'undefined'} (last added, wherever it sits)`;
      }],
    ];
    list('getChildren(): nested ones too', kids());

    if (preview) {
      let n = 0;
      timer = window.setInterval(() => queries[n++ % queries.length]![1](), 1500);
      return;
    }
    const bar = h('div', 'bar', '', wrap);
    queries.forEach(([label, fn]) => btn(label, fn, bar));
    const bar2 = h('div', 'bar', '', wrap);
    let added = 0;
    btn('add tween', () => ctx.add(() => {
      if (kids(false).length >= 10) return;
      tl.to(d[(added++ % 3) as 0 | 1 | 2], { id: `extra${added}`, rotation: '+=90' }, 0.2 * added);
      list('tl.to(...) added, its id shows in the list', kids(false));
    }), bar2);
    btn('remove(recent())', () => {
      const r = tl.recent() as Kid | undefined;
      if (r) tl.remove(r);
      list('remove(recent())', kids(false));
    }, bar2);
    btn('clear()', () => {
      tl.clear();
      list('clear()', kids());
    }, bar2);
  }, el);

  return () => {
    clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
