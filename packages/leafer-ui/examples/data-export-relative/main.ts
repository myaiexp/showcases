// Data: the relative option picks the coordinate system an export is scaled in
import { Group, Rect } from 'leafer-ui';
import type { ILocationType } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { exportScene } from '../../shared/export-scene.ts';
import { pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const { stage, panel, u, leafer } = exportScene(el, ctx, 'The rect sits in a group scaled 1.5 and rotated 20°. Its export is scaled by the group in one coordinate system and not in another.');
  const group = new Group({ x: u(60), y: u(120), scale: 1.5, rotation: 20 });
  const rect = new Rect({ width: u(60), height: u(60), fill: '#32cd79' });
  group.add(rect);
  leafer.add(group);
  const run = async (relative: ILocationType): Promise<void> => {
    const result = await rect.export('png', { relative });
    panel.image(result.data as string, `relative: '${relative}'  ->  ${result.width} × ${result.height}`);
  };
  pick(stage, 'relative', ['inner', 'local', 'world', 'page'] as const, (v) => void run(v), 1600);

  return stage.dispose;
};

export default mount;
