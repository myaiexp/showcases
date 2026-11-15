// Plain, strict and loose objects: what Zod does to an extra key, and what the JSON Schema says
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { inline } from '../../shared/eval-log.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const CASES = [
  { code: 'z.object({ a })', schema: z.object({ a: z.string() }) },
  { code: 'z.strictObject({ a })', schema: z.strictObject({ a: z.string() }) },
  { code: 'z.looseObject({ a })', schema: z.looseObject({ a: z.string() }) },
];
const SAMPLE = { a: 'x', extra: 1 };

/** What the JSON Schema's additionalProperties says about a stray key, in words. */
function says(schema: z.ZodType, io: 'input' | 'output'): { text: string; tone: string } {
  const extra = (z.toJSONSchema(schema, { io }) as Record<string, unknown>)['additionalProperties'];
  if (extra === false) return { text: 'false: not allowed', tone: 'bad' };
  if (extra === undefined) return { text: 'not mentioned', tone: 'info' };
  return { text: `${inline(extra)}: allowed`, tone: 'ok' };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Parsing { a: "x", extra: 1 } with each schema, then asking each for its JSON Schema.' });
  const table = document.createElement('div');
  table.className = 'obs-table';
  stage.root.append(table);
  for (const t of ['Schema', `parse(${inline(SAMPLE)})`, 'additionalProperties (output)', '… (io: input)']) {
    const h = document.createElement('div');
    h.className = 'obs-head';
    h.textContent = stage.preview && t.startsWith('additionalProperties') ? 'output' : stage.preview && t.startsWith('…') ? 'input' : t;
    table.append(h);
  }
  const cells: HTMLElement[] = [];
  for (const c of CASES) {
    const r = c.schema.safeParse(SAMPLE);
    const code = document.createElement('code');
    code.textContent = c.code;
    const parsed = document.createElement('div');
    parsed.textContent = r.success ? `✓ ${inline(r.data)}` : '✗ extra key refused';
    parsed.dataset['tone'] = r.success ? 'ok' : 'bad';
    const out = says(c.schema, 'output');
    const inp = says(c.schema, 'input');
    const a = document.createElement('div');
    a.textContent = out.text;
    a.dataset['tone'] = out.tone;
    const b = document.createElement('div');
    b.textContent = inp.text;
    b.dataset['tone'] = inp.tone;
    table.append(code, parsed, a, b);
    cells.push(code, parsed, a, b);
  }
  stage.say('A plain object strips the stray key and says so in the output JSON Schema; the input one stays silent');
  if (stage.preview) {
    stage.play(async (wait) => {
      for (const c of cells) {
        c.getAnimations().forEach((x) => x.cancel());
        c.style.opacity = '0';
      }
      for (let i = 0; i < cells.length; i += 4) {
        await wait(700);
        for (const c of cells.slice(i, i + 4)) c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: 'forwards' });
      }
      await wait(2600);
    });
  }
  return stage.dispose;
};

export default mount;
