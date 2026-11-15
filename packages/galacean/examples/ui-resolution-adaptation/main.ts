// ResolutionAdaptationMode with referenceResolution
import { ResolutionAdaptationMode } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { image, label, uiScene } from '../../shared/ui-kit.ts';

const MODES = ['WidthAdaptation', 'HeightAdaptation', 'BothAdaptation', 'ExpandAdaptation', 'ShrinkAdaptation'] as const;

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity, canvas } = ui;
  const say = caption(stage, '');
  canvas.referenceResolution.set(600, 300); // the 600 x 300 design, drawn as a frame
  image(canvasEntity, 0, 0, 600, 300, { color: [0.2, 0.3, 0.5, 0.45] }, 'design area');
  image(canvasEntity, 0, 0, 560, 8, { color: [1, 1, 1, 0.8] }, 'bar');
  label(canvasEntity, 0, 40, 'reference 600 x 300', 30);
  label(canvasEntity, 0, -40, 'this frame always has the design size', 20);
  const apply = (m: (typeof MODES)[number]): void => {
    canvas.resolutionAdaptationMode = ResolutionAdaptationMode[m];
    say(`resolutionAdaptationMode = ${m}`);
  };
  if (stage.preview) steps(canvasEntity, 2, MODES.length, (i) => apply(MODES[i]!));
  else {
    apply('WidthAdaptation');
    select(stage.bar, 'mode', MODES, apply);
    stage.bar.append('Resize the browser window to see the frame scale with the mode.');
  }
  return stage.dispose;
};

export default mount;
