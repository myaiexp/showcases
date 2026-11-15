// Vizzu example: chart.config shows what each channel holds after attach and detach
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // The series names on a channel, read from chart.config.
  const names = (channel: 'x' | 'y' | 'color'): string => {
    const set = chart.config.channels?.[channel]?.set;
    return set && set.length ? set.map((s: { name: string }) => s.name).join(' + ') : '(empty)';
  };
  const describe = (): string => `x: ${names('x')}  |  y: ${names('y')}  |  color: ${names('color')}`;

  const pre = stage.side();
  const show = (): void => {
    if (pre) pre.textContent = `chart.config.channels\n\n${describe().split('  |  ').join('\n')}`;
    stage.say(describe());
  };

  await chart.animate({
    data: musicData,
    config: { channels: { x: { set: ['Genres'] }, y: { set: ['Popularity'] } } },
  });
  show();

  stage.story(chart, [
    {
      say: 'attach Kinds to y and color',
      run: (c) =>
        c
          .animate({ config: { channels: { y: { attach: ['Kinds'] }, color: { attach: ['Kinds'] } } } })
          .then(show),
    },
    {
      say: 'detach Kinds from y',
      run: (c) => c.animate({ config: { channels: { y: { detach: ['Kinds'] } } } }).then(show),
    },
  ]);
  return () => stage.dispose();
};

export default mount;

