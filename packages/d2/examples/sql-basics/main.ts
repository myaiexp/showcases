// shape: sql_table turns each key into a row with a type and constraint.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Minimal table',
        code: `my_table: {
  shape: sql_table
  id: int {constraint: primary_key}
  last_updated: timestamp with time zone
}
`,
      },
      {
        label: 'More columns',
        code: `users: {
  shape: sql_table
  id: int {constraint: primary_key}
  email: varchar {constraint: unique}
  name: text
  created_at: timestamp
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
