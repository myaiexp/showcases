// Animated connections also work in sketch mode: `animated` is in the SVG.
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      {
        label: 'Animated, sketch on',
        code: `direction: right
local: {code}
github: {dev -> master}
aws: {builders -> s3}
local.code -> github.dev: commit {style.animated: true}
github.master -> aws.builders: build {style.animated: true}
`,
        options: { sketch: true },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
