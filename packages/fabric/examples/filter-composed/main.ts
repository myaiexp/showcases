// Image filters: Composed bundles several filters into one array entry
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { checkbox, slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show, img } = shot(stage, 'landscape');
  const say = status(stage);

  const sepia = new filters.Sepia();
  const brightness = new filters.Brightness({ brightness: 0.1 });
  const contrast = new filters.Contrast({ contrast: 0.3 });
  // One Composed holds the three as subFilters and runs them in order, like three entries would.
  const composed = new filters.Composed({ subFilters: [sepia, brightness, contrast] });
  let bundled = true;
  const update = (): void => {
    show(bundled ? [composed] : [sepia, brightness, contrast]);
    say(`${img.filters.length} entry in image.filters: ${img.filters.map((f) => f.type).join(', ')}`);
  };
  update();

  if (stage.bar) {
    checkbox(stage.bar, 'use Composed', true, (v) => {
      bundled = v;
      update();
    });
    slider(stage.bar, 'brightness', -0.5, 0.5, 0.01, 0.1, (v) => {
      brightness.brightness = v;
      update();
    }, (v) => v.toFixed(2));
    slider(stage.bar, 'contrast', -0.5, 0.8, 0.01, 0.3, (v) => {
      contrast.contrast = v;
      update();
    }, (v) => v.toFixed(2));
  } else {
    sweep(stage, -0.3, 0.4, (v) => {
      brightness.brightness = v;
      update();
    });
  }
  return stage.dispose;
};

export default mount;
