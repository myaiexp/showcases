// getTheme(dark) spread into a registered showcase-dark-gold theme
import { Infographic, getTheme, registerTheme } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';


registerTheme('showcase-dark-gold', {
  ...getTheme('dark'),
  colorPrimary: '#F5C542',
  title: { fill: '#F5C542', 'font-weight': 'bold' },
});

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'theme dark',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
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
    say: 'theme showcase-dark-gold (title and primary changed)',
    syntax: `infographic list-row-simple-horizontal-arrow
theme showcase-dark-gold
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
    say: 'showcase-dark-gold plus palette lines',
    syntax: `infographic list-row-simple-horizontal-arrow
theme showcase-dark-gold
  palette
    - #F5C542
    - #F59E0B
    - #FB7185
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
  if (code) code.textContent = JSON.stringify(getTheme('showcase-dark-gold'), null, 2);

  return () => {
    stage.dispose();
  };
};

export default mount;
