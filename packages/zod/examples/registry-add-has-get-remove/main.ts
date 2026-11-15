// A registry is a shelf: add a schema with its metadata, look it up, take it off
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { evalLog } from '../../shared/eval-log.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each line runs against one registry, in order.' });
  evalLog(
    stage,
    () => {
      const reg = z.registry<{ description: string }>();
      const a = z.string();
      const b = z.number();
      return [
        { code: "reg.add(a, { description: 'A cool schema!' })", run: () => (reg.add(a, { description: 'A cool schema!' }), 'added'), say: 'add() files the schema away with its metadata' },
        { code: 'reg.has(a)', run: () => reg.has(a), tone: 'ok' as const },
        { code: 'reg.get(a)', run: () => reg.get(a) },
        { code: 'reg.remove(a); reg.has(a)', run: () => (reg.remove(a), reg.has(a)), tone: 'warn' as const, say: 'remove() takes it off the shelf again' },
        { code: "reg.add(a, …); reg.add(b, …); reg.clear(); reg.has(b)", run: () => (reg.add(a, { description: 'one' }).add(b, { description: 'two' }).clear(), reg.has(b)), tone: 'warn' as const, say: 'clear() wipes the whole registry' },
      ];
    },
    { final: '✓ add, has, get, remove, clear: that is the whole registry', cardRows: 4, ms: 1200 },
  );
  return stage.dispose;
};

export default mount;
