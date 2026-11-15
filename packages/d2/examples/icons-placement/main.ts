// Icons sit top-left on containers and centred on leaf shapes.
import type { Mount } from '@/types.ts';
import { icons } from '../../shared/icons.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Nested containers',
        options: { themeID: 0 },
        code: `vpc: VPC {
  icon: "${icons.cloud}"
  style: {
    stroke: green
    font-color: green
    fill: white
  }
  az: Zone A {
    style: {
      stroke: blue
      font-color: blue
      stroke-dash: 3
      fill: white
    }
    ec2: Instance {
      icon: "${icons.server}"
    }
  }
}
`,
      },
      {
        label: 'Leaf shape only',
        code: `ec2: Instance {
  icon: "${icons.server}"
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
