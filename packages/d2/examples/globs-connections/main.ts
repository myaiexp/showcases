// A glob can be one end or both ends of a connection.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: '* -> *',
        code: `Spiderman 1
Spiderman 2
Spiderman 3

* -> *: 👉
`,
        options: { layout: "elk" },
      },
      {
        label: '(lady* -> barbie)[*]',
        code: `direction: right
lady 1
lady 2

barbie

lady 1 -> barbie: hi barbie
lady 2 -> barbie: hi barbie

(lady* -> barbie)[*].style.stroke: pink
(lady* -> barbie)[*].style.stroke-width: 4
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
