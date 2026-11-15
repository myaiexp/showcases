// z.json(): what survives a trip through JSON, and what does not
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { sampleRows } from '../../shared/rows.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const Json = z.json();

const VALUES: { name: string; value: unknown }[] = [
  { name: 'config object', value: { debug: false, ports: [80, 443], proxy: null } },
  { name: 'a list', value: [1, 'two', [3]] },
  { name: 'a date', value: new Date('2026-11-14') },
  { name: 'missing', value: undefined },
  { name: 'a function', value: () => 1 },
  { name: 'NaN', value: NaN },
  { name: 'a date inside', value: { savedAt: new Date('2026-11-14') } },
  { name: 'a big integer', value: 10n },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each row is a value we try to treat as JSON.' });
  codeLine(stage.root, 'z.json()');
  const rows = sampleRows(stage.root, stage, { inTitle: 'Value', outTitle: 'z.json() says' });
  const shown = stage.preview ? VALUES.slice(0, 7) : VALUES;
  rows.show(shown.map((v) => ({ input: v.value, result: Json.safeParse(v.value), note: v.name })));
  const ok = shown.filter((v) => Json.safeParse(v.value).success).length;
  stage.say(`${ok} of ${shown.length} values are JSON-safe: dates, missing values, functions, NaN and big integers are not`, 'info');
  return stage.dispose;
};

export default mount;
