// Vizzu example: a plugin whose prepareAnimation hook titles the chart after its color series
import Vizzu from 'vizzu';
import type { Config, Plugins } from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

/** The docs' plugin: the title becomes the series on color, or a default when there is none. */
class ExamplePlugin implements Plugins.Plugin {
  meta: Plugins.PluginMeta = { name: 'examplePlugin', version: '0.18.0', depends: [] };

  get hooks(): Plugins.PluginHooks {
    return {
      prepareAnimation: (ctx: Plugins.PrepareAnimationContext, next: () => void): void => {
        // By now the shorthands plugin has turned animate()'s argument into a list of keyframes.
        const keyframe = Array.isArray(ctx.target) ? ctx.target[0]?.target : undefined;
        const config: Config.Chart | undefined = keyframe && 'config' in keyframe ? keyframe.config : undefined;
        // A stored snapshot has no config to edit: leave those animations alone.
        if (config) {
          const color = config.channels?.color;
          const first = color?.set?.[0];
          config.title = first ? (typeof first === 'string' ? first : first.name) : 'Example plugin';
        }
        next();
      },
    };
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;
  // feature(plugin, true) registers the plugin and switches it on; detach() unregisters it.
  chart.feature(new ExamplePlugin(), true);

  await chart.animate({
    data: musicData,
    config: { channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    {
      say: 'No color series: the plugin put its default title on the chart',
      run: (c) => c.animate({ config: { channels: { color: { set: null } } } }),
    },
    {
      say: 'Kinds on color: the plugin set the title to "Kinds"',
      run: (c) => c.animate({ config: { channels: { color: { set: ['Kinds'] } } } }),
    },
    {
      say: 'Genres on color: the title follows',
      run: (c) => c.animate({ config: { channels: { color: { set: ['Genres'] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
