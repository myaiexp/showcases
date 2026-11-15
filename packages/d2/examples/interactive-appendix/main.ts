// `forceAppendix` numbers tooltips and links in a table under the diagram.
// This is how D2 exports to formats without hover or click.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Normal',
        code: `x: {tooltip: Secondary context for x}
y: {link: https://example.com}
x -> y
`,
      },
      {
        label: 'forceAppendix: true',
        code: `x: {tooltip: Secondary context for x}
y: {link: https://example.com}
x -> y
`,
        options: { forceAppendix: true },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
