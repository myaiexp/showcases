// Vizzu example: hook priority, from 0 (last) to 1 (first), decides the order registered plugins run
import Vizzu from 'vizzu';
import type { Config, Plugins } from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

/** Appends its label to the title, so the title shows the order the hooks ran in. */
class TagPlugin implements Plugins.Plugin {
  meta: Plugins.PluginMeta;
  private label: string;
  /** undefined means no priority, which counts as 0. */
  priority: number | undefined;

  constructor(name: string, label: string, priority?: number) {
    this.meta = { name, version: '0.18.0', depends: [] };
    this.label = label;
    this.priority = priority;
  }

  get hooks(): Plugins.PluginHooks {
    const hook = (ctx: Plugins.PrepareAnimationContext, next: () => void): void => {
      const keyframe = Array.isArray(ctx.target) ? ctx.target[0]?.target : undefined;
      const config: Config.Chart | undefined = keyframe && 'config' in keyframe ? keyframe.config : undefined;
      if (config) config.title = `${config.title ?? ''} > ${this.label}`;
      next();
    };
    // Vizzu reads the priority property of the function each time hooks are collected.
    return { prepareAnimation: this.priority === undefined ? hook : Object.assign(hook, { priority: this.priority }) };
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // Registered plain first, early last: the title shows they do not run in that order.
  const plain = new TagPlugin('plainTag', 'plain (no priority)');
  const late = new TagPlugin('lateTag', 'late (0.3)', 0.3);
  const early = new TagPlugin('earlyTag', 'early (0.9)', 0.9);
  for (const plugin of [plain, late, early]) chart.feature(plugin, true);

  await chart.animate({
    data: musicData,
    config: { title: 'Start', channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } } },
  });

  stage.story(chart, [
    {
      say: 'Registered plain, late, early: they ran early, late, plain',
      run: (c) => c.animate({ config: { title: 'Hooks ran' } }),
    },
    {
      say: 'Late raised to 0.95: it now runs first',
      run: (c) => {
        late.priority = 0.95;
        return c.animate({ config: { title: 'Hooks ran' } });
      },
    },
    {
      say: 'Late back to 0.3',
      run: (c) => {
        late.priority = 0.3;
        return c.animate({ config: { title: 'Hooks ran' } });
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
