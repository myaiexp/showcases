// A loader answering showcase:<name> icons from drawn paths
import { Infographic, registerResourceLoader } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { loadSVGResource } from '@antv/infographic';
import { installOfflineLoader, offlineResource } from '../../shared/setup.ts';

// Hand-made 24x24 icons: paths with no fill, so the theme colours them. The xmlns is required:
// loadSVGResource parses XML, and without it nothing is drawn.
const GLYPHS: Record<string, string> = {
  star: 'M12 2l3 7 7 .7-5.3 4.7 1.6 7.1L12 17.6 5.7 21.5l1.6-7.1L2 9.7 9 9z',
  heart: 'M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.7A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z',
  bolt: 'M13 2 4 14h6l-1 8 9-12h-6z',
  leaf: 'M5 19C5 10 10 5 20 5c0 10-5 15-14 15z',
};
const glyph = (d: string) => loadSVGResource('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="' + d + '"/></svg>');

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'icon showcase:star / heart / bolt: drawn by the loader',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Icons
  lists
    - label showcase:star
      desc icon showcase:star
      icon showcase:star
    - label showcase:heart
      desc icon showcase:heart
      icon showcase:heart
    - label showcase:bolt
      desc icon showcase:bolt
      icon showcase:bolt`,
  },
  {
    say: 'icon rocket: not ours, so the offline icons answer',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Icons
  lists
    - label showcase:leaf
      desc icon showcase:leaf
      icon showcase:leaf
    - label rocket
      desc icon rocket
      icon rocket
    - label showcase:star
      desc icon showcase:star
      icon showcase:star`,
  },
  {
    say: 'showcase:unknown has no glyph: falls through too',
    syntax: `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Icons
  lists
    - label showcase:heart
      desc icon showcase:heart
      icon showcase:heart
    - label showcase:unknown
      desc icon showcase:unknown
      icon showcase:unknown
    - label gear
      desc icon gear
      icon gear`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  registerResourceLoader(async (config) => {
    // config.data is the text written after `icon`; claim only our own scheme.
    const name = /^showcase:(.+)$/.exec(config.data)?.[1];
    const d = name ? GLYPHS[name] : undefined;
    return (d ? glyph(d) : null) ?? offlineResource(config);
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
