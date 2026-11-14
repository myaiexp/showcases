// .register() gives back the very same schema; .meta() and .describe() give a new one
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { evalLog } from '../../shared/eval-log.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each line runs, and the result is what the code returned.' });
  evalLog(
    stage,
    () => {
      const reg = z.registry<{ title: string }>();
      const s = z.string();
      return [
        { code: "s.register(reg, { title: 'Name' }) === s", run: () => s.register(reg, { title: 'Name' }) === s, tone: 'ok' as const, say: 'register() hands back the schema you called it on' },
        { code: 'reg.has(s)', run: () => reg.has(s) },
        { code: "s.meta({ title: 'Name' }) === s", run: () => s.meta({ title: 'Name' }) === s, tone: 'warn' as const, say: 'meta() returns a new schema', sayTone: 'warn' as const },
        { code: "s.describe('A name') === s", run: () => s.describe('A name') === s, tone: 'warn' as const },
      ];
    },
    { final: '✓ Only register() leaves the schema itself in place', cardRows: 4 },
  );
  return stage.dispose;
};

export default mount;
