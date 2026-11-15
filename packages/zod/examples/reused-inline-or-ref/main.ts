// A schema used twice: written out twice, or once under $defs and pointed to
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { jsonTour } from '../../shared/json-schema-view.ts';
import { createStage } from '../../shared/stage.ts';

const Address = z.object({ street: z.string(), zip: z.string().length(5) });
const Order = z.object({ billing: Address, shipping: Address });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Highlighted lines are new compared with inline.' });
  jsonTour(
    stage,
    [
      { label: 'inline (default)', call: 'z.toJSONSchema(Order)', make: () => z.toJSONSchema(Order), say: 'The address rules are written out twice' },
      { label: 'ref', call: "z.toJSONSchema(Order, { reused: 'ref' })", make: () => z.toJSONSchema(Order, { reused: 'ref' }), say: 'Written once under $defs; both fields point to it', tone: 'ok' },
    ],
    {
      code: `const Address = z.object({
  street: z.string(),
  zip: z.string().length(5),
})
const Order = z.object({
  billing: Address,
  shipping: Address,
})`,
      short: 'Order = z.object({ billing: Address, shipping: Address })',
      menu: 'reused',
    },
  );
  return stage.dispose;
};

export default mount;
