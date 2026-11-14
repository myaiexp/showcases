// A long-press list where a slightly shaky finger still picks the row up
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { drive, loopDrive, type Hand } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const ROWS = ['Sunrise run', 'Team stand-up', 'Lunch with Ines', 'Piano lesson'];

const mount: Mount = (el, { preview, signal }) => {
  const status = document.createElement('div');
  status.className = 'readline';
  const list = document.createElement('ul');
  list.className = 'rows';
  for (const r of preview ? ROWS.slice(0, 3) : ROWS) {
    const li = document.createElement('li');
    li.className = 'row';
    li.textContent = r;
    list.append(li);
  }
  el.append(status, list);

  let grabbed = false;
  const sortable = Sortable.create(list, {
    delay: 400, // hold for 0.4 s to pick a row up...
    // ...and the finger may drift this far meanwhile without cancelling the wait. With 0, even
    // the smallest tremor cancels it.
    touchStartThreshold: 5,
    // With native drag and drop Sortable caps this option at 1 when it is created ("cannot be
    // greater than the native dragstart threshold"), so the fallback is needed to honour the value.
    forceFallback: true,
    chosenClass: 'held',
    ghostClass: 'ghost',
    animation: 150,
    onChoose: () => (grabbed = true),
  });

  /** A finger that presses a row, trembles `wobble` px for the whole wait, then drags to `to`. */
  const shakyDrag = async (hand: Hand, root: HTMLElement, row: Element, to: Element, wobble: number): Promise<boolean> => {
    grabbed = false;
    const r = row.getBoundingClientRect();
    const o = root.getBoundingClientRect();
    const cx = r.left - o.left + r.width / 2;
    const cy = r.top - o.top + r.height / 2;
    hand.down(row);
    for (let i = 0; i < 7; i++) {
      await hand.glide({ x: cx + (i % 2 ? -wobble : wobble), y: cy }, 0.07);
    }
    await hand.glide({ x: cx, y: cy }, 0.05);
    await hand.glide(to, 0.8);
    await hand.wait(0.1);
    hand.up();
    return grabbed;
  };

  if (!preview) {
    let wobble = 3;
    const bar = document.createElement('div');
    bar.className = 'bar';
    const effective = (): number => Number(sortable.option('touchStartThreshold'));
    const say = (): void => {
      status.textContent = `Allowed drift: ${effective()} px   Finger tremor: ${wobble} px`;
    };
    slider(bar, 'touchStartThreshold', 0, 12, 1, 5, (v) => {
      sortable.option('touchStartThreshold', v);
      say();
    }, (v) => v + ' px');
    slider(bar, 'finger tremor', 1, 10, 1, wobble, (v) => {
      wobble = v;
      say();
    }, (v) => v + ' px');
    const result = document.createElement('p');
    result.className = 'hint';
    result.textContent = 'Press "Try a shaky finger": a simulated finger trembles while it holds a row. It is picked up only if the allowed drift is larger than the tremor.';
    button(bar, 'Try a shaky finger', () => {
      void drive(el, signal, async (hand) => {
        result.textContent = 'Holding...';
        const ok = await shakyDrag(hand, el, list.firstElementChild!, list.lastElementChild!, wobble);
        result.textContent = ok ? 'Picked up: the tremor stayed inside the allowed drift.' : 'Slipped: the tremor cancelled the wait, so nothing was grabbed.';
        await hand.wait(0.3);
      });
    });
    el.append(bar, result);
    say();
  } else {
    let strict = false;
    loopDrive(el, signal, async (hand) => {
      strict = !strict;
      sortable.option('touchStartThreshold', strict ? 0 : 6);
      status.textContent = strict ? 'Allowed drift 0 px' : 'Allowed drift 6 px';
      const ok = await shakyDrag(hand, el, list.firstElementChild!, list.lastElementChild!, 3);
      status.textContent = (strict ? 'Allowed drift 0 px: ' : 'Allowed drift 6 px: ') + (ok ? 'picked up' : 'slipped');
      await hand.wait(0.6);
    }, 0.3);
  }

  return () => release(sortable);
};

export default mount;
