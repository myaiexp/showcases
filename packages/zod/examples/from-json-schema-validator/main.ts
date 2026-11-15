// z.fromJSONSchema turns JSON Schema text into a working validator, judged on samples
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { sampleRows } from '../../shared/rows.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, plural } from '../../shared/widgets.ts';
import './style.css';

const SOURCE = `{
  "type": "object",
  "properties": {
    "name": { "type": "string", "minLength": 2 },
    "age": { "type": "integer", "minimum": 0, "maximum": 30 },
    "vaccinated": { "type": "boolean" }
  },
  "required": ["name", "age"]
}`;

const SAMPLES: unknown[] = [
  { name: 'Mochi', age: 3 },
  { name: 'Mochi', age: 3.5 },
  { name: 'M', age: 3 },
  { age: 3 },
  { name: 'Mochi', age: 31 },
  { name: 'Mochi', age: 3, vaccinated: 'yes' },
  { name: 'Mochi', age: 3, chip: '0042' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the JSON Schema: a validator is rebuilt from it as you type.' });
  const layout = document.createElement('div');
  layout.className = 'fjs-layout';
  stage.root.append(layout);
  let area: HTMLTextAreaElement | null = null;
  const status = document.createElement('div');
  status.className = 'fjs-status';
  if (!stage.preview) {
    area = document.createElement('textarea');
    area.className = 'fjs-area';
    area.spellcheck = false;
    area.rows = 10;
    area.value = SOURCE;
    layout.append(area);
  }
  const right = document.createElement('div');
  right.className = 'fjs-right';
  layout.append(right);
  codeLine(right, 'const Pet = z.fromJSONSchema(jsonSchema)');
  const rows = sampleRows(right, stage, { inTitle: 'Sample', outTitle: 'Pet.safeParse says' });
  right.append(status);

  const rebuild = (): void => {
    let validator: z.ZodType;
    try {
      validator = z.fromJSONSchema(JSON.parse(area?.value ?? SOURCE));
    } catch (err) {
      status.textContent = `Cannot build a validator yet: ${(err as Error).message}`;
      status.dataset['tone'] = 'bad';
      return;
    }
    status.textContent = '';
    const results = SAMPLES.map((input) => ({ input, result: validator.safeParse(input) }));
    // A card shows six rows, so it counts the same six.
    const shown = stage.preview ? results.slice(0, 6) : results;
    rows.show(shown);
    const passed = shown.filter((r) => r.result.success).length;
    stage.say(`${plural(passed, 'sample')} of ${shown.length} pass: the rules came from plain JSON text`, passed === shown.length ? 'ok' : 'warn');
  };
  area?.addEventListener('input', rebuild);
  rebuild();
  return stage.dispose;
};

export default mount;
