// Data: Resource.tasker holds an export until your async task is done
import { Resource } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { exportScene } from '../../shared/export-scene.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const { stage, ui, panel } = exportScene(el, ctx, 'The task takes 0.8 s. The export waits for it, so its time is at least that long.');
  let colour = 0;
  const run = async (): Promise<void> => {
    panel.text('exporting…');
    const start = performance.now();
    // the docs' custom async task: export waits for it before it renders
    Resource.tasker.add(async () => {
      await new Promise((r) => setTimeout(r, 800));
      ui.fill = ['#32cd79', '#FEB027', '#4B8BFF'][colour++ % 3]; // something the export should see
    });
    const result = await ui.export('png');
    panel.image(result.data as string);
    panel.text(`export took ${Math.round(performance.now() - start)} ms`);
  };
  void run();
  if (stage.preview) stage.every(2600, () => void run());
  else button(stage.bar!, 'add the task and export', () => void run());

  return stage.dispose;
};

export default mount;
