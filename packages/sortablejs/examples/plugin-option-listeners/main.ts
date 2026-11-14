// A podium list whose labels switch when the plugin's option is changed with option()
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { mountOnce, release } from '../../shared/lifecycle.ts';
import Labels from './plugin.ts';
import './style.css';

mountOnce(Labels as unknown as Parameters<typeof mountOnce>[0]);

const ACTS = ['The Marmots', 'Neon Orchard', 'Delta Kid', 'Sol & Moth', 'Paper Tigers'];

const mount: Mount = (el, { preview, signal }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const list = document.createElement('ol');
  list.className = 'acts';
  for (const name of ACTS.slice(0, preview ? 4 : 5)) {
    const li = document.createElement('li');
    li.className = 'act';
    li.textContent = name;
    list.append(li);
  }
  const state = document.createElement('p');
  state.className = 'state';
  stage.append(list, state);
  el.append(stage);

  const sortable = Sortable.create(list, {
    animation: 150,
    labels: 'none', // the plugin's option; its listener turns it into labels on the items
  } as Sortable.Options);
  // option() is typed for the built-in options only; a plugin's own option needs a loose view of it.
  const loose = sortable as unknown as { option(name: string, value?: unknown): unknown };
  const show = (): void => {
    state.textContent = `option('labels') = ${JSON.stringify(loose.option('labels'))}`;
  };
  show();
  const setMode = (m: string): void => {
    loose.option('labels', m); // the plugin's listener runs right here and may rewrite the value
    show();
  };

  if (preview) {
    // Each round switches the labels with option(), sloppy spelling included, then moves an act.
    const modes = ['  NUMBERS ', 'letters', 'none'];
    let turn = 0;
    loopDrive(el, signal, async (hand) => {
      setMode(modes[turn++ % modes.length]!);
      await hand.wait(0.7);
      const rows = [...list.children].filter((c) => !c.classList.contains('sortable-fallback'));
      await hand.drag(rows[rows.length - 1]!, { el: rows[0]!, fy: 0.2 }, 0.9);
    }, 0.4);
  } else {
    const bar = document.createElement('div');
    bar.style.cssText = 'display:flex;justify-content:center;padding:10px 0 2px';
    select(bar, 'Labels', ['none', 'numbers', 'letters'] as const, setMode);
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Pick a label style: the plugin hears the option change and relabels at once. Labels also stay right after you drag. The listener tidies whatever it is given (try the card: "  NUMBERS " becomes "numbers").';
    el.append(bar, hint);
  }

  return () => release(sortable);
};

export default mount;
