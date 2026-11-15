// ref:remote:svg:<url> pointed at blob: URLs created on this page, so nothing leaves it
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const blobUrl = (inner: string, urls: string[]) => {
  const text = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${inner}</svg>`;
  const url = URL.createObjectURL(new Blob([text], { type: 'image/svg+xml' }));
  urls.push(url);
  return url;
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('Syntax');

  const urls: string[] = [];
  stage.onDispose(() => urls.forEach((u) => URL.revokeObjectURL(u)));
  const SHAPES = [
    ['<circle cx="12" cy="12" r="9"/>', '<rect x="4" y="4" width="16" height="16"/>', '<path d="M12 3 22 21H2z"/>'],
    ['<path d="M12 2 22 12 12 22 2 12z"/>', '<path d="M3 12h18M12 3v18" stroke="white" stroke-width="4"/>', '<circle cx="12" cy="12" r="4"/>'],
  ];

  stage.cycle(
    SHAPES.map((shapes, i) => ({
      say: `ref:remote:svg:blob:... (set ${i + 1})`,
      run: () => {
        const [a, b, c] = shapes.map((s) => blobUrl(s, urls));
        const syntax = `infographic list-row-horizontal-icon-arrow
theme dark
data
  lists
    - label First
      desc a blob: URL
      icon ref:remote:svg:${a}
    - label Second
      desc a blob: URL
      icon ref:remote:svg:${b}
    - label Third
      desc a blob: URL
      icon ref:remote:svg:${c}`;
        infographic.render(syntax);
        if (code) code.textContent = syntax;
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
