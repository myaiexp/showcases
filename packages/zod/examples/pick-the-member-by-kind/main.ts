// z.getDiscriminatedOption(union, kind) returns that member to parse with
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const Fruit = z.object({ type: z.literal('fruit'), seeds: z.boolean() });
const Veg = z.object({ type: z.literal('vegetable'), leafy: z.boolean() });
const Produce = z.discriminatedUnion('type', [Fruit, Veg]);

// Each sample names the member to pull out and the data to check against it.
const SAMPLES = [
  { label: 'fruit, fruit data', value: { kind: 'fruit', data: { type: 'fruit', seeds: true } } },
  { label: 'fruit, veg data', value: { kind: 'fruit', data: { type: 'vegetable', leafy: true } } },
  { label: 'vegetable, veg data', value: { kind: 'vegetable', data: { type: 'vegetable', leafy: false } } },
  { label: 'no such member', value: { kind: 'meat', data: { type: 'meat' } } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, 'z.getDiscriminatedOption(Produce, kind)');
  const check = checkpoint(stage.root, stage, { inTitle: 'Data', label: 'member.safeParse' });
  drive(stage, SAMPLES, (value) => {
    const { kind, data } = value as { kind: string; data: unknown };
    // The kind is a plain string here, so the call is typed loosely.
    const member = (z.getDiscriminatedOption as (u: typeof Produce, k: string) => z.ZodType | undefined)(Produce, kind);
    if (!member) {
      check.show(data, { success: false, error: { issues: [{ path: [], message: `the union has no "${kind}" member` }] } });
      stage.say(`✗ getDiscriminatedOption found no member for "${kind}"`, 'bad');
      return;
    }
    const result = member.safeParse(data);
    check.show(data, result);
    stage.say(result.success ? `✓ the ${kind} member accepted it` : `✗ the ${kind} member alone rejected it`, result.success ? 'ok' : 'bad');
  });
  return stage.dispose;
};

export default mount;
