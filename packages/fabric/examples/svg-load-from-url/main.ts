// loadSVGFromURL reads a blob: URL made from a string, so nothing leaves the page
import { loadSVGFromURL, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { showParsed, svgLab } from '../../shared/svg-lab.ts';

const SOURCE = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#f2b134" stroke="#a8700a" stroke-width="6"/>
  <circle cx="72" cy="82" r="10" fill="#2b2a33"/>
  <circle cx="128" cy="82" r="10" fill="#2b2a33"/>
  <path d="M60 125 Q100 170 140 125" fill="none" stroke="#2b2a33" stroke-width="8" stroke-linecap="round"/>
</svg>`;

const mount: Mount = (el, ctx) => {
  const lab = svgLab(el, ctx, {
    scene: [200, 200],
    hint: 'The text is wrapped in a Blob and given a blob: URL; loadSVGFromURL fetches that URL. A real file URL works the same way (same-origin rules apply).',
    onEdit: (text) => void load(text),
  });
  const urls: string[] = [];
  lab.stage.onDispose(() => urls.forEach((u) => URL.revokeObjectURL(u)));
  let token = 0;

  async function load(text: string): Promise<void> {
    const mine = ++token;
    const url = URL.createObjectURL(new Blob([text], { type: 'image/svg+xml' }));
    urls.push(url);
    // It resolves with an empty result, not an error, when the fetch or the parse fails.
    const { objects, options } = await loadSVGFromURL(url);
    URL.revokeObjectURL(url);
    if (mine !== token || lab.stage.disposed) return;
    const shapes = objects.filter((o): o is FabricObject => o !== null);
    showParsed(lab.canvas, shapes.length ? [util.groupSVGElements(shapes, options)] : []);
    lab.say(`${shapes.length} objects from ${url.slice(0, 16)}...`);
  }

  lab.setSource(SOURCE);
  void load(SOURCE);
  if (!lab.stage.bar) {
    let n = 0;
    lab.stage.every(1500, () => {
      const text = SOURCE.replace('#f2b134', ['#f2b134', '#7bc96f', '#8e5bd6'][++n % 3]!);
      lab.setSource(text);
      void load(text);
    });
  }

  return lab.stage.dispose;
};

export default mount;
