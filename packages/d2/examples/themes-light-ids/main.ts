// The same diagram compiled with four different `themeID` values.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the source or switch tabs. The theme is a compile option (themeID), shown under the diagram.' });
  playground(stage, {
    options: {},
    variants: [
      {
        label: 'themeID 0 (the default)',
        code: `direction: right
client: Client {shape: person}
shop: Shop {
  api
  db: {shape: cylinder}
  api -> db
}
orders: {
  shape: sql_table
  id: int {constraint: primary_key}
  total: float
}
client -> shop.api
shop.db -> orders
`,
        options: { themeID: 0 },
      },
      {
        label: 'themeID 6 (Grape soda)',
        code: `direction: right
client: Client {shape: person}
shop: Shop {
  api
  db: {shape: cylinder}
  api -> db
}
orders: {
  shape: sql_table
  id: int {constraint: primary_key}
  total: float
}
client -> shop.api
shop.db -> orders
`,
        options: { themeID: 6 },
      },
      {
        label: 'themeID 100 (Vanilla nitro cola)',
        code: `direction: right
client: Client {shape: person}
shop: Shop {
  api
  db: {shape: cylinder}
  api -> db
}
orders: {
  shape: sql_table
  id: int {constraint: primary_key}
  total: float
}
client -> shop.api
shop.db -> orders
`,
        options: { themeID: 100 },
      },
      {
        label: 'themeID 104',
        code: `direction: right
client: Client {shape: person}
shop: Shop {
  api
  db: {shape: cylinder}
  api -> db
}
orders: {
  shape: sql_table
  id: int {constraint: primary_key}
  total: float
}
client -> shop.api
shop.db -> orders
`,
        options: { themeID: 104 },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
