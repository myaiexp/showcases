// Email addresses typed one by one and checked by z.email() at every keystroke
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { textField, typeLoop } from '../../shared/field.ts';
import { sampleRows } from '../../shared/rows.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const Email = z.email();

const SAMPLES = ['ada@example.com', 'ada.example.com', 'ada@example', 'ada..l@example.com', 'ada+news@mail.co.uk'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type any address: it is checked on every keystroke.' });
  codeLine(stage.root, 'z.email()');
  const field = textField(stage.root, stage, { label: 'Email', placeholder: 'you@example.com', tries: SAMPLES });

  field.onInput((text) => {
    if (!text) return field.state(null, 'Type an address');
    const result = Email.safeParse(text);
    field.state(result.success, result.success ? '✓ looks like an email address' : `✗ ${result.error.issues[0]!.message}`);
  });
  field.state(null, 'Type an address');

  // Every sample sorted at once, under the field.
  const rows = sampleRows(stage.root, stage, { inTitle: 'Sample', showOutput: false });
  rows.show(SAMPLES.map((input) => ({ input, result: Email.safeParse(input) })));
  typeLoop(stage, field, SAMPLES.slice(0, 3));
  return stage.dispose;
};

export default mount;
