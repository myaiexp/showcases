// A `vars` map defines values and `${name}` substitutes them; `.` nests.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'server-name',
        code: `direction: right
vars: {
  server-name: Cat
}

server1: \${server-name}-1
server2: \${server-name}-2

server1 <-> server2
`,
      },
      {
        label: 'Nested primaryColors.button.*',
        code: `vars: {
  primaryColors: {
    button: {
      active: "#4baae5"
      border: black
    }
  }
}

button: {
  width: 100
  height: 40
  style: {
    border-radius: 5
    fill: \${primaryColors.button.active}
    stroke: \${primaryColors.button.border}
  }
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
