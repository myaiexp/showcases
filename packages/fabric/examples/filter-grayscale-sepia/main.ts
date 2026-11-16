// Image filters: an image's filters array, applied with applyFilters() and redrawn
import { Canvas, FabricImage, filters } from 'fabric';
import type { Mount } from '@/types.ts';
import { pictureURL } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';

const recipes: [string, () => filters.BaseFilter<string>[]][] = [
  ['no filters', () => []],
  ['Grayscale', () => [new filters.Grayscale()]],
  ['Sepia', () => [new filters.Sepia()]],
  ['Sepia + Brightness', () => [new filters.Sepia(), new filters.Brightness({ brightness: 0.2 })]],
];

const mount: Mount = async (el, ctx) => {
  // Four canvases side by side in the full view; one canvas stepping through them in a card.
  const stage = createStage(el, ctx, {
    panes: ctx.preview ? ['no filters'] : recipes.map(([name]) => name),
    scene: [320, 220],
    height: 260,
  });
  const url = pictureURL('fruit', 320, 220);

  const images: FabricImage[] = [];
  for (const [i, pane] of stage.panes.entries()) {
    const canvas = stage.own(new Canvas(pane.el, { selection: false }), pane);
    // fromURL returns a promise in v6+ (the guide's callback form is v5).
    const img = await FabricImage.fromURL(url);
    if (stage.disposed) return stage.dispose;
    img.set({ left: 160, top: 110, selectable: false });
    // filters is a plain array: push, splice or replace it, then applyFilters().
    img.filters.push(...recipes[i]![1]());
    img.applyFilters();
    canvas.add(img);
    images.push(img);
  }

  if (stage.preview) {
    const img = images[0]!;
    const pane = stage.panes[0]!;
    let i = 0;
    stage.every(1400, () => {
      const [name, make] = recipes[++i % recipes.length]!;
      img.filters = make();
      img.applyFilters();
      img.canvas?.requestRenderAll();
      pane.caption!.textContent = name;
    });
  }

  return stage.dispose;
};

export default mount;
