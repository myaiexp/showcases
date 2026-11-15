// z.string().transform(length): text goes in, a number comes out
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { note } from '../../shared/widgets.ts';

const mySchema = z.string().transform((val) => val.length);

// These types exist only for TypeScript; the note below spells them out.
type MySchemaIn = z.input<typeof mySchema>; // string
type MySchemaOut = z.output<typeof mySchema>; // number
const typeNote = 'z.input<typeof mySchema>  → string\nz.output<typeof mySchema> → number';

const SAMPLES = [
  { label: '"hello"', value: 'hello' },
  { label: '"sandwich"', value: 'sandwich' },
  { label: '"" (empty)', value: '' },
  { label: '42 (not text)', value: 42 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  if (!stage.preview) note(stage.root, typeNote);
  const check = checkpoint(stage.root, stage, { label: 'transform(val => val.length)', types: true, stacked: false, inTitle: 'Input (string)', outTitle: 'Output (number)' });
  drive(stage, SAMPLES, (input) => {
    const result = mySchema.safeParse(input);
    check.show(input, result);
    if (result.success) {
      const out: MySchemaOut = result.data;
      stage.say(`✓ text in, number out: ${JSON.stringify(input as MySchemaIn)} → ${out}`, 'ok');
    } else stage.say('✗ The input side still has to be a string', 'bad');
  });
  return stage.dispose;
};

export default mount;
