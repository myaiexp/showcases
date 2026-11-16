// Image filters: adding, removing and reordering entries of the filters array
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { button, checkbox } from '../../shared/controls.ts';
import { filterStage, shot } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show, img } = shot(stage, 'fruit');
  const say = status(stage);

  // The filters array is plain: push, splice, reverse or reassign it, then applyFilters().
  const library: [string, () => filters.BaseFilter<string>][] = [
    ['Grayscale', () => new filters.Grayscale()],
    ['Sepia', () => new filters.Sepia()],
    ['Brightness', () => new filters.Brightness({ brightness: 0.25 })],
    ['Contrast', () => new filters.Contrast({ contrast: 0.4 })],
    ['Pixelate', () => new filters.Pixelate({ blocksize: 8 })],
    ['Blur', () => new filters.Blur({ blur: 0.25 })],
  ];
  const redraw = (): void => {
    show(img.filters);
    say(`image.filters = [${img.filters.map((f) => f.type).join(', ')}]`);
  };
  redraw();

  if (stage.bar) {
    for (const [name, make] of library) {
      checkbox(stage.bar, name, false, (on) => {
        if (on) img.filters.push(make());
        else img.filters.splice(img.filters.findIndex((f) => f.type === name), 1);
        redraw();
      });
    }
    button(stage.bar, 'reverse', () => {
      img.filters.reverse();
      redraw();
    });
    button(stage.bar, 'clear', () => {
      img.filters.length = 0;
      stage.bar!.querySelectorAll('input[type=checkbox]').forEach((c) => ((c as HTMLInputElement).checked = false));
      redraw();
    });
  } else {
    // Card: push one more filter every step, then start over.
    let n = 0;
    stage.every(1000, () => {
      n = (n + 1) % (library.length + 1);
      show(library.slice(0, n).map(([, make]) => make()));
      say(`image.filters = [${img.filters.map((f) => f.type).join(', ')}]`);
    });
  }
  return stage.dispose;
};

export default mount;
