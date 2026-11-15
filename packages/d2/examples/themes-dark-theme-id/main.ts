// Setting `darkThemeID` next to `themeID` makes the SVG carry both colour sets.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch your system between light and dark: the second tab changes with it, the first does not.' });
  playground(stage, {
    options: {},
    onRender: (_result, svg, variant) => {
      const dual = svg.outerHTML.includes('prefers-color-scheme');
      stage.say(variant.label + (dual ? ': the SVG has a dark-mode media query' : ': no dark-mode media query, one colour set'));
    },
    variants: [
      {
        label: 'themeID 0 only',
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
        label: 'themeID 0, darkThemeID 200',
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
        options: { themeID: 0, darkThemeID: 200 },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
