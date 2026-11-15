// unrepresentable as a function: say what a Date becomes, and refuse the rest in your words
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { jsonTour } from '../../shared/json-schema-view.ts';
import { createStage } from '../../shared/stage.ts';

const Event = z.object({ title: z.string(), when: z.date(), seats: z.bigint() });
const Talk = Event.omit({ seats: true });

type Handler = NonNullable<Extract<Parameters<typeof z.toJSONSchema>[1], object>['unrepresentable']>;
// Called once for each schema JSON cannot describe.
const dateAsText: Handler = ({ zodSchema, path, message }) => {
  if (zodSchema._zod.def.type === 'date') return { type: 'string', format: 'date-time' };
  throw new Error(`${message} (at /${path.join('/')})`);
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The handler is called for each type JSON cannot describe.' });
  jsonTour(
    stage,
    [
      { label: 'Default', call: 'z.toJSONSchema(Event)', make: () => z.toJSONSchema(Event), say: 'The first unrepresentable type stops everything', tone: 'bad' },
      { label: "'any'", call: "z.toJSONSchema(Event, { unrepresentable: 'any' })", make: () => z.toJSONSchema(Event, { unrepresentable: 'any' }), say: 'Both become {}: anything goes, the real shape is lost', tone: 'warn' },
      { label: 'Handler, Event', call: 'z.toJSONSchema(Event, { unrepresentable: dateAsText })', make: () => z.toJSONSchema(Event, { unrepresentable: dateAsText }), say: 'The date is handled, the bigint is refused in our own words, with its path', tone: 'bad' },
      { label: 'Handler, Talk', call: 'z.toJSONSchema(Talk, { unrepresentable: dateAsText })', make: () => z.toJSONSchema(Talk, { unrepresentable: dateAsText }), say: 'With only the date left, the handler converts it to a date-time string', tone: 'ok' },
    ],
    {
      code: `const Event = z.object({
  title: z.string(),
  when: z.date(),
  seats: z.bigint(),
})
const Talk = Event.omit({ seats: true })

const dateAsText = ({ zodSchema, path, message }) => {
  if (zodSchema._zod.def.type === 'date')
    return { type: 'string', format: 'date-time' }
  throw new Error(\`\${message} (at /\${path.join('/')})\`)
}`,
      short: 'Event = z.object({ title, when: z.date(), seats: z.bigint() })',
      menu: 'unrepresentable',
      marks: false,
      ms: 3400,
    },
  );
  return stage.dispose;
};

export default mount;
