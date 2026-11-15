// A size field typed live and checked by z.enum(['S', 'M', 'L', 'XL'])
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { textField, typeLoop } from '../../shared/field.ts';
import { sampleRows } from '../../shared/rows.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const Size = z.enum(['S', 'M', 'L', 'XL']);

const SAMPLES = ['M', 'XL', 'm', 'XXL', 'large', ''];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a size: the whole text must be one of the listed values.' });
  codeLine(stage.root, "z.enum(['S', 'M', 'L', 'XL'])");
  const field = textField(stage.root, stage, { label: 'Size', placeholder: 'S, M, L or XL', tries: SAMPLES.slice(0, 5) });
  field.onInput((text) => {
    const result = Size.safeParse(text);
    if (result.success) {
      field.state(true, `✓ ${text} is a size on offer`);
      stage.say(`✓ ${text} is in the list`, 'ok');
    } else {
      field.state(text ? false : null, text ? '✗ not on the list' : 'Type a size');
      stage.say(text ? `✗ ${result.error.issues[0]!.message}` : 'Nothing typed yet', text ? 'bad' : 'info');
    }
  });
  field.state(null, 'Type a size');
  if (!stage.preview) sampleRows(stage.root, stage, { inTitle: 'Sample', showOutput: false }).show(SAMPLES.slice(0, 5).map((input) => ({ input, result: Size.safeParse(input) })));
  typeLoop(stage, field, ['M', 'm', 'XL', 'XXL'], 1400);
  return stage.dispose;
};

export default mount;
