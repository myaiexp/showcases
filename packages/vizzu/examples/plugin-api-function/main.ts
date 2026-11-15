// Vizzu example: a plugin api function called from outside as chart.feature.<plugin name>.<function>()
import Vizzu from 'vizzu';
import type { Config, Plugins } from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';
import { overlay } from '../../shared/overlay.ts';

interface ExamplePluginApi extends Plugins.PluginApi {
  hasDefaultTitle(): boolean;
}

class ExamplePlugin implements Plugins.Plugin {
  meta: Plugins.PluginMeta = { name: 'examplePlugin', version: '0.18.0', depends: [] };
  private hasChanged = false;

  get hooks(): Plugins.PluginHooks {
    return {
      prepareAnimation: (ctx: Plugins.PrepareAnimationContext, next: () => void): void => {
        const keyframe = Array.isArray(ctx.target) ? ctx.target[0]?.target : undefined;
        const config: Config.Chart | undefined =
          keyframe && 'config' in keyframe ? keyframe.config : undefined;
        if (config) {
          const first = config.channels?.color?.set?.[0];
          if (first) {
            config.title = typeof first === 'string' ? first : first.name;
            this.hasChanged = true;
          } else {
            config.title = 'Example plugin';
            this.hasChanged = false;
          }
        }
        next();
      },
    };
  }

  // Callable from outside: chart.feature.examplePlugin.hasDefaultTitle()
  get api(): ExamplePluginApi {
    return { hasDefaultTitle: (): boolean => !this.hasChanged };
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;
  chart.feature(new ExamplePlugin(), true);
  const show = overlay(stage.element);

  // The Features type knows built-in plugins only; a plugin's api comes back as PluginApi.
  const report = (): void => {
    const api = chart.feature.examplePlugin as ExamplePluginApi;
    show(`hasDefaultTitle(): ${api.hasDefaultTitle()}`);
  };

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
  report();

  stage.story(chart, [
    {
      say: 'No color series: the title is still the default',
      run: (c) => c.animate({ config: { channels: { color: { set: null } } } }).then(report),
    },
    {
      say: 'Kinds on color: the plugin changed the title',
      run: (c) => c.animate({ config: { channels: { color: { set: ['Kinds'] } } } }).then(report),
    },
    {
      say: 'Color cleared: the default title is back',
      run: (c) => c.animate({ config: { channels: { color: { set: null } } } }).then(report),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
