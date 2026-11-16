// Data: export('json') with the json option
import { Group, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { exportScene } from '../../shared/export-scene.ts';
import { toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const { stage, ui, panel } = exportScene(el, ctx, 'export("json", { json: { matrix: true } }) puts the 2x3 transform matrix in the data too.', (u) =>
    new Group({ rotation: 30, scale: 1.2, children: [new Rect({ width: u(60), height: u(60), fill: '#32cd79' })] }),
  );
  let matrix = false;
  const run = async (): Promise<void> => {
    const result = await ui.export('json', { json: { matrix } });
    panel.text(JSON.stringify(result.data));
  };
  toggle(stage, 'json: { matrix }', matrix, (v) => ((matrix = v), void run()), 2000);

  return stage.dispose;
};

export default mount;
