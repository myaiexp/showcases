// A loader that branches on config.scene for icons and illustrations
import { Infographic, registerResourceLoader } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { loadSVGResource } from '@antv/infographic';
import { installOfflineLoader, offlineResource } from '../../shared/setup.ts';

// An illustration is a bigger drawing, so it gets a 200x120 viewBox and fixed colours.
const SCENES: Record<string, string> = {
  sunrise:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"><rect width="200" height="120" rx="8" fill="#FDBA74"/><circle cx="100" cy="80" r="34" fill="#FEF3C7"/><path d="M0 120V92Q50 70 100 92T200 88V120z" fill="#9A3412"/></svg>',
  night:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"><rect width="200" height="120" rx="8" fill="#1E1B4B"/><circle cx="150" cy="34" r="16" fill="#E0E7FF"/><circle cx="40" cy="30" r="2" fill="#fff"/><circle cx="90" cy="52" r="2" fill="#fff"/><path d="M0 120V96Q60 74 120 98T200 92V120z" fill="#312E81"/></svg>',
};
const DOT = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg>';

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'illus sunrise and night, drawn by the loader',
    syntax: `infographic list-row-simple-illus
theme dark
data
  title Scenes
  lists
    - label Morning
      desc illus sunrise
      illus sunrise
    - label Evening
      desc illus night
      illus night`,
  },
  {
    say: 'icon dot is ours; illus sunrise too',
    syntax: `infographic list-row-simple-illus
theme dark
data
  title Mixed
  lists
    - label Dot
      desc icon dot
      illus night
      icon dot
    - label Sun
      desc illus sunrise
      illus sunrise
      icon star`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  registerResourceLoader(async (config) => {
    if (config.scene === 'illus' && SCENES[config.data]) return loadSVGResource(SCENES[config.data] as string);
    if (config.scene === 'icon' && config.data === 'dot') return loadSVGResource(DOT);
    return offlineResource(config);
  });
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
    // The loader is page-wide: put the gallery's own back.
    installOfflineLoader();
    stage.dispose();
  };
};

export default mount;
