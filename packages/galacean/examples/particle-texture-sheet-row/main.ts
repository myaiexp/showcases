// textureSheetAnimation: SingleRow against WholeSheet
import { CurveKey, ParticleCurve, ParticleCurveMode, Vector2 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { emitter, fxStage, sheetTexture } from '../../shared/particle-kit.ts';

// TextureSheetAnimationType is not exported from the package: WholeSheet = 0, SingleRow = 1.
const SheetType = { WholeSheet: 0, SingleRow: 1 } as const;

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  caption(stage, 'left WholeSheet | right SingleRow, on the same 4 x 4 sheet');
  const make = (x: number, type: (typeof SheetType)[keyof typeof SheetType]) => {
    const e = emitter(stage, root, { texture: sheetTexture(stage, 4, 4), additive: false, position: [x, -1.8, 0] });
    const sheet = e.gen.textureSheetAnimation;
    sheet.enabled = true;
    sheet.tiling = new Vector2(4, 4);
    sheet.type = type;
    sheet.frameOverTime.mode = ParticleCurveMode.Curve;
    sheet.frameOverTime.curve = new ParticleCurve(new CurveKey(0, 0), new CurveKey(1, 1));
    e.gen.main.startSize.constant = 0.9;
    e.gen.main.startLifetime.constant = 2.4;
    e.gen.main.startSpeed.constant = 1.5;
    e.gen.emission.rateOverTime.constant = 4;
    return e;
  };
  make(-2.4, SheetType.WholeSheet);
  const row = make(2.4, SheetType.SingleRow);
  if (!stage.preview) select(stage.bar, 'right type', ['SingleRow', 'WholeSheet'] as const, (v) => (row.gen.textureSheetAnimation.type = SheetType[v]), 'SingleRow');
  return stage.dispose;
};

export default mount;
