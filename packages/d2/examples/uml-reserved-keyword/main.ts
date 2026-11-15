// Quote a member named label to keep it a field.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Quoted: a field',
        code: `my_class: {
  shape: class
  "label": string
}
`,
      },
      {
        label: 'Unquoted: the class label',
        code: `my_class: {
  shape: class
  label: Renamed
  other: string
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
