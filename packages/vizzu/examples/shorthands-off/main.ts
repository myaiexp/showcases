// Vizzu example: chart.feature('shorthands', false) leaves only the long form of animate() working
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: musicData,
    config: {
      title: 'Shorthands are on',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } },
    },
  });

  const pre = stage.side();
  const report = (lines: string[]): void => {
    if (pre) pre.textContent = lines.join('\n');
  };

  // Whether a feature is on is not part of a snapshot, and the rewind itself needs shorthands
  // (it passes a snapshot, not a list of keyframes), so the last step switches them back on.
  stage.story(chart, [
    {
      say: "Shorthands on: animate({ x: 'Kinds' }) works",
      run: (c) => {
        report(['shorthands: on', '', "animate({ x: 'Kinds' })"]);
        return c.animate({ title: 'Shorthand: x as a bare name', x: 'Kinds', y: ['Popularity', 'Genres'] });
      },
    },
    {
      say: "chart.feature('shorthands', false): only keyframes with { name } series objects",
      run: (c) => {
        c.feature('shorthands', false);
        report([
          'shorthands: off',
          '',
          'animate([{ target: { config: {...} } }])',
          'series as { name: "Genres" } objects',
          '',
          'A bare config object would throw:',
          '"t is not iterable"',
        ]);
        return c.animate([
          {
            target: {
              config: {
                title: 'Shorthands off: the long form',
                channels: { x: { set: [{ name: 'Genres' }] }, y: { set: [{ name: 'Popularity' }, { name: 'Kinds' }] } },
              },
            },
          },
        ]);
      },
    },
    {
      say: "chart.feature('shorthands', true): shorthands again",
      run: (c) => {
        c.feature('shorthands', true);
        report(['shorthands: on', '', "animate({ title: '...' })"]);
        return c.animate({ title: 'Shorthands are on again' });
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
