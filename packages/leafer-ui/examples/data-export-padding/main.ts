// Data: the padding option adds empty space round the export
import type { Mount } from '@/types.ts';
import { exportScene } from '../../shared/export-scene.ts';
import { pick } from '../../shared/shapes.ts';
import type { IExportOptions } from 'leafer-ui';

const mount: Mount = (el, ctx) => {
  const { stage, ui, panel, u } = exportScene(el, ctx, 'padding is a number, or [top, right, bottom, left] with the same shortcuts as CSS: 2 values, 3 values.');
  const FORMS: Record<string, IExportOptions['padding']> = {
    '0': 0,
    '20': u(20),
    '[20, 0]': [u(20), 0],
    '[0, 10, 30]': [0, u(10), u(30)],
    '[0, 10, 30, 40]': [0, u(10), u(30), u(40)],
  };
  const run = async (form: string): Promise<void> => {
    const result = await ui.export('png', { padding: FORMS[form], fill: '#ffffff' });
    panel.image(result.data as string, `padding: ${form}  ->  ${result.width} × ${result.height}`);
  };
  pick(stage, 'padding', Object.keys(FORMS), (v) => void run(v), 1500, '[0, 10, 30]');

  return stage.dispose;
};

export default mount;
