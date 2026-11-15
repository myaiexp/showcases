// Two schemas with one id: adding is silent, converting to JSON Schema is where it throws
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { evalLog } from '../../shared/eval-log.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The docs say the second add() throws. In Zod 4.6.7 it does not.' });
  evalLog(
    stage,
    () => {
      const reg = z.registry<{ id?: string }>();
      const user = z.string().min(2);
      const other = z.number();
      return [
        { code: "reg.add(user, { id: 'user' })", run: () => (reg.add(user, { id: 'user' }), 'added') },
        { code: "reg.add(other, { id: 'user' })", run: () => (reg.add(other, { id: 'user' }), 'no error'), tone: 'warn' as const, say: 'No error here, although the docs promise one', sayTone: 'warn' as const },
        { code: 'z.toJSONSchema(reg)  // lists by id', run: () => Object.entries(z.toJSONSchema(reg).schemas as Record<string, { type: string }>).map(([id, s]) => `${id}: ${s.type}`), tone: 'warn' as const, say: 'The registry now answers "user" with the second schema only' },
        { code: 'z.toJSONSchema(z.object({ user, other }), { metadata: reg })', run: () => z.toJSONSchema(z.object({ user, other }), { metadata: reg }), tone: 'bad' as const, say: 'Using both together is where the clash is reported', sayTone: 'bad' as const },
      ];
    },
    { cardRows: 4, ms: 1300, final: '✗ Only converting both together reports the clash', finalTone: 'bad' },
  );
  return stage.dispose;
};

export default mount;
