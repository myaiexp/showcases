// string -> Date by transform, then z.date() and a refine reject what the transform produced
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { drive } from '../../shared/drive.ts';
import { pipelineView, runStages } from '../../shared/pipeline-view.ts';
import { createStage } from '../../shared/stage.ts';

const isText = z.string();
const toDate = z.transform((text: string) => new Date(text));
const realDate = z.date();
const thisYearOn = z.date().refine((d) => d.getUTCFullYear() >= 2026, { error: 'Before 2026' });

const Departure = isText.pipe(toDate).pipe(realDate).pipe(thisYearOn);

const STAGES = [
  { label: 'z.string()', schema: isText },
  { label: 'z.transform(new Date)', schema: toDate },
  { label: 'z.date()', schema: realDate },
  { label: 'z.date().refine(2026+)', schema: thisYearOn },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the date text: the transform accepts anything, the stages after it do the judging.' });
  const view = pipelineView(stage.root, stage, { types: true });
  drive(
    stage,
    [
      { label: '2026-05-01', value: '2026-05-01' },
      { label: '2026-13-45', value: '2026-13-45' },
      { label: '2024-05-01', value: '2024-05-01' },
      { label: 'next friday', value: 'next friday' },
    ],
    (input) => {
      view.show(input, runStages(input, STAGES));
      const r = Departure.safeParse(input);
      if (r.success) stage.say('✓ A real date from 2026 on', 'ok');
      else stage.say(`✗ The transform made something, and a later stage said no: ${r.error.issues[0]!.message.replace(/^Invalid input: /, '')}`, 'bad');
    },
    { editor: stage.root, ms: 2800 },
  );
  return stage.dispose;
};

export default mount;
