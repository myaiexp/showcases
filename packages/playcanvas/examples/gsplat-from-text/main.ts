// GsplatText: a label rendered with a CSS font and kept as one splat per pixel
import * as pc from 'playcanvas';
// @ts-expect-error untyped module
import { GSplatText } from 'playcanvas/scripts/esm/gsplat/gsplat-text.mjs';
import type { Mount } from '@/types.ts';
import { createSplatScene } from '../../shared/gsplat.ts';
import { sway } from '../../shared/pbr.ts';
import { createPanel } from '../../shared/panel.ts';

interface TextSplat {
  text: string;
  fontSize: number;
  fontFamily: string;
  fillStyle: string;
  strokeStyle: string;
  strokeWidth: number;
}

const FILLS = ['#ffffff', '#ffd166', '#7bdff2', '#f78fb3'];
const FONTS = ['sans-serif', 'Georgia, serif', 'monospace'] as const;

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 3.6, pitch: -6, yaw: 0 });
  const { app } = scene;
  sway(app, scene.orbit, 25, 0.5);

  // The text lies on the XZ plane (readable from +Y); -90 degrees about X stands it up.
  const entity = new pc.Entity('label');
  entity.setLocalScale(3.2, 3.2, 3.2);
  entity.setEulerAngles(-90, 0, 0);
  app.root.addChild(entity);
  entity.addComponent('script');
  const label = entity.script!.create(GSplatText) as unknown as TextSplat;
  label.text = 'Splats';
  label.fontSize = ctx.preview ? 56 : 72;
  label.fillStyle = FILLS[1]!;
  label.strokeStyle = '#d1495b';
  label.strokeWidth = 3;

  if (ctx.preview) {
    // Cards swap words and colours on a timer.
    const words = ['Splats', 'Gaussian', 'PlayCanvas'];
    let t = 0;
    let i = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 2) {
        t = 0;
        i++;
        label.text = words[i % words.length]!;
        label.fillStyle = FILLS[i % FILLS.length]!;
      }
    });
  } else {
    const panel = createPanel(el);
    panel.select('text', ['Splats', 'Gaussian', 'Score: 100', 'GAME OVER'], 'Splats', (v) => (label.text = v));
    panel.select('fontFamily', FONTS, 'sans-serif', (v) => (label.fontFamily = v));
    panel.row();
    panel.slider('fontSize', 24, 120, 4, 72, (v) => (label.fontSize = v));
    panel.slider('strokeWidth', 0, 8, 1, 3, (v) => (label.strokeWidth = v));
    panel.select('fillStyle', FILLS, FILLS[1]!, (v) => (label.fillStyle = v));
    panel.select('strokeStyle', ['#d1495b', '#000000', 'rgba(0,0,0,0)'], '#d1495b', (v) => (label.strokeStyle = v));
  }

  return () => scene.dispose();
};

export default mount;
