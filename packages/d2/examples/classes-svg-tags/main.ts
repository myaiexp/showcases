// Classes written into the rendered SVG as class attributes
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    onRender: (_result, svg, variant) => {
      const found = new Set<string>();
      for (const node of svg.querySelectorAll('[class]')) {
        for (const name of node.getAttribute('class')!.split(/\s+/)) if (name === 'stuff' || name === 'other') found.add(name);
      }
      stage.say('class attributes in the SVG: ' + [...found].join(', '));
    },
    variants: [
      {
        label: 'Three tagged shapes',
        code: `direction: right
classes: {
  stuff: {style.fill: "#7dd3fc"}
  other: {style.fill: "#fca5a5"}
}
a.class: stuff
b.class: [stuff; other]
c.class: other
a -> b -> c
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
