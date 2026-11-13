// Three nested timelines with their own labels; getNestedLabelTime() lets the parent seek to any of them
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import { getNestedLabelTime } from './getNestedLabelTime.ts';
import './style.css';

const LABELS = ['red-lands', 'green-mid', 'blue-end'];
const COLORS = ['var(--red)', 'var(--green)', 'var(--accent)'];

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const lanes = h('div', 'lanes', '', root);
  const boxes = COLORS.map((c) => {
    const lane = h('div', 'lane', '', lanes);
    const b = h('div', 'box', '', lane);
    b.style.background = c;
    return b;
  });
  // the parent's time ruler: nested timelines as blocks, labels as ticks, playhead on top
  const ruler = h('div', 'ruler', '', root);
  const playhead = h('div', 'playhead', '', ruler);
  const readout = h('p', 'readout', '', root);

  let parent: gsap.core.Timeline | undefined;
  let nested: gsap.core.Timeline[] = [];
  const ctx = gsap.context(() => {
    const dist = preview ? 150 : 280;
    const mk = (box: HTMLElement, label: string, scale: number): gsap.core.Timeline => {
      const t = gsap.timeline();
      t.to(box, { x: dist, duration: 2, ease: 'none' }).addLabel(label, 1).timeScale(scale);
      return t;
    };
    // child timelines placed at different times with different timeScales
    nested = [mk(boxes[0] as HTMLElement, LABELS[0] as string, 1), mk(boxes[1] as HTMLElement, LABELS[1] as string, 0.5), mk(boxes[2] as HTMLElement, LABELS[2] as string, 2)];
    parent = gsap.timeline({ paused: true, onUpdate: () => { playhead.style.left = `${(parent!.progress() * 100).toFixed(2)}%`; } });
    parent.add(nested[0] as gsap.core.Timeline, 0).add(nested[1] as gsap.core.Timeline, 1).add(nested[2] as gsap.core.Timeline, 5);
  }, el);

  const p = parent as gsap.core.Timeline;
  const total = p.duration();
  nested.forEach((t, i) => {
    const block = h('div', 'block', '', ruler);
    block.style.left = `${(t.startTime() / total) * 100}%`;
    block.style.width = `${((t.endTime() - t.startTime()) / total) * 100}%`;
    block.style.background = COLORS[i] as string;
    const time = getNestedLabelTime(p, LABELS[i] as string) ?? 0;
    const tick = h('div', 'tick', '', ruler);
    tick.style.left = `${(time / total) * 100}%`;
  });
  ruler.append(playhead);

  const goto = (label: string): void => {
    const time = getNestedLabelTime(p, label);
    if (time === undefined) return;
    p.seek(time).play();
    readout.textContent = `getNestedLabelTime(tl, "${label}") = ${time.toFixed(2)}s  ->  tl.seek(${time.toFixed(2)})`;
  };

  let timer: number | undefined;
  if (preview) {
    readout.remove();
    p.play();
    let n = 0;
    timer = window.setInterval(() => goto(LABELS[n++ % LABELS.length] as string), 1800);
  } else {
    const bar = h('div', 'controls', '', root);
    for (const l of LABELS) btn(`seek to "${l}"`, () => goto(l), bar);
    btn('play', () => p.play(), bar);
    readout.textContent = 'Each label lives in a nested timeline (one runs at half speed, one at double). Ticks mark where the helper says they land on the parent.';
  }

  return () => {
    if (timer) window.clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
