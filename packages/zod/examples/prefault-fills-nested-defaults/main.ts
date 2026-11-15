// .default({}) leaves an object empty; .prefault({}) lets each field fill itself in
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const fields = {
  host: z.string().default('localhost'),
  port: z.number().default(5432),
  ssl: z.boolean().default(false),
};
// TypeScript wants a full config here, so the empty object is cast: at run time it stays empty.
const WithDefault = z.object(fields).default({} as { host: string; port: number; ssl: boolean });
const WithPrefault = z.object(fields).prefault({});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both schemas get the same missing config; click to step.' });
  const code = codeLine(stage.root, '');
  const check = checkpoint(stage.root, stage, { label: 'parse(undefined)', inTitle: 'Config file', outTitle: 'Config in use' });
  const steps = [
    { code: 'z.object({ host: …default, port: …default }).default({})', schema: WithDefault, say: '✗ Not what you wanted: the default {} is returned as it is, with no host or port' },
    { code: 'z.object({ host: …default, port: …default }).prefault({})', schema: WithPrefault, say: '✓ The empty object was parsed, so each field filled itself in' },
  ];
  const at = stage.cycle(steps, 3600, (s) => {
    code.textContent = s.code;
    const r = s.schema.safeParse(undefined);
    check.show(undefined, r);
    stage.say(s.say, r.success && Object.keys(r.data as object).length ? 'ok' : 'warn');
  });
  if (stage.bar) {
    let i = 0;
    button(stage.bar, 'Other way', () => at(++i));
  }
  return stage.dispose;
};

export default mount;
