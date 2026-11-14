// Three schemas drawn from their _zod.def as an indented tree
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { defTree, drawTree, treeSize } from '../../shared/def-tree.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const SIGN_UP = z.object({
  username: z.string().min(3),
  email: z.email(),
  plan: z.enum(['free', 'pro']),
  tags: z.array(z.string()),
});

const ORDER = z.object({
  id: z.uuid(),
  total: z.number().min(0).multipleOf(0.01),
  contact: z.union([z.email(), z.e164()]),
  note: z.string().optional(),
});

const SETTINGS = z.object({
  theme: z.string().default('dark'),
  size: z.tuple([z.int(), z.int()]),
  scale: z.string().pipe(z.coerce.number<string>()),
});

const SCHEMAS = [
  { label: 'Sign-up', code: 'z.object({ username, email, plan, tags })', schema: SIGN_UP },
  { label: 'Order', code: 'z.object({ id, total, contact, note })', schema: ORDER },
  { label: 'Settings', code: 'z.object({ theme, size, scale })', schema: SETTINGS },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each row is a node read from schema._zod.def; rows marked check are entries of def.checks.' });
  const code = codeLine(stage.root, '');
  const holder = document.createElement('div');
  stage.root.append(holder);
  const at = stage.cycle(SCHEMAS, 4200, (s) => {
    code.textContent = s.code;
    const tree = defTree(s.schema);
    holder.replaceChildren(
      drawTree(tree, (row, i) => {
        if (!stage.preview) return;
        row.style.opacity = '0';
        stage.after(i * 160, () => row.animate([{ opacity: 0, transform: 'translateX(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 220, fill: 'forwards' }));
      }),
    );
    stage.say(`${treeSize(tree)} nodes, every one found by reading def.type and its slots`, 'info');
  });
  if (stage.bar) select(stage.bar, 'Schema', SCHEMAS.map((s, i) => [i, s.label] as const), (i) => at(i));
  return stage.dispose;
};

export default mount;
