// Data: png, jpg and webp exports of the same element
import { Ellipse, Group, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { exportScene } from '../../shared/export-scene.ts';
import { pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const { stage, ui, panel } = exportScene(el, ctx, 'The export name is the format. The number of characters in the Base64 data differs per format.', (u) =>
    new Group({
      children: [
        new Rect({ width: u(100), height: u(100), fill: '#32cd79', cornerRadius: u(14) }),
        new Ellipse({ x: u(25), y: u(25), width: u(50), height: u(50), fill: '#FEB027', stroke: '#fff', strokeWidth: 3 }),
      ],
    }),
  );
  const run = async (name: 'png' | 'jpg' | 'webp'): Promise<void> => {
    const result = await ui.export(name, { pixelRatio: 2 });
    const data = result.data as string;
    panel.image(data, name);
    panel.text(`${data.slice(0, 30)}…\n${data.length} characters`);
  };
  pick(stage, 'format', ['png', 'jpg', 'webp'] as const, (v) => void run(v), 1500);

  return stage.dispose;
};

export default mount;
