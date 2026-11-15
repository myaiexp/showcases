// A caching resource loader with a visible hit and load count
import { Infographic, registerResourceLoader } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { installOfflineLoader, offlineResource } from '../../shared/setup.ts';

const cache = new Map<string, SVGSymbolElement>();

// Each step is a whole infographic syntax; the instance re-renders with the next one.
const STEPS = [
  {
    say: 'first render: every icon is loaded',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title Icons
  lists
    - label anchor
      desc icon anchor
      icon anchor
    - label compass
      desc icon compass
      icon compass
    - label map
      desc icon map
      icon map`,
  },
  {
    say: 'the same render again: served from the cache',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title Icons
  lists
    - label anchor
      desc icon anchor
      icon anchor
    - label compass
      desc icon compass
      icon compass
    - label map
      desc icon map
      icon map`,
  },
  {
    say: 'one new name: one more load',
    syntax: `infographic list-row-simple-horizontal-arrow
theme dark
data
  title Icons
  lists
    - label anchor
      desc icon anchor
      icon anchor
    - label compass
      desc icon compass
      icon compass
    - label flag
      desc icon flag
      icon flag`,
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const log = stage.side('Loader');
  let loads = 0;
  let hits = 0;
  registerResourceLoader(async (config) => {
    const key = (config.scene ?? 'icon') + ':' + config.data;
    const cached = cache.get(key);
    if (cached) {
      hits += 1;
      if (log) log.textContent = 'loads ' + loads + ' · cache hits ' + hits + '\nlast: ' + key + ' (hit)';
      return cached.cloneNode(true) as SVGSymbolElement;
    }
    loads += 1;
    const resource = offlineResource(config);
    if (resource) cache.set(key, resource.cloneNode(true) as SVGSymbolElement);
    if (log) log.textContent = 'loads ' + loads + ' · cache hits ' + hits + '\nlast: ' + key + ' (loaded)';
    return resource;
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
    cache.clear();
    stage.dispose();
  };
};

export default mount;
