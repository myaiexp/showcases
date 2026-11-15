// .keyof(): an enum of an object's field names, to validate a sort-by column
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { schemaTour, type Variant } from '../../shared/schema-tour.ts';

const Account = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  passwordHash: z.string(),
});

const AllColumns = Account.keyof();
const Sortable = Account.omit({ passwordHash: true }).keyof();

const VARIANTS: Variant[] = [
  { label: 'Account.keyof()', code: 'Account.keyof()', schema: AllColumns, say: `Allowed: ${AllColumns.options.join(', ')}` },
  { label: 'Account.omit(…).keyof()', code: 'Account.omit({ passwordHash: true }).keyof()', schema: Sortable, say: `Allowed: ${Sortable.options.join(', ')}` },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two enums made from one object: leaving a key out first keeps it off the list.' });
  schemaTour(stage, VARIANTS, {
    inputs: ['name', 'email', 'passwordHash', 'Name', 'phone'],
    inTitle: '?sort=',
    noun: 'column names',
  });
  return stage.dispose;
};

export default mount;
