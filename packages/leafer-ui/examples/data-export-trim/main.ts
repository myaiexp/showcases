// Data: the trim option cuts away transparent pixels
import { Box, Ellipse } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { cycleFill } from '../../shared/export-view.ts';
import { exportScene } from '../../shared/export-scene.ts';
import { toggle } from '../../shared/shapes.ts';
import { outline } from '../../shared/layout-kit.ts';

const mount: Mount = (el, ctx) => {
  const { stage, ui, leafer, panel, u } = exportScene(el, ctx, 'The Box is 100 wide but only the circle in its corner is painted. trim keeps just the painted part.', (k) =>
    new Box({ width: k(100), height: k(100), children: [new Ellipse({ x: k(5), y: k(5), width: k(40), height: k(40), fill: '#32cd79' })] }),
  );
  const frame = outline(leafer, '#aaa');
  frame.show({ x: ui.x!, y: ui.y!, width: u(100), height: u(100) });
  let trim = false;
  const run = async (): Promise<void> => {
    const result = await ui.export('png', { trim });
    panel.image(result.data as string, `trim: ${trim}  ->  ${result.width} × ${result.height}`);
    panel.text(result.trimBounds ? `trimBounds ${JSON.stringify(result.trimBounds)}` : '');
  };
  toggle(stage, 'trim', trim, (v) => ((trim = v), void run()), 1600);
  if (stage.preview) cycleFill(stage, (ui as Box).children![0]!, run, 1600);

  return stage.dispose;
};

export default mount;
