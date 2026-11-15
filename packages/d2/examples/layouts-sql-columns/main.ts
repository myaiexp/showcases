// ELK routes to the named `sql_table` column; dagre ends at the table edge.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'elk',
        code: `direction: right
orders: {
  shape: sql_table
  id: int {constraint: primary_key}
  user_id: int {constraint: foreign_key}
  total: float
}
users: {
  shape: sql_table
  id: int {constraint: primary_key}
  name: varchar
}
orders.user_id -> users.id
`,
        options: { layout: "elk" },
      },
      {
        label: 'dagre',
        code: `direction: right
orders: {
  shape: sql_table
  id: int {constraint: primary_key}
  user_id: int {constraint: foreign_key}
  total: float
}
users: {
  shape: sql_table
  id: int {constraint: primary_key}
  name: varchar
}
orders.user_id -> users.id
`,
        options: { layout: "dagre" },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
