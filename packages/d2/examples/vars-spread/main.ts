// `...${x}` spreads a map or array variable into the place it is written.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Spreading an array and a map',
        code: `vars: {
  base-constraints: [NOT NULL; UNQ]
  disclaimer: DISCLAIMER {
    I am not a lawyer
    near: top-center
  }
}

data: {
  shape: sql_table
  a: int {constraint: [PK; ...\${base-constraints}]}
}

custom-disclaimer: DRAFT DISCLAIMER {
  ...\${disclaimer}
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
