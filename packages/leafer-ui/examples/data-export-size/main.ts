// Data: the size option sets the output size in pixels
import type { Mount } from '@/types.ts';
import { exportScene } from '../../shared/export-scene.ts';
import { pick } from '../../shared/shapes.ts';
import type { IExportOptions } from 'leafer-ui';

const mount: Mount = (el, ctx) => {
  const { stage, ui, panel } = exportScene(el, ctx, 'size takes a number (the width, height follows), or an object with one or both sides; a missing side scales with the other.');
  const FORMS: Record<string, IExportOptions['size']> = {
    '50': 50,
    '{ width: 160 }': { width: 160 },
    '{ height: 30 }': { height: 30 },
    '{ width: 120, height: 40 }': { width: 120, height: 40 },
  };
  const run = async (form: string): Promise<void> => {
    const result = await ui.export('png', { size: FORMS[form] });
    panel.image(result.data as string, `size: ${form}  ->  ${result.width} × ${result.height}`);
  };
  pick(stage, 'size', Object.keys(FORMS), (v) => void run(v), 1500);

  return stage.dispose;
};

export default mount;
