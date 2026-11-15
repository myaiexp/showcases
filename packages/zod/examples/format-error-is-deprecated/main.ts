// z.formatError, the older nested format, next to z.treeifyError which the docs say to use instead
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { drive } from '../../shared/drive.ts';
import { formatView, treeView } from '../../shared/error-format-view.ts';
import { columns } from '../../shared/side-by-side.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const Player = z.strictObject({ username: z.string(), favoriteNumbers: z.array(z.number()) });

const SAMPLES = [
  { label: 'The docs example', value: { username: 1234, favoriteNumbers: [1234, '4567'], extraKey: 1234 } },
  { label: 'Only a number', value: { username: 'ada', favoriteNumbers: [1, 2, 'three'] } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both trees hold the same messages: formatError puts them under _errors.' });
  codeLine(stage.root, 'z.formatError(error)  (deprecated)  →  z.treeifyError(error)');
  // A card is too narrow for two trees: it shows them one after the other.
  const cols = columns(stage.root, stage.preview ? [''] : ['formatError (deprecated)', 'treeifyError']);
  const old = cols[0]!;
  const current = cols[stage.preview ? 0 : 1]!;
  let flip = false;
  const draw = (value: unknown): void => {
    const result = Player.safeParse(value);
    if (result.success) return;
    // The docs mark z.formatError as deprecated; it still works in this version.
    const formatted = formatView(z.formatError(result.error) as never);
    const tree = treeView(z.treeifyError(result.error));
    if (stage.preview) {
      old.body.replaceChildren(flip ? tree : formatted);
      stage.say(flip ? '✗ treeifyError: errors, properties, items' : '✗ formatError (deprecated): _errors at every level', 'bad');
      return;
    }
    old.body.replaceChildren(formatted);
    current.body.replaceChildren(tree);
    stage.say('✗ Same messages, two shapes: the docs say to use treeifyError', 'bad');
  };
  if (stage.preview) stage.cycle([false, true], 2800, (f) => { flip = f; draw(SAMPLES[0]!.value); });
  else drive(stage, SAMPLES, draw);
  return stage.dispose;
};

export default mount;
