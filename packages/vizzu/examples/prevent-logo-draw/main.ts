// Vizzu example: preventDefault in a logo-draw handler stops the Vizzu logo from being drawn
import Vizzu, { Events } from 'vizzu';
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
      title: 'The logo sits in the bottom right corner',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } },
    },
  });

  // Cancelling the event cancels its default action: the logo is not drawn.
  const logoDrawHandler = (event: Events.RectDrawEvent<Events.Logo>): void => {
    event.preventDefault();
  };

  stage.story(chart, [
    {
      say: 'preventDefault in a logo-draw handler: the logo is gone',
      run: (c) => {
        c.on('logo-draw', logoDrawHandler);
        c.feature.rendering.update();
        return c.animate({ config: { title: 'Prevent default behavior' } });
      },
    },
    {
      say: 'chart.off removes the handler: the logo is back',
      run: (c) => {
        c.off('logo-draw', logoDrawHandler);
        c.feature.rendering.update();
        return c.animate({ config: { title: 'Logo drawn again' } });
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
