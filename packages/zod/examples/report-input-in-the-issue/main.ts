// reportInput puts the rejected value into each issue; by default it is left out on purpose
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { drive } from '../../shared/drive.ts';
import { columns } from '../../shared/side-by-side.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';
import { valueView } from '../../shared/value-view.ts';

const Password = z.string().min(12);

const SAMPLES = [
  { label: 'hunter2', value: 'hunter2' },
  { label: 'letmein', value: 'letmein' },
  { label: 'a number', value: 123456 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a password attempt: the issue on the right carries it along.' });
  codeLine(stage.root, 'z.string().min(12).safeParse(x, { reportInput: true })');
  // A card is too narrow for two issue objects: it shows them one after the other.
  const cols = columns(stage.root, stage.preview ? [''] : ['Default', 'reportInput: true']);
  const plain = cols[0]!;
  const reported = cols[stage.preview ? 0 : 1]!;
  let withInput = false;
  const draw = (value: unknown): void => {
    const left = Password.safeParse(value);
    const right = Password.safeParse(value, { reportInput: true });
    // Each column shows the first issue as the object Zod made.
    if (stage.preview) {
      plain.body.replaceChildren(valueView((withInput ? right : left).error?.issues[0]));
      stage.say(withInput ? '✗ reportInput: true adds "input", the rejected value' : '✗ By default the issue leaves the input out', 'bad');
      return;
    }
    plain.body.replaceChildren(valueView(left.error?.issues[0]));
    reported.body.replaceChildren(valueView(right.error?.issues[0]));
    stage.say('✗ Only the right-hand issue carries "input", the value that was rejected', 'bad');
  };
  if (stage.preview) stage.cycle([false, true], 2600, (f) => { withInput = f; draw(SAMPLES[0]!.value); });
  else drive(stage, SAMPLES, draw);
  return stage.dispose;
};

export default mount;
