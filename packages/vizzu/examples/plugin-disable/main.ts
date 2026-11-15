// Vizzu example: chart.feature(plugin, false) switches a registered plugin off, true switches it back on
import Vizzu from 'vizzu';
import type { Config, Plugins } from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';
import { overlay } from '../../shared/overlay.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;
  const show = overlay(stage.element);

  class TitlePlugin implements Plugins.Plugin {
    meta: Plugins.PluginMeta = { name: 'titlePlugin', version: '0.18.0', depends: [] };

    // Vizzu calls enable() whenever the plugin is switched on or off.
    enable(enabled: boolean): void {
      show(`titlePlugin: ${enabled ? 'enabled' : 'disabled'}`);
    }

    get hooks(): Plugins.PluginHooks {
      return {
        prepareAnimation: (ctx: Plugins.PrepareAnimationContext, next: () => void): void => {
          const keyframe = Array.isArray(ctx.target) ? ctx.target[0]?.target : undefined;
          const config: Config.Chart | undefined =
            keyframe && 'config' in keyframe ? keyframe.config : undefined;
          if (config) {
            const first = config.channels?.color?.set?.[0];
            config.title = first ? (typeof first === 'string' ? first : first.name) : 'Example plugin';
          }
          next();
        },
      };
    }
  }

  const plugin = new TitlePlugin();
  chart.feature(plugin, true);

  await chart.animate({
    data: musicData,
    config: {
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  // Whether a plugin is on is not part of the chart state the rewind restores, so the story ends with it on.
  stage.story(chart, [
    {
      say: 'Plugin on: Kinds on color sets the title to "Kinds"',
      run: (c) => c.animate({ config: { channels: { color: { set: ['Kinds'] } } } }),
    },
    {
      say: 'feature(plugin, false): Genres on color, the title stays "Kinds"',
      run: (c) => {
        c.feature(plugin, false);
        return c.animate({ config: { channels: { color: { set: ['Genres'] } } } });
      },
    },
    {
      say: 'feature(plugin, true) and the color cleared: the plugin sets its default title',
      run: (c) => {
        c.feature(plugin, true);
        return c.animate({ config: { channels: { color: { set: null } } } });
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
