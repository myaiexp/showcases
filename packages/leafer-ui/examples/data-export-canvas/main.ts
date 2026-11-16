// Data: export('canvas') hands back the canvas itself
import type { Mount } from '@/types.ts';
import { cycleFill } from '../../shared/export-view.ts';
import { exportScene } from '../../shared/export-scene.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const { stage, ui, panel } = exportScene(el, ctx, 'result.data is a LeaferCanvas: its .view is a real HTMLCanvasElement and its .context the 2d context.');
  const run = async (): Promise<void> => {
    const result = await ui.export('canvas');
    const leaferCanvas = result.data as { view: HTMLCanvasElement; context: CanvasRenderingContext2D; pixelRatio: number; export(name: string, o?: number): Promise<{ data: string }> };
    const canvas = leaferCanvas.view;
    panel.image(canvas.toDataURL('image/png'), 'canvas.toDataURL()');
    const jpg = await leaferCanvas.export('jpg', 0.9); // image options only
    panel.text(`${canvas.constructor.name} ${canvas.width} x ${canvas.height}\ncontext: ${leaferCanvas.context.constructor.name}\nexport('jpg', 0.9): ${String(jpg.data).length} chars`);
  };
  void run();
  if (stage.preview) cycleFill(stage, ui, run);
  else button(stage.bar!, 'export again', () => void run());

  return stage.dispose;
};

export default mount;
