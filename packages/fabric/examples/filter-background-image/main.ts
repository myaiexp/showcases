// Image filters: filters on a canvas backgroundImage, with objects drawn on top
import type { Mount } from '@/types.ts';
import { Canvas, Circle, FabricImage, FabricText, filters } from 'fabric';
import { checkbox, slider } from '../../shared/controls.ts';
import { filterStage, SIZE, sweep } from '../../shared/filter-demo.ts';
import { picture } from '../../shared/images.ts';
import { status } from '../../shared/status.ts';
import { loadFonts } from '../../shared/fonts.ts';

const mount: Mount = async (el, ctx) => {
  const stage = filterStage(el, ctx);
  const say = status(stage);
  await loadFonts();
  if (stage.disposed) return stage.dispose;
  const canvas = stage.own(new Canvas(stage.el, { selection: false, skipTargetFind: true }));

  // backgroundImage is an ordinary FabricImage, so it has a filters array too; only the
  // background is filtered, the objects drawn over it keep their own colours.
  const bg = new FabricImage(picture('landscape', SIZE[0], SIZE[1]), { left: SIZE[0] / 2, top: SIZE[1] / 2 });
  canvas.backgroundImage = bg;
  canvas.add(
    new Circle({ left: 90, top: 130, radius: 34, fill: '#e94b3c', stroke: '#fff', strokeWidth: 4 }),
    new FabricText('on top', { left: 230, top: 40, fontFamily: 'Caveat', fontSize: 36, fontWeight: 700, fill: '#fff' }),
  );

  const hue = new filters.HueRotation({ rotation: 0.5 });
  const blur = new filters.Blur({ blur: 0 });
  const update = (): void => {
    bg.filters = [hue, blur];
    bg.applyFilters();
    canvas.requestRenderAll();
    say(`canvas.backgroundImage.filters: HueRotation ${hue.rotation.toFixed(2)}, Blur ${blur.blur.toFixed(2)}`);
  };
  update();

  if (stage.bar) {
    slider(stage.bar, 'rotation', -1, 1, 0.01, 0.5, (v) => {
      hue.rotation = v;
      update();
    }, (v) => v.toFixed(2));
    checkbox(stage.bar, 'blur the background', false, (on) => {
      blur.blur = on ? 0.6 : 0;
      update();
    });
  } else {
    sweep(stage, -1, 1, (v) => {
      hue.rotation = v;
      update();
    }, 5);
  }
  return stage.dispose;
};

export default mount;
