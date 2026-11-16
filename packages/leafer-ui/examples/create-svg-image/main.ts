// Basics: an Image loading an SVG document from a string
import { Leafer, Image, Platform } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { dragToAndFro } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the arrow; zoom stays crisp.' });
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const svg = `
  <svg width="48" height="24" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M3 11.4L7.5 8.0V10.4H16.5V8.0L21 11.4L16.5 14.9V12.4H7.5V14.9L3 11.4Z" fill="black"/>
  </svg>`;

  const image = new Image({
    url: Platform.toURL(svg, 'svg'),
    draggable: true,
    scale: stage.preview ? 4 : 8,
  });
  leafer.add(image);

  if (stage.preview) dragToAndFro(stage, leafer, { x: 60, y: 60 }, { x: 140, y: 100 });

  return stage.dispose;
};

export default mount;
