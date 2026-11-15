// `bold`, `italic` and `underline` are booleans for the label.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Underlined x, italic y',
        code: `direction: right
x -> y: hi {
  style: {
    bold: true
  }
}
x.style.underline: true
y.style.italic: true
# By default, shape labels are bold. Bold has precedence over italic, so unbold to see
# italic style
y.style.bold: false
`,
      },
      {
        label: 'Italic without unbolding',
        code: `direction: right
x -> y: hi {style.italic: true}
x.style.italic: true
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
