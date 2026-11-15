// The same data URI as an icon (small glyph) and as an illus (large picture)
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const picture = (bg: string, fg: string) =>
  `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150"><rect width="200" height="150" fill="${bg}"/><circle cx="60" cy="50" r="24" fill="${fg}"/><path d="M0 150 70 80l50 50 30-30 50 50z" fill="${fg}" opacity="0.7"/></svg>`;

const PICS = [picture('#1e3a8a', '#93c5fd'), picture('#14532d', '#86efac'), picture('#7c2d12', '#fdba74')];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('Syntax');

  const items = (field: 'icon' | 'illus') =>
    ['Lake', 'Forest', 'Desert']
      .map((label, i) => `    - label ${label}\n      ${field} ${PICS[i]}`)
      .join('\n');

  stage.cycle([
    {
      say: 'icon on a compact card: a small glyph',
      run: () => {
        const syntax = `infographic list-grid-compact-card\ntheme dark\ndata\n  lists\n${items('icon')}`;
        infographic.render(syntax);
        if (code) code.textContent = syntax;
      },
    },
    {
      say: 'illus on list-row-simple-illus: the picture area',
      run: () => {
        const syntax = `infographic list-row-simple-illus\ntheme dark\ndata\n  lists\n${items('illus')}`;
        infographic.render(syntax);
        if (code) code.textContent = syntax;
      },
    },
  ]);

  return () => stage.dispose();
};

export default mount;
