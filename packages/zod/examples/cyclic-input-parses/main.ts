// Cyclical input: a category that lists itself parses, and the result loops too
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { valueView } from '../../shared/value-view.ts';
import { pills } from '../../shared/widgets.ts';
import './style.css';

const Category = z.object({
  name: z.string(),
  get subcategories() {
    return z.array(Category);
  },
});

interface Node {
  name: string;
  subcategories: Node[];
}

// A category that lists itself.
function selfLoop(): Node {
  const tea: Node = { name: 'Tea', subcategories: [] };
  tea.subcategories.push(tea);
  return tea;
}

// Two categories that list each other.
function pairLoop(): Node {
  const tea: Node = { name: 'Tea', subcategories: [] };
  const green: Node = { name: 'Green tea', subcategories: [tea] };
  tea.subcategories.push(green);
  return tea;
}

const CASES = [
  { label: 'a category listing itself', make: selfLoop, back: (r: Node) => r.subcategories[0] === r },
  { label: 'two categories listing each other', make: pairLoop, back: (r: Node) => r.subcategories[0]!.subcategories[0] === r },
];

function pane(title: string, body: HTMLElement): HTMLElement {
  const el = document.createElement('div');
  el.className = 'zd-pane';
  const head = document.createElement('div');
  head.className = 'zd-pane-head';
  head.textContent = title;
  const inner = document.createElement('div');
  inner.className = 'zd-pane-body';
  inner.append(body);
  el.append(head, inner);
  return el;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both trees end in ↺: the loop is in the input and in the result.' });
  const grid = document.createElement('div');
  grid.className = 'cy-grid';
  const setters = pills(stage.root, ['parsed', 'new object', 'loop kept']);
  const [setOk, setCopy, setLoop] = [setters[0]!, setters[1]!, setters[2]!];
  stage.root.prepend(grid);

  const show = (c: (typeof CASES)[number]): void => {
    const input = c.make();
    const result = Category.safeParse(input);
    if (!result.success) {
      stage.say('✗ Unexpectedly rejected', 'bad');
      return;
    }
    const out = result.data as Node;
    grid.replaceChildren(pane('Input', valueView(input)), pane('Result', valueView(out)));
    setOk('yes', 'ok');
    setCopy(out !== input ? 'yes' : 'no', out !== input ? 'ok' : 'bad');
    setLoop(c.back(out) ? 'yes' : 'no', c.back(out) ? 'ok' : 'bad');
    stage.say('✓ Parsed without looping for ever: the result is a copy with the same loop', 'ok');
  };
  const at = stage.cycle(CASES, 3800, (c) => show(c));
  if (stage.bar) select(stage.bar, 'Data', CASES.map((c, i) => [i, c.label] as const), (i) => at(i));
  return stage.dispose;
};

export default mount;
