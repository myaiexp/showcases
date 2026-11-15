// A loader that catches a failure and draws a placeholder icon
import { Infographic, registerResourceLoader } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { loadSVGResource } from '@antv/infographic';
import { installOfflineLoader, offlineResource } from '../../shared/setup.ts';

const PLACEHOLDER =
  '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z" fill="none" stroke="currentColor" stroke-dasharray="3 2"/><path d="M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.8-.9 1.4M12 16v.5"/></svg>';

/** Stands in for a fetch that can fail. */
async function fetchIcon(name: string) {
  if (name.startsWith('broken-')) throw new Error('404: ' + name);
  return offlineResource({ source: 'custom', scene: 'icon', data: name });
}

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'all three icons load',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title Icons
  lists
    - label rocket
      desc icon rocket
      icon rocket
    - label bolt
      desc icon bolt
      icon bolt
    - label heart
      desc icon heart
      icon heart`,
  },
  {
    say: 'broken-chart throws: placeholder in its place',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title Icons
  lists
    - label rocket
      desc icon rocket
      icon rocket
    - label broken-chart
      desc icon broken-chart
      icon broken-chart
    - label heart
      desc icon heart
      icon heart`,
  },
  {
    say: 'every name breaks: three placeholders',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title Icons
  lists
    - label broken-one
      desc icon broken-one
      icon broken-one
    - label broken-two
      desc icon broken-two
      icon broken-two
    - label broken-three
      desc icon broken-three
      icon broken-three`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  registerResourceLoader(async (config) => {
    try {
      return await fetchIcon(config.data);
    } catch {
      return loadSVGResource(PLACEHOLDER);
    }
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
