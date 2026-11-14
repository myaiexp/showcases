// A recursive schema via a getter: one definition validates a tree of any depth
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { pathText } from '../../shared/paths.ts';
import { createStage } from '../../shared/stage.ts';

const Category = z.object({
  name: z.string(),
  get subcategories() {
    return z.array(Category);
  },
});

const leaf = (name: unknown) => ({ name, subcategories: [] });
const tree = (sencha: unknown, black: object) => ({
  name: 'Tea',
  subcategories: [{ name: 'Green', subcategories: [leaf(sencha)] }, black],
});

const SAMPLES = [
  { label: 'valid tree', value: tree('Sencha', leaf('Black')) },
  { label: 'name is a number', value: tree(42, leaf('Black')) },
  { label: 'list left out', value: tree('Sencha', { name: 'Black' }) },
];

const count = (c: { subcategories?: unknown[] }): number => 1 + (c.subcategories ?? []).reduce<number>((n, s) => n + count(s as { subcategories?: unknown[] }), 0);

const VARIANTS: ObjectVariant[] = [
  {
    label: 'Category',
    code: 'Category = z.object({ name, get subcategories() { return z.array(Category) } })',
    schema: Category,
    say: (r) =>
      r.success
        ? `✓ ${count(r.data as { subcategories: unknown[] })} categories, all valid`
        : `✗ The problem is at ${pathText(r.error.issues[0]!.path)}`,
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Break a name or delete a subcategories list, however deep.' });
  objectLab(stage, VARIANTS, SAMPLES, {
    plan: [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
  });
  return stage.dispose;
};

export default mount;
