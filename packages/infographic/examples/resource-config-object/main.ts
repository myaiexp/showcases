// icon as ResourceConfig objects: raw SVG, SVG data URI and PNG
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

/** Draws a small picture on a canvas and returns it as a base64 PNG data URI. */
function makePng(draw: (g: CanvasRenderingContext2D, size: number) => void, size = 96): string {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const g = canvas.getContext('2d');
  if (g) draw(g, size);
  return canvas.toDataURL('image/png');
}

const shape = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${d}"/></svg>`;

// The icon colour of an SVG comes from the theme; a PNG keeps the colours it was drawn with.
const VARIANTS = [
  { say: 'diamond, plus, orange triangle', paths: ['M12 2 22 12 12 22 2 12z', 'M9 2h6v7h7v6h-7v7H9v-7H2V9h7z'], png: '#f97316' },
  { say: 'hexagon, bar, pink triangle', paths: ['M12 2l9 5v10l-9 5-9-5V7z', 'M3 9h18v6H3z'], png: '#ec4899' },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('Options');

  stage.cycle(
    VARIANTS.map(({ say, paths, png: pngColour }) => ({
      say,
      run: () => {
        const png = makePng((g, s) => {
          g.fillStyle = pngColour;
          g.beginPath();
          g.moveTo(s / 2, 4);
          g.lineTo(s - 4, s - 4);
          g.lineTo(4, s - 4);
          g.fill();
        });
        const lists = [
          {
            label: 'Raw SVG',
            desc: "encoding 'raw'",
            icon: { source: 'inline', scene: 'icon', format: 'svg', encoding: 'raw', data: shape(paths[0] ?? '') },
          },
          {
            label: 'SVG data URI',
            desc: "encoding 'data-uri'",
            icon: {
              source: 'inline',
              scene: 'icon',
              format: 'svg',
              encoding: 'data-uri',
              data: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(shape(paths[1] ?? '').replace('<path', '<path fill="white"'))}`,
            },
          },
          {
            label: 'PNG',
            desc: "format 'image', encoding 'base64'",
            icon: { source: 'inline', scene: 'icon', format: 'image', encoding: 'base64', data: png },
          },
        ];
        infographic.render({
          template: 'list-row-horizontal-icon-arrow',
          theme: 'dark',
          data: { lists },
        });
        if (code) {
          code.textContent = JSON.stringify(lists, null, 2).replace(/"data": "(.{60})[^"]*"/g, '"data": "$1..."');
        }
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
