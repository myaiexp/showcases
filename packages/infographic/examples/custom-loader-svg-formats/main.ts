// loadSVGResource given an svg string, a symbol string and junk
import { Infographic, registerResourceLoader } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { loadSVGResource } from '@antv/infographic';
import { installOfflineLoader, offlineResource } from '../../shared/setup.ts';

const SOURCES: Record<string, string> = {
  'fmt:svg': '<svg viewBox="0 0 24 24"><path d="M12 3 21 20H3z"/></svg>',
  'fmt:symbol': '<symbol viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/></symbol>',
  'fmt:junk': 'this is not svg at all',
};

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'fmt:svg: an <svg> string',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title Icons
  lists
    - label fmt:svg
      desc icon fmt:svg
      icon fmt:svg`,
  },
  {
    say: 'fmt:symbol: a <symbol> string',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title Icons
  lists
    - label fmt:symbol
      desc icon fmt:symbol
      icon fmt:symbol`,
  },
  {
    say: 'fmt:junk: not SVG, loadSVGResource gives null',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title Icons
  lists
    - label fmt:junk
      desc icon fmt:junk
      icon fmt:junk`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  registerResourceLoader(async (config) => {
    const text = SOURCES[config.data];
    // null when the text cannot be parsed: then the offline icons answer.
    return (text ? loadSVGResource(text) : null) ?? offlineResource(config);
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
