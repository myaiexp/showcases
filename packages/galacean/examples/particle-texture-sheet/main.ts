// textureSheetAnimation (WholeSheet) over a 4 x 4 numbered sheet
import { CurveKey, ParticleCurve, ParticleCurveMode, Vector2 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { emitter, fxStage, sheetTexture } from '../../shared/particle-kit.ts';

// TextureSheetAnimationType is not exported from the package: WholeSheet = 0, SingleRow = 1.
const WholeSheet = 0;

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 9] });
  caption(stage, 'tiling (4, 4), type WholeSheet: frame 0 to 15 over the life');
  const e = emitter(stage, root, { texture: sheetTexture(stage, 4, 4), additive: false, position: [0, -1.8, 0] });
  const sheet = e.gen.textureSheetAnimation;
  sheet.enabled = true;
  sheet.tiling = new Vector2(4, 4);
  sheet.type = WholeSheet;
  sheet.frameOverTime.mode = ParticleCurveMode.Curve;
  sheet.frameOverTime.curve = new ParticleCurve(new CurveKey(0, 0), new CurveKey(1, 1));
  sheet.cycleCount = 1;
  e.gen.main.startSize.constant = 0.9;
  e.gen.main.startLifetime.constant = 2.4;
  e.gen.main.startSpeed.constant = 1.5;
  e.gen.emission.rateOverTime.constant = 4;
  if (!stage.preview) slider(stage.bar, 'cycleCount', 1, 4, 1, 1, (v) => (sheet.cycleCount = v));
  return stage.dispose;
};

export default mount;
