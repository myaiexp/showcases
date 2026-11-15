// illus given as base64 PNG data URIs drawn on a canvas, no loader registered
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

function scene(hue: number, kind: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = 240;
  canvas.height = 180;
  const g = canvas.getContext('2d');
  if (!g) return '';
  const sky = g.createLinearGradient(0, 0, 0, 180);
  sky.addColorStop(0, `hsl(${hue} 70% 25%)`);
  sky.addColorStop(1, `hsl(${hue + 40} 80% 60%)`);
  g.fillStyle = sky;
  g.fillRect(0, 0, 240, 180);
  g.fillStyle = `hsl(${hue + 40} 90% 85%)`;
  g.beginPath();
  g.arc(60 + kind * 50, 60, 22, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = `hsl(${hue} 50% 15%)`;
  g.beginPath();
  g.moveTo(0, 180);
  for (let x = 0; x <= 240; x += 20) g.lineTo(x, 120 - ((x * (kind + 3)) % 47));
  g.lineTo(240, 180);
  g.fill();
  return canvas.toDataURL('image/png');
}

const SETS = [
  { say: 'Blue hours', hues: [210, 230, 250] },
  { say: 'Warm hours', hues: [10, 30, 50] },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('Syntax');

  stage.cycle(
    SETS.map(({ say, hues }) => ({
      say,
      run: () => {
        const names = ['Dawn', 'Noon', 'Dusk'];
        const lists = names
          .map((name, i) => `    - label ${name}\n      desc scene ${i + 1}\n      illus ${scene(hues[i] ?? 0, i)}`)
          .join('\n');
        const syntax = `infographic list-row-simple-illus\ntheme dark\ndata\n  lists\n${lists}`;
        infographic.render(syntax);
        if (code) code.textContent = syntax.replace(/base64,\S+/g, 'base64,...');
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
