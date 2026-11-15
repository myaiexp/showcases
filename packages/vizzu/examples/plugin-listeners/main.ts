// Vizzu example: a plugin's listeners getter connects it to chart events while it is enabled
import Vizzu, { Events } from 'vizzu';
import type { Plugins } from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';
import { overlay } from '../../shared/overlay.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Click the chart: the plugin counts it.' });
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;
  const show = overlay(stage.element);

  class CounterPlugin implements Plugins.Plugin {
    meta: Plugins.PluginMeta = { name: 'counterPlugin', version: '0.18.0', depends: [] };
    clicks = 0;
    animations = 0;

    // Registered with the chart when the plugin is enabled, removed when it is disabled.
    get listeners(): Plugins.PluginListeners {
      return {
        [Events.EventType.pointerup]: (): void => {
          this.clicks++;
          this.report();
        },
        [Events.EventType.animationComplete]: (): void => {
          this.animations++;
          this.report();
        },
      };
    }

    report(): void {
      show(`pointerup ${this.clicks}\nanimation-complete ${this.animations}`);
    }
  }

  const counter = new CounterPlugin();
  chart.feature(counter, true);
  counter.report();

  await chart.animate({
    data: musicData,
    config: {
      title: stage.preview ? 'Listeners count animations (clicks need the full view)' : 'The plugin counts clicks and animations',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: 'Kinds side by side: animation-complete reaches the plugin',
      run: (c) => c.animate({ config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } }),
    },
    {
      say: 'Stacked again: the count goes up',
      run: (c) => c.animate({ config: { channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
