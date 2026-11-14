// A recipe's steps, reordered while the empty slot cycles through four looks
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import { bar, select } from '../../shared/controls.ts';
import './style.css';

const STEPS = ['Whisk the eggs', 'Fold in the flour', 'Rest the batter', 'Heat the pan', 'Pour and flip'];
// Each look is a class in style.css; ghostClass is how Sortable is told which one to use.
const LOOKS = { Outline: 'slot-outline', Faded: 'slot-faded', 'Thin bar': 'slot-bar', Glow: 'slot-glow' } as const;
type Look = keyof typeof LOOKS;

const mount: Mount = (el, { preview, signal }) => {
  const badge = document.createElement('div');
  badge.className = 'look';
  const list = document.createElement('ol');
  list.className = 'list';
  for (const text of STEPS.slice(0, preview ? 4 : 5)) {
    const step = document.createElement('li');
    step.className = 'step';
    step.textContent = text;
    list.append(step);
  }
  el.append(list);

  // ghostClass names the class put on the row that is being moved: the slot it will drop into.
  const sortable = Sortable.create(list, { animation: 150, ghostClass: LOOKS.Outline });
  const setLook = (look: Look): void => {
    sortable.option('ghostClass', LOOKS[look]); // read at the start of each drag
    badge.textContent = `slot look: ${look}`;
  };
  setLook('Outline');

  if (preview) {
    el.prepend(badge);
    // Each drag uses the next look, so the card shows all four.
    const looks = Object.keys(LOOKS) as Look[];
    let n = 0;
    loopDrive(el, signal, async (hand) => {
      setLook(looks[n++ % looks.length]!);
      await hand.drag(list.lastElementChild!, { el: list.firstElementChild!, fy: 0.2 }, 1.3);
    }, 0.4);
  } else {
    const controls = bar(el);
    el.prepend(controls);
    select(controls, 'Drop slot look', Object.keys(LOOKS) as Look[], setLook);
    controls.append(badge);
  }

  return () => release(sortable);
};

export default mount;
