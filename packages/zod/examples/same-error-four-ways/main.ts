// One failed parse written four ways: treeify, prettify, flatten and the deprecated format
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { flatView, formatView, textBlock, treeView } from '../../shared/error-format-view.ts';
import { columns } from '../../shared/side-by-side.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const Player = z.strictObject({ username: z.string(), favoriteNumbers: z.array(z.number()) });
// The input from the docs: three issues, one of them with no field.
const result = Player.safeParse({ username: 1234, favoriteNumbers: [1234, '4567'], extraKey: 1234 });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same three issues, four ways to write them.' });
  if (result.success) return stage.dispose;
  const error = result.error;
  const call = codeLine(stage.root, '');
  const ways = [
    { title: 'treeifyError', code: 'z.treeifyError(error)', draw: () => treeView(z.treeifyError(error)), say: 'A tree shaped like the data: walk properties and items' },
    { title: 'prettifyError', code: 'z.prettifyError(error)', draw: () => textBlock(z.prettifyError(error)), say: 'A string to print: one line per issue, its path under it' },
    { title: 'flattenError', code: 'z.flattenError(error)', draw: () => flatView(z.flattenError(error)), say: 'Two lists: formErrors (no field) and fieldErrors by first key' },
    { title: 'formatError', code: 'z.formatError(error)', draw: () => formatView(z.formatError(error) as never), say: 'Deprecated: a tree with _errors at each level' },
  ];
  if (stage.preview) {
    const [box] = columns(stage.root, ['']);
    stage.cycle(ways, 3200, (w) => {
      call.textContent = w.code;
      box!.body.replaceChildren(w.draw());
      stage.say(`✗ ${w.say}`, 'bad');
    });
  } else {
    call.textContent = 'result.error  →  four formats';
    const boxes = columns(stage.root, ways.map((w) => w.title));
    ways.forEach((w, i) => boxes[i]!.body.append(w.draw()));
    stage.say('✗ One error, four formats: pick the one that fits where it is going', 'bad');
  }
  return stage.dispose;
};

export default mount;
