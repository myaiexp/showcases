// Alpha blending: blendType presets and a hand-built BlendState
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';
import { canvasTexture } from '../../shared/textures.ts';

const TYPES = {
  BLEND_NORMAL: pc.BLEND_NORMAL,
  BLEND_ADDITIVE: pc.BLEND_ADDITIVE,
  BLEND_ADDITIVEALPHA: pc.BLEND_ADDITIVEALPHA,
  BLEND_MULTIPLICATIVE: pc.BLEND_MULTIPLICATIVE,
  BLEND_MULTIPLICATIVE2X: pc.BLEND_MULTIPLICATIVE2X,
  BLEND_PREMULTIPLIED: pc.BLEND_PREMULTIPLIED,
  BLEND_SCREEN: pc.BLEND_SCREEN,
  BLEND_SUBTRACTIVE: pc.BLEND_SUBTRACTIVE,
  BLEND_MIN: pc.BLEND_MIN,
  BLEND_MAX: pc.BLEND_MAX,
  'new BlendState(...)': -1,
} as const;
type TypeName = keyof typeof TYPES;
const NAMES = Object.keys(TYPES) as TypeName[];

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 8, pitch: -6, yaw: 0, clearColor: new pc.Color(0.1, 0.11, 0.15) });
  const { app, stage } = rig;
  rig.orbit.autoRotate = 0;

  // A striped backdrop so the effect of each blend equation shows against light and dark.
  const stripes = rig.own(
    canvasTexture(stage.device, (g, s) => {
      for (let i = 0; i < 8; i++) {
        g.fillStyle = i % 2 ? '#f0f0f0' : '#303845';
        g.fillRect(0, (i * s) / 8, s, s / 8);
      }
    }),
  );
  addMesh(app, 'plane', pbrMaterial('#ffffff', { diffuseMap: stripes, useLighting: false }), [0, 0, -1], [12, 1, 6]).setLocalEulerAngles(90, 0, 0);

  // Three translucent quads, overlapping, at different depths. They write no depth (blended).
  const materials = ['#ff4d4d', '#4dff6a', '#4d7dff'].map((hex, i) => {
    const m = pbrMaterial(hex, { useLighting: false, opacity: 0.6, blendType: pc.BLEND_NORMAL });
    m.emissive = new pc.Color().fromString(hex);
    addMesh(app, 'plane', m, [(i - 1) * 1.3, (i % 2) * 0.5 - 0.25, i * 0.3], 2.8).setLocalEulerAngles(90, 0, 0);
    return m;
  });

  const apply = (name: TypeName): void =>
    materials.forEach((m) => {
      if (name === 'new BlendState(...)') {
        // Written out in full: source alpha times source colour, plus the destination (additive with alpha).
        m.blendState = new pc.BlendState(true, pc.BLENDEQUATION_ADD, pc.BLENDMODE_SRC_ALPHA, pc.BLENDMODE_ONE);
      } else {
        m.blendType = TYPES[name];
      }
      m.update();
    });

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      const before = Math.floor(t / 1.6);
      t += dt;
      if (Math.floor(t / 1.6) !== before) apply(NAMES[Math.floor(t / 1.6) % NAMES.length]!);
    });
  } else {
    const panel = createPanel(el);
    panel.select('blendType', NAMES, 'BLEND_NORMAL', apply);
    panel.slider('opacity', 0, 1, 0.01, 0.6, (v) =>
      materials.forEach((m) => {
        m.opacity = v;
        m.update();
      }),
    );
    panel.readout('the last choice writes a BlendState, which overrides blendType');
  }
  return () => rig.dispose();
};

export default mount;
