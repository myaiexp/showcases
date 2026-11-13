// Two rows of tiles picked at random: one never repeats until all are used, one only avoids the last pick
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { h } from '../../shared/ui.ts';
import { getRandomFrom, pluckRandomFrom, type Tracked } from './pluckRandomFrom.ts';
import './style.css';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const mkRow = (label: string): { tiles: HTMLElement[]; pulses: gsap.core.Timeline[]; note: HTMLElement } => {
    const wrap = h('div', 'rowwrap', '', root);
    h('span', 'tag', label, wrap);
    const row = h('div', 'row', '', wrap);
    const tiles = LETTERS.map((l) => h('div', 'tile', l, row));
    const note = h('span', 'note', '', wrap);
    return { tiles, pulses: [], note };
  };
  const pluck = mkRow('pluckRandomFrom(array)');
  const rand = mkRow('getRandomFrom(array)');
  if (preview) { pluck.note.remove(); rand.note.remove(); }

  const a: Tracked<string> = [...LETTERS];
  const b: Tracked<string> = [...LETTERS];

  const ctx = gsap.context(() => {
    // One paused pop animation per tile, built once and restarted on every pick.
    for (const row of [pluck, rand]) {
      row.pulses = row.tiles.map((t) => gsap.timeline({ paused: true }).to(t, { scale: 1.35, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }));
    }
  }, el);

  const mark = (row: typeof pluck, letter: string, used: boolean): void => {
    const i = LETTERS.indexOf(letter);
    (row.tiles[i] as HTMLElement).classList.toggle('used', used);
    (row.tiles[i] as HTMLElement).classList.toggle('hot', true);
    row.pulses[i]?.restart();
  };

  const pick = (): void => {
    // pluck: a fresh pass begins whenever nothing is eligible, so clear the dimming then
    if (!a.eligible?.length) for (const t of pluck.tiles) t.classList.remove('used');
    for (const t of [...pluck.tiles, ...rand.tiles]) t.classList.remove('hot');
    const p = pluckRandomFrom(a);
    mark(pluck, p, true);
    pluck.note.textContent = `plucked ${p}, ${a.eligible?.length ?? 0} left`;
    const r = getRandomFrom(b);
    mark(rand, r, false);
    rand.note.textContent = `picked ${r} (never the same twice in a row)`;
  };

  pick();
  const timer = window.setInterval(pick, preview ? 650 : 800);

  return () => {
    window.clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
