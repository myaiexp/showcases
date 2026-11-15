// A form labelled from the title, description and examples stored with .meta()
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { inline } from '../../shared/eval-log.ts';
import { formView, type FormField } from '../../shared/schema-form.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, note } from '../../shared/widgets.ts';

// .meta() files a title, a description and examples away for each schema.
const Profile = z.object({
  name: z.string().min(2).meta({ title: 'Full name', description: 'As shown on your badge', examples: ['Ada Lovelace'] }),
  email: z.email().meta({ title: 'Email', description: 'Only used for your receipt', examples: ['ada@example.com'] }),
  age: z.number().int().min(13).meta({ title: 'Age', description: '13 or older', examples: [29] }),
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a field: the form read its label, help and placeholder from .meta().' });
  const keys = Object.keys(Profile.shape) as (keyof typeof Profile.shape)[];
  // Calling .meta() with no argument reads the metadata back.
  const fields: FormField[] = keys.map((key) => {
    const meta = Profile.shape[key].meta();
    return { key, label: meta?.title ?? key, help: meta?.description, placeholder: String((meta?.['examples'] as unknown[] | undefined)?.[0] ?? '') };
  });
  const form = formView(stage.root, stage, fields);
  const call = codeLine(stage.root, '');
  const shown = note(stage.root);

  const look = (i: number): void => {
    const key = keys[i]!;
    form.focus(key);
    call.textContent = `Profile.shape.${key}.meta()`;
    shown.textContent = inline(Profile.shape[key].meta());
    stage.say(`The "${fields[i]!.label}" label, help text and placeholder all came from this one object`);
  };
  const at = stage.cycle(keys, 2800, (_k, i) => look(i));
  if (!stage.preview) keys.forEach((key, i) => form.rows.get(key)!.addEventListener('click', () => at(i)));
  return stage.dispose;
};

export default mount;
