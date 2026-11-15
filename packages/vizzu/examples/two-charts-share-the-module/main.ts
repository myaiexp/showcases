// Vizzu example: two Vizzu instances side by side, sharing one loaded module
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // Loads the module (a no-op if it is loaded already); both constructors below reuse it.
  await Vizzu.initialize();

  const second = document.createElement('div');
  second.className = 'vz-chart';
  second.style.height = stage.element.style.height;
  stage.root.append(second);

  const left = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  const right = stage.own(new Vizzu(second, { style: darkStyle }));
  await Promise.all([left.initializing, right.initializing]);

  await Promise.all([
    left.animate({
      data: musicData,
      config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } }, title: 'By genre' },
    }),
    right.animate({
      data: musicData,
      config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Kinds'] } }, title: 'By kind' },
    }),
  ]);

  // Two charts, so the story rewinds nothing: the second step puts both back.
  stage.story(
    left,
    [
      {
        say: 'Each chart animates on its own: one stacks Kinds, the other splits by Genres',
        run: () =>
          Promise.all([
            left.animate({
              config: { channels: { y: { set: ['Popularity', 'Kinds'] }, color: { set: ['Kinds'] } } },
            }),
            right.animate({
              config: { channels: { y: { set: ['Popularity', 'Genres'] }, color: { set: ['Genres'] } } },
            }),
          ]),
      },
      {
        say: 'Both go back to plain columns',
        run: () =>
          Promise.all([
            left.animate({ config: { channels: { y: { set: ['Popularity'] }, color: { set: null } } } }),
            right.animate({ config: { channels: { y: { set: ['Popularity'] }, color: { set: null } } } }),
          ]),
      },
    ],
    { rewind: false },
  );
  return () => stage.dispose();
};

export default mount;
