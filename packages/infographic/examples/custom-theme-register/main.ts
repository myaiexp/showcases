// registerTheme(name, config), then theme <name> in the syntax
import { Infographic, registerTheme } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';


registerTheme('showcase-ember', {
  colorBg: '#2A1410',
  colorPrimary: '#FF7A45',
  base: { text: { fill: '#FFE4D6' } },
});
registerTheme('showcase-lagoon', {
  colorBg: '#08232B',
  colorPrimary: '#2DD4BF',
  base: { text: { fill: '#D7FBF5' } },
});

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'theme showcase-ember',
    syntax: `infographic list-row-horizontal-icon-arrow
theme showcase-ember
data
  title Garden
  lists
    - label Seed
      desc Plant it
      icon seedling
    - label Water
      desc Keep it damp
      icon droplet
    - label Sun
      desc Give it light
      icon sun
    - label Harvest
      desc Pick it
      icon wheat-awn`,
  },
  {
    say: 'theme showcase-lagoon',
    syntax: `infographic list-row-horizontal-icon-arrow
theme showcase-lagoon
data
  title Garden
  lists
    - label Seed
      desc Plant it
      icon seedling
    - label Water
      desc Keep it damp
      icon droplet
    - label Sun
      desc Give it light
      icon sun
    - label Harvest
      desc Pick it
      icon wheat-awn`,
  },
  {
    say: 'theme showcase-ember with colorPrimary #A3E635 under it',
    syntax: `infographic list-row-horizontal-icon-arrow
theme showcase-ember
  colorPrimary #A3E635
data
  title Garden
  lists
    - label Seed
      desc Plant it
      icon seedling
    - label Water
      desc Keep it damp
      icon droplet
    - label Sun
      desc Give it light
      icon sun
    - label Harvest
      desc Pick it
      icon wheat-awn`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
    }),
  );
  const code = stage.side('Syntax');

  stage.cycle(
    STEPS.map((step) => ({
      say: step.say,
      run: () => {
        infographic.render(step.syntax);
        if (code) code.textContent = step.syntax;
      },
    })),
  );

  return () => {
    stage.dispose();
  };
};

export default mount;
