// The `sketch` option redraws outlines by hand and uses a handwriting font.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'sketch: false',
        code: `direction: right
client: Client {shape: person}
api: API {shape: hexagon}
db: Orders {shape: cylinder}
tbl: {
  shape: sql_table
  id: int {constraint: primary_key}
  total: float
}
client -> api: request
api -> db: query
db -> tbl
`,
        options: { sketch: false },
      },
      {
        label: 'sketch: true',
        code: `direction: right
client: Client {shape: person}
api: API {shape: hexagon}
db: Orders {shape: cylinder}
tbl: {
  shape: sql_table
  id: int {constraint: primary_key}
  total: float
}
client -> api: request
api -> db: query
db -> tbl
`,
        options: { sketch: true },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
