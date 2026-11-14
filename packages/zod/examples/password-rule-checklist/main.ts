// Four refine rules on one password: each rule lights up as the typed text satisfies it
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { textField, typeLoop } from '../../shared/field.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';
import './style.css';

const RULES = ['8 or more characters', 'a capital letter', 'a digit', 'a symbol'] as const;

const Password = z
  .string()
  .refine((v) => v.length >= 8, { error: RULES[0] })
  .refine((v) => /[A-Z]/.test(v), { error: RULES[1] })
  .refine((v) => /\d/.test(v), { error: RULES[2] })
  .refine((v) => /[^A-Za-z0-9]/.test(v), { error: RULES[3] });

const TRIES = ['tea', 'Teapot9', 'Teapot-9-ok'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a password: a rule turns green when Zod no longer reports it.' });
  codeLine(stage.root, 'z.string().refine(…).refine(…).refine(…).refine(…)');
  const field = textField(stage.root, stage, { label: 'Password', placeholder: 'choose one', tries: TRIES, quiet: true });
  const list = document.createElement('ul');
  list.className = 'pw-rules';
  const lights = RULES.map((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    list.append(li);
    return li;
  });
  stage.root.append(list);

  field.onInput((text) => {
    const result = Password.safeParse(text);
    const broken = new Set(result.success ? [] : result.error.issues.map((i) => i.message));
    lights.forEach((li, i) => {
      li.dataset['ok'] = String(!broken.has(RULES[i]!));
    });
    if (result.success) stage.say('✓ All four rules pass', 'ok');
    else stage.say(`✗ ${broken.size} of 4 rules still failing: ${result.error.issues.map((i) => i.message).join(', ')}`, text ? 'warn' : 'info');
  });
  field.set('');
  typeLoop(stage, field, TRIES, 1400);
  return stage.dispose;
};

export default mount;
