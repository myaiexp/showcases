// Vizzu example: a background-draw handler paints an image and cancels the default background
import Vizzu from 'vizzu';
import type { EventOf } from 'vizzu';
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
      title: 'Chart with its normal background',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  // The docs' 3x2 pixel GIF, stretched over the whole chart.
  const image = new Image();
  image.src =
    'data:image/gif;base64,R0lGODlhAwACAPIAAJLf6q/i7M/r8un0+PT6+/n8/QAAAAAAACH5BAQAAAAALAAAAAADAAIAAAMEWBMkkAA7';
  const loaded = image.decode().catch(() => {});

  const backgroundImageHandler = (event: EventOf<'background-draw'>): void => {
    const g = event.renderingContext;
    // The chart's own dark background is skipped too, so paint it first and dim the pale image
    // over it: the dark theme's light text stays readable.
    g.save();
    g.fillStyle = '#131316';
    g.fillRect(0, 0, event.detail.rect.size.x, event.detail.rect.size.y);
    g.globalAlpha = 0.35;
    g.drawImage(image, 0, 0, event.detail.rect.size.x, event.detail.rect.size.y);
    g.restore();
    event.preventDefault();
  };

  stage.story(chart, [
    {
      say: 'background-draw: the handler paints an image instead of the background',
      run: async (c) => {
        await loaded;
        c.on('background-draw', backgroundImageHandler);
        c.feature.rendering.update();
        return c.animate({ config: { title: 'Add background image' } });
      },
    },
    {
      say: 'chart.off removes the handler: the normal background returns',
      run: (c) => {
        c.off('background-draw', backgroundImageHandler);
        c.feature.rendering.update();
        return c.animate({ config: { title: 'Background image removed' } });
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
