// z.date() against strings, timestamps and an Invalid Date, plus a custom error function
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaTour } from '../../shared/schema-tour.ts';
import { createStage } from '../../shared/stage.ts';

const Plain = z.date();
const Friendly = z.date({ error: (issue) => (issue.input === undefined ? 'Required' : 'Invalid date') });

const INPUTS = [new Date('2026-11-14T09:30:00Z'), '2026-11-14T09:30:00.000Z', 1794648600000, new Date('nope'), undefined];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'JSON has no Date type: a date that crossed JSON is text until something turns it back.' });
  schemaTour(
    stage,
    [
      { label: 'z.date()', code: 'z.date()', schema: Plain, say: 'Only a real Date object passes. Text and numbers are rejected, and so is a Date that holds no valid time' },
      { label: 'with an error function', code: "z.date({ error: issue => … 'Required' : 'Invalid date' })", schema: Friendly, say: 'Same checks, friendlier words: a missing value says Required, the rest Invalid date' },
    ],
    { inputs: INPUTS, showOutput: false, types: true, outTitle: 'Zod says' },
  );
  return stage.dispose;
};

export default mount;
