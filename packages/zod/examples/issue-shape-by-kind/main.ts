// Eight kinds of failure and the issue object each one makes: code, path, message and extras
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { leaf, valueView } from '../../shared/value-view.ts';
import { codeLine } from '../../shared/widgets.ts';

interface Kind {
  label: string;
  code: string;
  schema: z.ZodType;
  input: unknown;
  /** What the extra fields tell you. */
  extras: string;
}

const KINDS: readonly Kind[] = [
  { label: 'Wrong type', code: 'z.object({ qty: z.number() })', schema: z.object({ qty: z.number() }), input: { qty: 'two' }, extras: 'expected names the type that was wanted' },
  { label: 'Too small', code: 'z.object({ name: z.string().min(3) })', schema: z.object({ name: z.string().min(3) }), input: { name: 'Al' }, extras: 'minimum and inclusive state the limit, origin says what was measured' },
  { label: 'Too big', code: 'z.object({ tags: z.array(z.string()).max(2) })', schema: z.object({ tags: z.array(z.string()).max(2) }), input: { tags: ['a', 'b', 'c'] }, extras: 'maximum is the limit; origin "array" means items were counted' },
  { label: 'Wrong format', code: 'z.string().startsWith("https://")', schema: z.string().startsWith('https://'), input: 'ftp://files.example', extras: 'format names the rule, prefix its argument' },
  { label: 'Not an option', code: 'z.enum(["S", "M", "L"])', schema: z.enum(['S', 'M', 'L']), input: 'XL', extras: 'values lists every allowed option' },
  { label: 'Unknown key', code: 'z.strictObject({ id: z.number() })', schema: z.strictObject({ id: z.number() }), input: { id: 1, admin: true }, extras: 'keys lists the fields that should not be there' },
  { label: 'Not a multiple', code: 'z.number().multipleOf(5)', schema: z.number().multipleOf(5), input: 12, extras: 'divisor is the number it had to divide by' },
  { label: 'Your own rule', code: 'z.string().refine((s) => s.length > 8, "Too short")', schema: z.string().refine((s) => s.length > 8, 'Too short'), input: 'ada', extras: 'custom issues carry only code, path and your message' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a kind of failure: every field of the issue is drawn.' });
  const call = codeLine(stage.root, '');
  const given = document.createElement('div');
  given.className = 'zd-note-box';
  const out = document.createElement('div');
  stage.root.append(given, out);

  const show = (k: Kind): void => {
    call.textContent = k.code;
    const result = k.schema.safeParse(k.input);
    given.replaceChildren('input ', leaf(k.input));
    if (result.success) return;
    // The issue is the plain object Zod made: code first, then what that code adds.
    out.replaceChildren(valueView(result.error.issues[0], { types: false }));
    stage.say(`✗ code "${result.error.issues[0]!.code}": ${k.extras}`, 'bad');
  };
  const at = stage.cycle(KINDS, 3200, show);
  if (stage.bar) select(stage.bar, 'Failure', KINDS.map((k, i) => [i, k.label] as const), (i) => at(i));
  return stage.dispose;
};

export default mount;
