// A mixer of the simulation force settings on one graph, with presets
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { keepFramed, load } from '../../shared/load.ts';

interface Mix {
  simulationGravity: number;
  simulationCenter: number;
  simulationRepulsion: number;
  simulationLinkSpring: number;
  simulationLinkDistance: number;
  simulationFriction: number;
  simulationCollision: number;
}

const PRESETS: Record<string, Mix> = {
  default: { simulationGravity: 0.25, simulationCenter: 0, simulationRepulsion: 1, simulationLinkSpring: 1, simulationLinkDistance: 10, simulationFriction: 0.85, simulationCollision: 0 },
  tight: { simulationGravity: 0.8, simulationCenter: 0, simulationRepulsion: 0.3, simulationLinkSpring: 2, simulationLinkDistance: 3, simulationFriction: 0.85, simulationCollision: 0 },
  airy: { simulationGravity: 0.05, simulationCenter: 0.5, simulationRepulsion: 2, simulationLinkSpring: 0.3, simulationLinkDistance: 20, simulationFriction: 0.85, simulationCollision: 0 },
  bouncy: { simulationGravity: 0.25, simulationCenter: 0, simulationRepulsion: 1, simulationLinkSpring: 1.5, simulationLinkDistance: 10, simulationFriction: 0.98, simulationCollision: 1 },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move any slider, or pick a preset: every change reheats the layout.' });
  const data = communities(4, 30, 4, 2, 0.08);
  const mix: Mix = { ...PRESETS['default']! };

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#5a5f6a',
        simulationGravity: mix.simulationGravity,
        simulationCenter: mix.simulationCenter,
        simulationRepulsion: mix.simulationRepulsion,
        simulationLinkSpring: mix.simulationLinkSpring,
        simulationLinkDistance: mix.simulationLinkDistance,
        simulationFriction: mix.simulationFriction,
        simulationCollision: mix.simulationCollision,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  load(graph, data);
  keepFramed(stage, graph, 3000);

  const sliders = new Map<keyof Mix, HTMLInputElement | null>();
  const describe = (name: string): string =>
    `${name}: ${(Object.keys(mix) as (keyof Mix)[]).map((k) => `${k.replace('simulation', '')} ${mix[k]}`).join(', ')}`;
  const push = (name: string): void => {
    graph.setConfigPartial(mix);
    graph.start(0.8);
    stage.say(describe(name));
  };
  const add = (key: keyof Mix, min: number, max: number, step: number): void => {
    sliders.set(
      key,
      stage.slider(key, min, max, step, mix[key], (v) => {
        mix[key] = v;
        push('Custom mix');
      }),
    );
  };
  add('simulationGravity', 0, 1, 0.05);
  add('simulationCenter', 0, 1, 0.05);
  add('simulationRepulsion', 0, 2, 0.1);
  add('simulationLinkSpring', 0, 2, 0.1);
  add('simulationLinkDistance', 1, 20, 1);
  add('simulationFriction', 0, 1, 0.01);
  add('simulationCollision', 0, 2, 0.1);

  const preset = (name: string): void => {
    Object.assign(mix, PRESETS[name]);
    for (const [key, input] of sliders) {
      if (!input) continue;
      input.value = String(mix[key]);
      const out = input.nextElementSibling;
      if (out) out.textContent = String(mix[key]);
    }
    push(`Preset ${name}`);
  };
  for (const name of Object.keys(PRESETS)) stage.button(name, () => preset(name));
  stage.say(describe('Preset default'));
  if (stage.preview) stage.cycle(Object.keys(PRESETS).map((n) => ({ run: () => preset(n) })), 3500);
  return () => stage.dispose();
};

export default mount;
