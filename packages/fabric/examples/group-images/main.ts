// Groups: images are loaded first, then grouped
import { Canvas, FabricImage, Group } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { pictureURL, type Picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Three pictures, loaded first, then grouped: the group moves and rotates them together.',
  });
  const canvas = stage.own(new Canvas(stage.el));

  // the group needs every image ready, so wait for all of the loads
  const kinds: Picture[] = ['landscape', 'fruit', 'city'];
  const images = await Promise.all(kinds.map((k, i) => FabricImage.fromURL(pictureURL(k, 200, 140, 3 + i), {}, { scaleX: 0.55, scaleY: 0.55, left: 110 + i * 70, top: 95 + i * 25, stroke: '#fff', strokeWidth: 6 })));
  if (stage.disposed) return stage.dispose;
  const group = new Group(images, { angle: 8 });
  canvas.add(group);

  if (stage.bar) {
    button(stage.bar, 'rotate 15°', () => {
      group.rotate(group.angle + 15);
      group.setCoords();
      canvas.requestRenderAll();
    });
  } else {
    stage.loop((_dt, t) => {
      group.set({ angle: 8 + Math.sin(t) * 14, left: 180 + Math.sin(t * 0.7) * 14 });
      canvas.requestRenderAll();
    });
  }

  return stage.dispose;
};

export default mount;
