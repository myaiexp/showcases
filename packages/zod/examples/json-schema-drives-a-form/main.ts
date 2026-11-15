// A form drawn only from the JSON Schema a Zod schema writes, then checked by Zod
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { jsonView } from '../../shared/json-schema-view.ts';
import { fieldsFromJsonSchema, formView } from '../../shared/schema-form.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, plural } from '../../shared/widgets.ts';
import './style.css';

const SignUp = z.object({
  username: z.string().min(3).max(20).meta({ title: 'Username', description: 'Letters and digits', examples: ['ada_l'] }),
  email: z.email().meta({ title: 'Email', examples: ['ada@example.com'] }),
  age: z.int().min(13).max(120).meta({ title: 'Age' }).optional(),
  plan: z.enum(['free', 'pro']).meta({ title: 'Plan' }).default('free'),
  newsletter: z.boolean().meta({ title: 'Send me the newsletter' }).default(false),
});
const Feedback = z.object({
  topic: z.enum(['bug', 'idea', 'other']),
  rating: z.int().min(1).max(5),
  message: z.string().min(10).max(500),
  reply: z.boolean(),
});
const SCHEMAS = [
  { label: 'Sign-up', name: 'SignUp', schema: SignUp },
  { label: 'Feedback', name: 'Feedback', schema: Feedback },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type in the form: it was built from the JSON Schema (right), but Zod does the checking.' });
  const layout = document.createElement('div');
  layout.className = 'jsf-layout';
  stage.root.append(layout);
  const left = document.createElement('div');
  layout.append(left);
  const code = codeLine(left, '');
  let formHost = document.createElement('div');
  left.append(formHost);
  const view = stage.preview ? null : jsonView(layout);

  const show = (c: (typeof SCHEMAS)[number]): void => {
    // io: 'input' describes what a person types: a field with a default is not required.
    const jsonSchema = z.toJSONSchema(c.schema, { io: 'input' });
    code.textContent = `form(z.toJSONSchema(${c.name}, { io: 'input' }))`;
    view?.set(jsonSchema);
    const fresh = document.createElement('div');
    formHost.replaceWith(fresh);
    formHost = fresh;
    const fields = fieldsFromJsonSchema(jsonSchema);
    const form = formView(formHost, stage, fields);
    const check = (): void => {
      let bad = 0;
      for (const f of fields) {
        const input = form.inputs.get(f.key)!;
        const raw = input instanceof HTMLInputElement && input.type === 'checkbox' ? input.checked : input.value;
        const value = raw === '' ? undefined : f.kind === 'number' ? Number(raw) : raw;
        const r = (c.schema.shape as Record<string, z.ZodType>)[f.key]!.safeParse(value);
        form.error(f.key, r.success || (value === undefined && !f.required) ? null : r.error.issues[0]!.message);
        if (!r.success) bad++;
      }
      stage.say(bad ? `✗ ${plural(bad, 'field')} to fix: labels, stars and limits came from the JSON Schema` : '✓ Every field passes', bad ? 'warn' : 'ok');
    };
    if (!stage.preview) for (const i of form.inputs.values()) i.addEventListener('input', check);
    stage.say(`${fields.length} fields: titles, required stars, limits and the plan menu all read from the JSON Schema`);
  };
  const at = stage.cycle(SCHEMAS, 3800, show);
  if (stage.bar) select(stage.bar, 'Schema', SCHEMAS.map((c, i) => [i, c.label] as const), at);
  return stage.dispose;
};

export default mount;
