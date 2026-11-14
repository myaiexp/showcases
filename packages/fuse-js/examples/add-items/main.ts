// fuse.add(): a new to-do is searchable the moment it is added, with no rebuild
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { button, textInput } from '../../shared/controls.ts';
import { docShelf } from '../../shared/doc-shelf.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';

interface Todo {
  title: string;
}

const START: Todo[] = ['Buy milk', 'Call the plumber', 'Pay rent', 'Book dentist', 'Water the plants'].map((title) => ({ title }));
const LATER = ['Plumbing quote for kitchen', 'Pay plumber invoice', 'Order new tap washers'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Search "plumb", then add a to-do about plumbing: it shows up in the results straight away.' });
  const box = searchBox(stage.root, stage, { value: 'plumb', placeholder: 'Search to-dos…' });
  const info = pills(stage.root);
  const shelf = docShelf<Todo>(stage.root, { label: (t) => t.title });

  // `todos` is what the shelf draws. Fuse gets a copy, because fuse.add() pushes into the
  // array it was given (and fuse.remove() swaps that array for a new one).
  const todos = START.map((t) => ({ ...t }));
  const fuse = new Fuse([...todos], { keys: ['title'], includeScore: true });

  const run = (): void => {
    const q = box.value.trim();
    const hits = q ? new Map(fuse.search(q).map((r) => [r.item, r.score] as const)) : null;
    shelf.sync(todos);
    shelf.mark(hits);
    info.set('to-dos', todos.length);
    info.set(`match "${q}"`, hits?.size ?? 0, hits?.size ? 'ok' : undefined);
  };
  const add = (title: string): void => {
    if (!title.trim()) return;
    // The new document is indexed on the spot: the very next search can find it.
    const doc = { title };
    fuse.add(doc);
    todos.push(doc);
    run();
    stage.say(`Added "${title}": ${fuse.search(box.value).length} to-dos now match "${box.value}"`, 'ok');
  };
  box.onInput(run);
  run();

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const title of LATER.slice(0, 2)) {
        await wait(1700);
        add(title);
      }
      await wait(2200);
      const gone = fuse.remove((t) => LATER.includes(t.title));
      todos.splice(0, todos.length, ...todos.filter((t) => !gone.includes(t)));
      run();
      stage.say('Back to the start');
    });
  } else if (stage.bar) {
    let draft = LATER[0]!;
    const field = textInput(stage.bar, 'new to-do', draft, (v) => (draft = v), 22);
    button(stage.bar, 'Add', () => {
      add(draft);
      field.value = '';
      draft = '';
    });
    stage.say(`${fuse.search(box.value).length} to-do matches "${box.value}"`);
  }
  return stage.dispose;
};

export default mount;
