// `font-color` sets the label colour.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'On shapes and connections',
        code: `direction: right
x -> y: hi {
  style: {
    font-color: red
  }
}
x.style.font-color: "#f4a261"
`,
      },
      {
        label: 'On a table and a class',
        code: `direction: right
costumes: {
  shape: sql_table
  id: int {constraint: primary_key}
  silliness: int
  last_updated: timestamp
  style.font-color: "#8AF5B0"
}

parser: {
  shape: class
  -lookahead: "[]rune"
  +peek(): (r rune, eof bool)
  rewind()
  commit()
  style.font-color: "#8AF5B0"
}

costumes -> parser
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
