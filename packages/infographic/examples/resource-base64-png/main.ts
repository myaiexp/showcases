// A base64 PNG icon, drawn on a canvas and passed as a data URI
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

const PICTURES = [
  {
    say: 'Gradient discs',
    draw: (g: CanvasRenderingContext2D, s: number) => {
      const grad = g.createLinearGradient(0, 0, s, s);
      grad.addColorStop(0, '#f97316');
      grad.addColorStop(1, '#ec4899');
      g.fillStyle = grad;
      g.beginPath();
      g.arc(s / 2, s / 2, s * 0.44, 0, Math.PI * 2);
      g.fill();
    },
  },
  {
    say: 'Stripes',
    draw: (g: CanvasRenderingContext2D, s: number) => {
      for (let i = 0; i < 6; i++) {
        g.fillStyle = i % 2 ? '#22d3ee' : '#6366f1';
        g.fillRect(0, (i * s) / 6, s, s / 6);
      }
    },
  },
  {
    say: 'Dots',
    draw: (g: CanvasRenderingContext2D, s: number) => {
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          g.fillStyle = (x + y) % 2 ? '#84cc16' : '#facc15';
          g.beginPath();
          g.arc(s * (0.125 + x * 0.25), s * (0.125 + y * 0.25), s * 0.1, 0, Math.PI * 2);
          g.fill();
        }
      }
    },
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('Syntax');

  stage.cycle(
    PICTURES.map((picture) => ({
      say: picture.say,
      run: () => {
        const png = makePng(picture.draw);
        const syntax = `infographic list-grid-compact-card
theme dark
data
  lists
    - label Canvas PNG
      desc drawn in code
      icon ${png}
    - label Same picture
      desc used again
      icon ${png}`;
        infographic.render(syntax);
        if (code) code.textContent = syntax.replace(/base64,\S+/g, `base64,${png.length - 22} characters...`);
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
