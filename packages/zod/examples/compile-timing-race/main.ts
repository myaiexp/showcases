// Time plain and z.compile()d schemas over the same inputs, valid and invalid
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { raceBars, ratioText, timeCalls } from '../../shared/compile-race.ts';
import { button, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const keys = Array.from({ length: 20 }, (_, i) => `field${i}`);
const wide = z.object(Object.fromEntries(keys.map((k) => [k, z.string()])));
const wideGood = Object.fromEntries(keys.map((k) => [k, 'text']));
const wideBad = { ...wideGood, field19: 19 };

const strings = z.array(z.string());
const stringsGood = Array.from({ length: 10 }, (_, i) => `row ${i}`);
const stringsBad = [...stringsGood.slice(0, 9), 9];

const point = z.tuple([z.number(), z.number(), z.string()]);

const cat = z.object({ kind: z.literal('cat'), lives: z.number() });
const dog = z.object({ kind: z.literal('dog'), good: z.boolean() });
const bird = z.object({ kind: z.literal('bird'), wings: z.number() });
const pet = z.union([cat, dog, bird]);

interface Shape {
  label: string;
  code: string;
  schema: z.ZodType;
  good: unknown;
  bad: unknown;
}
const SHAPES: Shape[] = [
  { label: 'object, 20 keys', code: 'z.object({ field0 … field19: z.string() })', schema: wide, good: wideGood, bad: wideBad },
  { label: 'array of 10 strings', code: 'z.array(z.string())', schema: strings, good: stringsGood, bad: stringsBad },
  { label: 'tuple of 3', code: 'z.tuple([z.number(), z.number(), z.string()])', schema: point, good: [1, 2, 'a'], bad: [1, 2, 3] },
  { label: 'union of 3 objects', code: 'z.union([cat, dog, bird])', schema: pet, good: { kind: 'bird', wings: 2 }, bad: { kind: 'bird', wings: '2' } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Times vary with your machine and its mood: run it a few times.' });
  const code = codeLine(stage.root, '');
  const bars = raceBars(stage.root, ['plain', 'compiled']);
  // z.compile() is called once per shape, lazily, then the copy is reused.
  const compiled = new Map<Shape, z.ZodType>();
  const compiledOf = (s: Shape): z.ZodType => {
    let c = compiled.get(s);
    if (!c) compiled.set(s, (c = z.compile(s.schema)));
    return c;
  };
  let busy = false;

  const race = async (s: Shape, valid: boolean, count: number): Promise<void> => {
    if (busy) return;
    busy = true;
    try {
      const input = valid ? s.good : s.bad;
      const fast = compiledOf(s);
      code.textContent = `${s.code}   ×${count}`;
      bars.reset(`parsing ${valid ? 'good' : 'bad'} data ${count} times each…`);
      stage.say('… timing the standard parser, then the compiled one');
      const plainMs = await timeCalls(stage, () => s.schema.safeParse(input), count);
      const fastMs = await timeCalls(stage, () => fast.safeParse(input), count);
      bars.show([plainMs, fastMs], `compiled was ${ratioText(plainMs, fastMs)}`, fastMs < plainMs ? 'ok' : 'info');
      stage.say(
        valid
          ? `✓ the same ${count} parses: ${plainMs.toFixed(1)} ms plain, ${fastMs.toFixed(1)} ms compiled`
          : `✓ bad data: failures re-run the standard parser to build the error, so compiling helps less (${plainMs.toFixed(1)} vs ${fastMs.toFixed(1)} ms)`,
        'ok',
      );
    } finally {
      busy = false;
    }
  };

  if (stage.preview) {
    // A small race: 400 parses a side is a few milliseconds, then a long rest.
    const plan: [Shape, boolean][] = [[SHAPES[0]!, true], [SHAPES[1]!, true], [SHAPES[0]!, false], [SHAPES[3]!, true]];
    stage.play(async (wait) => {
      for (const [s, valid] of plan) {
        await race(s, valid, 400);
        await wait(3200);
      }
    });
  } else if (stage.bar) {
    let shape = SHAPES[0]!;
    let valid = true;
    let count = 20000;
    const go = (): void => void race(shape, valid, count).catch(() => undefined);
    select(stage.bar, 'Schema', SHAPES.map((s) => [s, s.label] as const), (s) => (shape = s));
    select(stage.bar, 'Data', [[true, 'valid'], [false, 'one wrong value']] as const, (v) => (valid = v));
    slider(stage.bar, 'Parses', 1000, 100000, 1000, count, (v) => (count = v), (v) => v.toLocaleString());
    button(stage.bar, 'Run race', go);
    code.textContent = shape.code;
    bars.reset('Press "Run race".');
    stage.say('Pick a schema and press Run race.');
  }
  return stage.dispose;
};

export default mount;
