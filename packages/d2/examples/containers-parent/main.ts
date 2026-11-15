// _ names the enclosing container from inside it.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Tour example',
        options: { themeID: 0 },
        code: `direction: right
christmas: {
  presents
}
birthdays: {
  presents
  _.christmas.presents -> presents: regift
  _.christmas.style.fill: "#ACE1AF"
}
`,
      },
      {
        label: 'Without the underscore',
        code: `direction: right
christmas: {
  presents
}
birthdays: {
  presents
  christmas.presents -> presents: new shapes
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
