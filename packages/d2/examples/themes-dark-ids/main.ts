// Dark themes are plain theme IDs: 200 is Dark Mauve, 201 Dark Flagship.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: {},
    variants: [
      {
        label: 'themeID 200 (Dark Mauve)',
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
        options: { themeID: 200 },
      },
      {
        label: 'themeID 201 (Dark Terrastruct Flagship)',
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
        options: { themeID: 201 },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
