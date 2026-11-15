// On `sql_table` and `class`, `fill` paints the header and `stroke` the body.
// `fill` is already taken by the header.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Header fill',
        code: `direction: right
users: {
  shape: sql_table
  id: int {constraint: primary_key}
  name: varchar
  style.fill: "#f4a261"
}
Cache: {
  shape: class
  -items: map
  +get(key): value
  style.fill: "#f4a261"
}
users -> Cache
`,
      },
      {
        label: 'Header fill and body stroke',
        code: `direction: right
users: {
  shape: sql_table
  id: int {constraint: primary_key}
  name: varchar
  style.fill: "#f4a261"
  style.stroke: "#264653"
}
Cache: {
  shape: class
  -items: map
  +get(key): value
  style.fill: "#f4a261"
  style.stroke: "#264653"
}
users -> Cache
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
