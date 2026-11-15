// A `&` line in a glob block limits it to matching shapes; `!&` inverts.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: '&shape: person',
        code: `bravo team.shape: person
charlie team.shape: person
command center.shape: cloud
hq.shape: rectangle

*: {
  &shape: person
  style.multiple: true
}
`,
      },
      {
        label: '!&shape: person',
        code: `bravo team.shape: person
charlie team.shape: person
command center.shape: cloud
hq.shape: rectangle

*: {
  !&shape: person
  style.multiple: true
}
`,
      },
      {
        label: '&class on an array',
        code: `classes: {
  server: {style.fill: "#7dd3fc"}
  deployed: {style.stroke: lime}
  internal: {style.stroke: orange}
}
the-little-cannon: {
  class: [server; deployed]
}
dino: {
  class: [internal; deployed]
}
catapult: {
  class: [server]
}

*: {
  &class: server
  style.multiple: true
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
