// Types JSON cannot describe: an error by default, an anything-goes {} with unrepresentable: "any"
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { inline } from '../../shared/eval-log.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const CASES: { code: string; schema: z.ZodType }[] = [
  { code: 'z.date()', schema: z.date() },
  { code: 'z.bigint()', schema: z.bigint() },
  { code: 'z.set(z.string())', schema: z.set(z.string()) },
  { code: 'z.string().transform(Number)', schema: z.string().transform(Number) },
  { code: 'z.undefined()', schema: z.undefined() },
  { code: 'z.number().multipleOf(0)', schema: z.number().multipleOf(0) },
  { code: 'z.object({ when: z.date() })', schema: z.object({ when: z.date() }) },
];

const strip = (v: unknown): unknown => {
  const { $schema: _, ...rest } = v as Record<string, unknown>;
  return rest;
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same schema converted twice: with the default, and with unrepresentable: "any".' });
  const table = document.createElement('div');
  table.className = 'unr-table';
  stage.root.append(table);
  for (const t of ['Zod type', 'default', "unrepresentable: 'any'"]) {
    const h = document.createElement('div');
    h.className = 'unr-head';
    h.textContent = t;
    table.append(h);
  }
  const rows = stage.preview ? CASES.slice(0, 6) : CASES;
  for (const c of rows) {
    const code = document.createElement('code');
    code.textContent = c.code;
    const first = document.createElement('div');
    try {
      z.toJSONSchema(c.schema);
      first.textContent = 'fine';
    } catch (err) {
      first.textContent = `✗ ${(err as Error).message.replace(' cannot be represented in JSON Schema', '')} refused`;
      first.dataset['tone'] = 'bad';
    }
    const second = document.createElement('div');
    second.textContent = `✓ ${inline(strip(z.toJSONSchema(c.schema, { unrepresentable: 'any' })))}`;
    second.dataset['tone'] = 'ok';
    table.append(code, first, second);
  }
  stage.say('By default Zod refuses what JSON cannot say; "any" turns each into {} (anything goes) and moves on');
  if (stage.preview) {
    // Light the rows up one after another so the card is alive.
    const cells = [...table.children].slice(3) as HTMLElement[];
    stage.play(async (wait) => {
      for (const c of cells) {
        c.getAnimations().forEach((x) => x.cancel());
        c.style.opacity = '0';
      }
      for (let i = 0; i < cells.length; i += 3) {
        await wait(600);
        for (const c of cells.slice(i, i + 3)) c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: 'forwards' });
      }
      await wait(2500);
    });
  }
  return stage.dispose;
};

export default mount;
