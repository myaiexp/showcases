// A direct blend tree: one parameter per clip, mixed by hand
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { creatureScene, idleClip, leanClip, locomotion, waveClip } from '../../shared/animation.ts';
import { createPanel } from '../../shared/panel.ts';

const CHILDREN = ['Idle', 'Walk', 'Wave', 'Lean'];

const graph = {
  layers: [
    {
      name: 'Base',
      states: [
        { name: 'START' },
        {
          name: 'Mix',
          loop: true,
          blendTree: {
            type: pc.ANIM_BLEND_DIRECT,
            // Each child's weight is its parameter's value over the sum of them all.
            parameters: CHILDREN.map((c) => `w${c}`),
            children: CHILDREN.map((name) => ({ name })),
          },
        },
      ],
      transitions: [{ from: 'START', to: 'Mix' }],
    },
  ],
  parameters: Object.fromEntries(CHILDREN.map((c) => [`w${c}`, { name: `w${c}`, type: pc.ANIM_PARAMETER_FLOAT, value: c === 'Idle' ? 1 : 0 }])),
};

const mount: Mount = async (el, ctx) => {
  const { scene, creature } = await creatureScene(el, ctx);
  const { app } = scene;
  const anim = creature.anim!;
  anim.loadStateGraph(graph);
  const tracks: Record<string, pc.AnimTrack> = { Idle: idleClip(), Walk: locomotion('Walk', 1, 1), Wave: waveClip(), Lean: leanClip('Lean', 1, 0.5) };
  for (const c of CHILDREN) anim.baseLayer!.assignAnimation(`Mix.${c}`, tracks[c]!);

  const weights = [1, 0, 0, 0];
  const apply = (): void => CHILDREN.forEach((c, i) => anim.setFloat(`w${c}`, weights[i]!));

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      CHILDREN.forEach((_, i) => (weights[i] = Math.max(0, Math.sin(t * 0.9 + i * 1.7)) + (i === 0 ? 0.15 : 0)));
      apply();
    });
  } else {
    const panel = createPanel(el);
    const total = panel.readout();
    CHILDREN.forEach((c, i) => {
      panel.slider(`w${c}`, 0, 1, 0.05, weights[i]!, (v) => {
        weights[i] = v;
        apply();
      });
    });
    app.on('update', () => {
      const sum = weights.reduce((a, b) => a + b, 0);
      total.textContent = sum > 0 ? `shares: ${CHILDREN.map((c, i) => `${c} ${((weights[i]! / sum) * 100).toFixed(0)}%`).join(', ')}` : 'all weights are 0: nothing is blended';
    });
  }
  return () => scene.dispose();
};

export default mount;
