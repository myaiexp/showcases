// A numeric enum with reverse names: what z.enum lists as its options
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { sampleRows } from '../../shared/rows.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, note } from '../../shared/widgets.ts';

// What TypeScript compiles `enum Country { UK, Germany, France }` into: names AND numbers.
const Country: Record<string | number, string | number> = {};
for (const [i, name] of ['UK', 'Germany', 'France'].entries()) {
  Country[name] = i;
  Country[i] = name;
}

const Place = z.enum(Country as { UK: 0; Germany: 1; France: 2 });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, 'z.enum(Country).options');
  note(stage.root, `Country object holds ${Object.keys(Country).length} entries: ${Object.keys(Country).join(', ')}`);
  note(stage.root, `.options lists ${Place.options.length}: ${JSON.stringify(Place.options)}`);
  const rows = sampleRows(stage.root, stage, { inTitle: 'Value', outTitle: 'Place says' });
  rows.show([2, 0, 'Germany'].map((input) => ({ input, result: Place.safeParse(input) })));
  stage.say('Every option the list shows is accepted: no leftover names that fail to parse', 'ok');
  return stage.dispose;
};

export default mount;
