// Shadow draw calls: a shadow-casting omni light renders the scene six times
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, material } from '../../shared/components.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';

const KINDS = ['directional', 'spot', 'omni'] as const;
type Kind = (typeof KINDS)[number];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 11, pitch: -38, autoRotate: 8 }, sun: false, floor: 14, clear: '#171b26', ambient: '#303444' });
  const { app, stage } = scene;
  const mat = material('#7bc67b', { metalness: 0.1, gloss: 0.5 });
  const COUNT = 25;
  for (let i = 0; i < COUNT; i++) {
    const e = new pc.Entity('box');
    e.addComponent('render', { type: 'box', material: mat, castShadows: true, receiveShadows: true });
    e.setLocalScale(0.8, 0.8 + (i % 3) * 0.5, 0.8);
    e.setLocalPosition(((i % 5) - 2) * 1.8, 0.4 + (i % 3) * 0.25, (Math.floor(i / 5) - 2) * 1.8);
    app.root.addChild(e);
  }

  const light = new pc.Entity('light');
  app.root.addChild(light);
  const state = { kind: 'omni' as Kind, shadows: true };
  const configure = (): void => {
    if (light.light) light.removeComponent('light');
    light.addComponent('light', {
      type: state.kind,
      castShadows: state.shadows,
      range: 18,
      intensity: state.kind === 'directional' ? 1 : 3,
      innerConeAngle: 20,
      outerConeAngle: 50,
      shadowResolution: 1024,
      shadowDistance: 30,
      normalOffsetBias: 0.05,
      shadowBias: 0.2,
    });
    if (state.kind === 'directional') light.setEulerAngles(50, 30, 0);
    else if (state.kind === 'spot') {
      light.setPosition(0, 7, 0);
      light.setEulerAngles(0, 0, 0);
    } else {
      light.setPosition(0, 3.5, 0);
    }
  };
  configure();

  const layer = addCanvasLabels(stage.canvas, []);
  const out = document.createElement('pre');
  Object.assign(out.style, { position: 'absolute', left: '6px', top: '4px', margin: '0', padding: '4px 8px', font: '11px/1.4 monospace', color: '#e8ebf2', background: 'rgba(10,12,18,0.65)', borderRadius: '4px' });
  layer.append(out);

  let t = 0;
  let shown = 0;
  app.on('update', (dt: number) => {
    t += dt;
    shown += dt;
    if (ctx.preview) {
      // Cards cannot be clicked: omni with shadows, then without, then a directional light.
      const phase = Math.floor(t / 2.5) % 3;
      const next = { kind: (phase === 2 ? 'directional' : 'omni') as Kind, shadows: phase !== 1 };
      if (next.kind !== state.kind || next.shadows !== state.shadows) {
        Object.assign(state, next);
        configure();
      }
    }
    if (shown > 0.3) {
      shown = 0;
      out.textContent = `${state.kind} light, castShadows ${state.shadows}\ndraw calls: ${app.stats.drawCallCount}\nboxes: ${COUNT}`;
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('light type', KINDS, state.kind, (k) => {
      state.kind = k;
      configure();
    });
    panel.check('castShadows', true, (on) => {
      state.shadows = on;
      configure();
    });
    panel.readout('An omni light renders the scene into a cube shadow map: six passes, and the draw calls show it.');
  }

  return () => {
    mat.destroy();
    scene.dispose();
  };
};

export default mount;
