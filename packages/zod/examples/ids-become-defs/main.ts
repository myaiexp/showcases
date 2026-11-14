// A schema with an id is pulled out under $defs and referred to, wherever it is used
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { jsonTour } from '../../shared/json-schema-view.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The id lives in a registry of our own, so no other card sees it.' });
  const ids = z.registry<{ id?: string }>();
  const Email = z.email().register(ids, { id: 'email' });
  const Contact = z.object({ owner: Email, billing: Email, note: z.string() });
  jsonTour(
    stage,
    [
      { label: 'No ids', call: 'z.toJSONSchema(Contact, { metadata: z.registry() })', make: () => z.toJSONSchema(Contact, { metadata: z.registry() }), say: 'Without the id the email rules are written twice' },
      { label: 'With the id', call: 'z.toJSONSchema(Contact, { metadata: ids })', make: () => z.toJSONSchema(Contact, { metadata: ids }), say: 'The id "email" became a definition and both fields point to it', tone: 'ok' },
    ],
    {
      code: `const ids = z.registry<{ id?: string }>()
const Email = z.email().register(ids, { id: 'email' })
const Contact = z.object({
  owner: Email,
  billing: Email,
  note: z.string(),
})`,
      short: "Email = z.email().register(ids, { id: 'email' })",
      menu: 'metadata',
    },
  );
  return stage.dispose;
};

export default mount;
