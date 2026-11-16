// Data: the clip option exports a part of the element
import { Ellipse } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { exportScene } from '../../shared/export-scene.ts';
import { slider } from '../../shared/controls.ts';
import { outline } from '../../shared/layout-kit.ts';

const mount: Mount = (el, ctx) => {
  const { stage, ui, leafer, panel, u } = exportScene(el, ctx, 'clip is relative to the element\'s render bounds. Move and size the clip box.', (k) =>
    new Ellipse({ width: k(100), height: k(100), innerRadius: 0.5, fill: '#32cd79' }),
  );
  const clip = { x: u(50), y: u(50), width: u(50), height: u(50) };
  const box = outline(leafer);
  const run = async (): Promise<void> => {
    box.show({ x: ui.x! + clip.x, y: ui.y! + clip.y, width: clip.width, height: clip.height });
    const result = await ui.export('png', { clip: { ...clip } });
    panel.image(result.data as string, `${result.width} × ${result.height}`);
    panel.text(`clip: { x: ${Math.round(clip.x)}, y: ${Math.round(clip.y)}, width: ${Math.round(clip.width)}, height: ${Math.round(clip.height)} }`);
  };
  void run();
  if (stage.preview) {
    stage.loop((_dt, t) => {
      clip.x = u(25) + (0.5 + 0.5 * Math.sin(t * 1.5)) * u(50);
      clip.y = u(25) + (0.5 + 0.5 * Math.cos(t * 1.1)) * u(50);
      void run();
    });
  } else {
    slider(stage.bar!, 'x', 0, 100, 1, 50, (v) => ((clip.x = v), void run()));
    slider(stage.bar!, 'y', 0, 100, 1, 50, (v) => ((clip.y = v), void run()));
    slider(stage.bar!, 'size', 10, 100, 1, 50, (v) => ((clip.width = clip.height = v), void run()));
  }

  return stage.dispose;
};

export default mount;
