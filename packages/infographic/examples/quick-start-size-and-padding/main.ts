// update() with width, height and padding: how the SVG sits in its container
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = `
infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Step 1
      desc Start
    - label Step 2
      desc In Progress
    - label Step 3
      desc Complete`;

const SIZES = [
  { say: "width: '100%', height: '100%'", options: { width: '100%', height: '100%', padding: 8 } },
  { say: 'width: 220, height: 140 (pixels)', options: { width: 220, height: 140, padding: 8 } },
  { say: "width: '100%', padding: [40, 4, 40, 4]", options: { width: '100%', height: '100%', padding: [40, 4, 40, 4] } },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 360 });
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: 8 }),
  );
  infographic.render(SYNTAX);

  stage.cycle(
    SIZES.map((step) => ({
      say: step.say,
      run: () => infographic.update(step.options),
    })),
  );

  return () => stage.dispose();
};

export default mount;
