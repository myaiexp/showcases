// Vizzu example: new Vizzu('<id>') finds its placeholder by id
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // The tutorial gives its placeholder div an id; several cards can be mounted at once, so this one is unique.
  stage.element.id = `vz-${crypto.randomUUID()}`;
  const chart = stage.own(new Vizzu(stage.element.id, { style: darkStyle }));

  // The tutorial's form: initializing resolves with the chart, ready for its first animate().
  await chart.initializing.then((c) =>
    c.animate({
      data: musicData,
      config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
    }),
  );

  stage.story(chart, [
    {
      say: `new Vizzu('${stage.element.id.slice(0, 12)}…') found the div by its id`,
      run: (c) =>
        c.animate({
          config: {
            channels: { y: { set: ['Popularity', 'Kinds'] }, color: { set: ['Kinds'] } },
          },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;

