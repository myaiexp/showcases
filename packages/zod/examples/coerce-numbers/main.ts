// The same inputs through z.number() and z.coerce.number(): strict vs converted
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { sampleRows } from '../../shared/rows.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const strict = z.number();
// Coercion runs Number(input) before checking that the result is a number.
const coerced = z.coerce.number();

const INPUTS: unknown[] = ['42', 42, '3.5', '', true, null, 'tuna'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const code = codeLine(stage.root, '');
  const rows = sampleRows(stage.root, stage, { types: true, outTitle: 'Output' });

  const show = (useCoerce: boolean): void => {
    const schema = useCoerce ? coerced : strict;
    code.textContent = useCoerce ? 'z.coerce.number()  // Number(input), then check' : 'z.number()  // must already be a number';
    const results = INPUTS.map((input) => ({ input, result: schema.safeParse(input) }));
    rows.show(results);
    const passed = results.filter((r) => r.result.success).length;
    stage.say(`${passed} of ${INPUTS.length} inputs pass ${useCoerce ? 'with coercion' : 'strictly'}`, useCoerce ? 'ok' : 'warn');
  };

  if (stage.preview) stage.cycle([false, true], 4200, show);
  else if (stage.bar) {
    select(stage.bar, 'Schema', [[false, 'z.number()'], [true, 'z.coerce.number()']] as const, show);
    show(false);
  }
  return stage.dispose;
};

export default mount;
