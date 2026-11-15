// The built-in dark theme applied to two different infographics
import { getTheme, Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SPECS = [
  {
    say: 'a list-row',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title Roadmap
  lists
    - label Plan
      desc Scope it
    - label Build
      desc Make it
    - label Ship
      desc Release it`,
  },
  {
    say: 'a hierarchy tree',
    syntax: `infographic hierarchy-tree-curved-line-rounded-rect-node
theme dark
data
  title Product
  root
    label Product
    children
      - label Web
        children
          - label Docs
          - label App
      - label Mobile`,
  },
  {
    say: 'a compare',
    syntax: `infographic compare-binary-horizontal-simple-fold
theme dark
data
  compares
    - label Before
      children
        - label Slow
        - label Manual
    - label After
      children
        - label Fast
        - label Automatic`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side("getTheme('dark')");
  if (side) side.textContent = JSON.stringify(getTheme('dark'), null, 2);
  const infographic = stage.own(new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }));

  stage.cycle(
    SPECS.map(({ say, syntax }) => ({
      say: `theme dark: ${say}`,
      run: () => infographic.render(syntax),
    })),
  );
  return () => stage.dispose();
};

export default mount;
