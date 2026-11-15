// primary_key, foreign_key and unique shorten to PK, FK and UNQ.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Recognised',
        code: `t: {
  shape: sql_table
  a: int {constraint: primary_key}
  b: int {constraint: foreign_key}
  c: int {constraint: unique}
}
`,
      },
      {
        label: 'Any text',
        code: `t: {
  shape: sql_table
  a: int {constraint: not_null}
  b: int {constraint: "check (b > 0)"}
}
`,
      },
      {
        label: 'Several constraints',
        code: `t: {
  shape: sql_table
  x: int { constraint: [primary_key; unique] }
  y: int { constraint: [foreign_key; not_null] }
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
