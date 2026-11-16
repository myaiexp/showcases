// Data: the scale option enlarges or shrinks the export
import type { Mount } from '@/types.ts';
import { exportScene } from '../../shared/export-scene.ts';
import { pick } from '../../shared/shapes.ts';
import type { IExportOptions } from 'leafer-ui';

const mount: Mount = (el, ctx) => {
  const { stage, ui, panel } = exportScene(el, ctx, 'scale is a number or an { x, y } point; the default 1 is the logical size.');
  const FORMS: Record<string, IExportOptions['scale']> = {
    '0.5': 0.5,
    '1': 1,
    '2': 2,
    '{ x: 2, y: 0.5 }': { x: 2, y: 0.5 },
  };
  const run = async (form: string): Promise<void> => {
    const result = await ui.export('png', { scale: FORMS[form] });
    panel.image(result.data as string, `scale: ${form}  ->  ${result.width} × ${result.height}`);
  };
  pick(stage, 'scale', Object.keys(FORMS), (v) => void run(v), 1500, '1');

  return stage.dispose;
};

export default mount;
