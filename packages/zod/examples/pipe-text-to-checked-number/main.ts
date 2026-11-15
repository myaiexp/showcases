// A three-stage pipe over form text: each stage's output, and where the chain stops
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { drive } from '../../shared/drive.ts';
import { pipelineView, runStages } from '../../shared/pipeline-view.ts';
import { createStage } from '../../shared/stage.ts';

const isText = z.string();
const toNumber = z.coerce.number<string>();
const inRange = z.int().min(1).max(20);

// The real schema: the three stages piped together.
const Quantity = isText.pipe(toNumber).pipe(inRange);

const STAGES = [
  { label: 'z.string()', schema: isText },
  { label: 'z.coerce.number()', schema: toNumber },
  { label: 'z.int().min(1).max(20)', schema: inRange },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the JSON value: a stage that fails stops the pipe, later stages never run.' });
  const view = pipelineView(stage.root, stage, { types: true });
  drive(
    stage,
    [
      { label: '"3"', value: '3' },
      { label: '"0"', value: '0' },
      { label: '"2.5"', value: '2.5' },
      { label: '"tuna"', value: 'tuna' },
      { label: '7 (a number)', value: 7 },
      { label: '"25"', value: '25' },
    ],
    (input) => {
      view.show(input, runStages(input, STAGES));
      const r = Quantity.safeParse(input);
      if (r.success) stage.say(`✓ The pipe turned ${JSON.stringify(input)} into the number ${r.data}`, 'ok');
      else stage.say(`✗ The pipe stops at the first stage that fails: ${r.error.issues[0]!.message.replace(/^Invalid input: /, '')}`, 'bad');
    },
    { editor: stage.root, ms: 2600 },
  );
  return stage.dispose;
};

export default mount;
