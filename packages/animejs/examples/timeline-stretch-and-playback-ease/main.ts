// Two identical timelines side by side: one plain, one with playbackEase, both stretched by a slider
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const column = (el: HTMLElement, title: string): HTMLElement[] => {
  const col = document.createElement('div');
  col.className = 'col';
  const h = document.createElement('div');
  h.className = 'h';
  h.textContent = title;
  col.append(h);
  const dots: HTMLElement[] = [];
  for (let i = 0; i < 3; i++) {
    const track = document.createElement('div');
    track.className = 'track';
    const dot = document.createElement('div');
    dot.className = 'dot';
    track.append(dot);
    col.append(track);
    dots.push(dot);
  }
  el.append(col);
  return dots;
};

const mount: Mount = (el, { preview }) => {
  const cols = document.createElement('div');
  cols.className = 'cols';
  el.append(cols);
  const plainDots = column(cols, 'no playbackEase');
  const easedDots = column(cols, "playbackEase 'inOut(3)'");

  const fill = (tl: ReturnType<typeof createTimeline>, dots: HTMLElement[]) =>
    tl.add(dots[0]!, { x: '6rem', ease: 'out(1)' })
      .add(dots[1]!, { x: '6rem', ease: 'out(2)' })
      .add(dots[2]!, { x: '6rem', ease: 'out(3)' });

  const plain = fill(createTimeline({ loop: true, alternate: true }), plainDots);
  // playbackEase is applied across the whole timeline, over every child.
  const eased = fill(createTimeline({ loop: true, alternate: true, playbackEase: 'inOut(3)' }), easedDots);

  const stretch = (ms: number): void => {
    plain.stretch(ms).restart();
    eased.stretch(ms).restart();
  };
  stretch(preview ? 2400 : 3000);

  let input: HTMLInputElement | undefined;
  let readout: HTMLElement | undefined;
  const onInput = (): void => {
    if (!input || !readout) return;
    readout.textContent = `stretch(${input.value}) total ms per iteration`;
    stretch(+input.value);
  };
  if (!preview) {
    const wrap = document.createElement('div');
    wrap.className = 'bar';
    readout = document.createElement('span');
    readout.className = 'readout';
    readout.textContent = 'stretch(3000) total ms per iteration';
    input = document.createElement('input');
    input.type = 'range';
    input.min = '600';
    input.max = '6000';
    input.step = '200';
    input.value = '3000';
    input.addEventListener('input', onInput);
    wrap.append(input, readout);
    el.append(wrap);
  }

  return () => {
    input?.removeEventListener('input', onInput);
    plain.revert();
    eased.revert();
  };
};

export default mount;
