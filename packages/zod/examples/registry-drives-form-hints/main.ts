// A registry of form hints (label, placeholder, help) next to the rules, one form from both
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { formView } from '../../shared/schema-form.ts';
import { createStage } from '../../shared/stage.ts';
import { plural } from '../../shared/widgets.ts';

const STEPS = [
  { username: 'ad', email: 'ada@', age: '9' },
  { username: 'ada_l', email: 'ada@example.com', age: '9' },
  { username: 'ada_l', email: 'ada@example.com', age: '29' },
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type in the form: the labels and hints come from the registry, the errors from the schema.' });
  // The registry holds what a form needs and the schema does not: wording, not rules.
  const hints = z.registry<{ label: string; placeholder?: string; help?: string }>();
  const Signup = z.object({
    username: z.string().min(3).max(20).register(hints, { label: 'Username', placeholder: 'ada_l', help: '3 to 20 characters' }),
    email: z.email().register(hints, { label: 'Email', placeholder: 'ada@example.com' }),
    age: z.coerce.number().int().min(13).register(hints, { label: 'Age', help: '13 or older' }),
  });
  const keys = Object.keys(Signup.shape) as (keyof typeof Signup.shape)[];
  const form = formView(
    stage.root,
    stage,
    keys.map((key) => ({ key, label: hints.get(Signup.shape[key])?.label ?? key, placeholder: hints.get(Signup.shape[key])?.placeholder, help: hints.get(Signup.shape[key])?.help })),
  );

  const check = (): void => {
    let bad = 0;
    for (const key of keys) {
      const text = form.inputs.get(key)!.value;
      const r = Signup.shape[key].safeParse(text);
      form.error(key, text && !r.success ? r.error.issues[0]!.message : null);
      if (!r.success) bad++;
    }
    if (bad) stage.say(`✗ ${plural(bad, 'field')} still to fix`, 'bad');
    else stage.say('✓ Every field passes: the form text and the rules came from different places', 'ok');
  };
  for (const input of form.inputs.values()) input.addEventListener('input', check);
  check();

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const step of STEPS) {
        for (const key of keys) form.set(key, step[key]);
        check();
        await wait(1800);
      }
    });
  }
  return stage.dispose;
};

export default mount;
