// A copy made with .min() or .trim() keeps its metadata (not its id); a wrapper starts bare
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { evalLog } from '../../shared/eval-log.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The docs say a derived schema has no metadata. Zod 4.6.7 does something more careful.' });
  evalLog(
    stage,
    () => {
      // A registry of our own: nothing here touches the page-wide one.
      const reg = z.registry<{ id?: string; title?: string }>();
      const name = z.string().register(reg, { id: 'name', title: 'Name' });
      const short = name.min(2).register(reg, { title: 'Short name' });
      return [
        { code: 'reg.get(name)', run: () => reg.get(name) },
        { code: 'reg.get(name.min(2))', run: () => reg.get(name.min(2)), tone: 'ok' as const, say: 'A same-kind copy inherits the title, but not the id' },
        { code: 'reg.get(name.trim())', run: () => reg.get(name.trim()), tone: 'ok' as const },
        { code: 'reg.get(name.optional())', run: () => reg.get(name.optional()), tone: 'warn' as const, say: 'optional() builds a new wrapper schema: nothing is inherited', sayTone: 'warn' as const },
        { code: 'reg.get(z.array(name))', run: () => reg.get(z.array(name)), tone: 'warn' as const },
        { code: "name.min(2).register(reg, { title: 'Short name' })", run: () => reg.get(short), say: 'Its own metadata wins over the inherited one' },
      ];
    },
    { final: '✓ Same-kind copies (min, trim, refine) inherit metadata; wrappers and objects do not', cardRows: 4, ms: 1300 },
  );
  return stage.dispose;
};

export default mount;
