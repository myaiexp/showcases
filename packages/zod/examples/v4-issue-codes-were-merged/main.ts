// Each wrong value run through Zod 3 and Zod 4: the code before, the code now
import * as z from 'zod';
import * as z3 from 'zod/v3';
import type { Mount } from '@/types.ts';
import { factTable, type Fact } from '../../shared/fact-table.ts';
import { leafText } from '../../shared/value-view.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

interface Case {
  input: unknown;
  v4: z.ZodType;
  v3: z3.ZodTypeAny;
  what: string;
}

// A plan choice, a fixed currency, a delivery date and a price: all given wrong values.
const CASES: Case[] = [
  { input: 'gold', v4: z.enum(['free', 'pro']), v3: z3.enum(['free', 'pro']), what: 'plan' },
  { input: 'USD', v4: z.literal('EUR'), v3: z3.literal('EUR'), what: 'currency' },
  { input: new Date('soon'), v4: z.date(), v3: z3.date(), what: 'delivery' },
  { input: Infinity, v4: z.number(), v3: z3.number(), what: 'price' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, 'issue.code   Zod 3  →  Zod 4');
  const table = factTable(stage.root, stage, '11.5em');
  table.show(
    CASES.map(({ input, v4, v3, what }) => {
      const before = v3.safeParse(input);
      const code3 = before.success ? 'accepted' : before.error.issues[0]!.code;
      const now = v4.safeParse(input);
      const code4 = now.success ? 'accepted' : now.error.issues[0]!.code;
      return { label: code3, text: `→ ${code4}${stage.preview ? '' : `    ${what}: ${leafText(input)}`}`, tone: code3 === code4 ? undefined : 'ok' } as Fact;
    }),
  );
  stage.say('Zod 4 has fewer issue codes: the old specific ones were folded into invalid_value and invalid_type', 'info');
  return stage.dispose;
};

export default mount;
