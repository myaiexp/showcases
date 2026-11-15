// Render control: lights() swaps the default ambient and directional light for a coloured set
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import { AmbientLight, DirectionalLight, Mesh, MeshBasicMaterial, PointLight, SphereGeometry, type Light } from 'three';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { fitOnce, spin } from '../../shared/camera.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two coloured point lights circle the graph. Untick a light to take it out of the lights() list.' });

  // A small glowing ball rides on each point light so you can see where it is.
  const bulbGeometry = new SphereGeometry(4, 12, 8);
  const bulbs: MeshBasicMaterial[] = [];
  const point = (color: string): PointLight => {
    const light = new PointLight(color, 5, 0, 0); // decay 0: no falloff, so the whole graph is lit
    const bulb = new MeshBasicMaterial({ color });
    bulbs.push(bulb);
    light.add(new Mesh(bulbGeometry, bulb));
    return light;
  };
  const ambient = new AmbientLight('#2a2a44', 1);
  const red = point('#ff3355');
  const cyan = point('#22d3ee');
  const sun = new DirectionalLight('#ffe9b0', 1.2);
  sun.position.set(0, 200, -100);
  const all: [string, Light][] = [['ambient', ambient], ['red point', red], ['cyan point', cyan], ['directional', sun]];
  stage.onDispose(() => {
    bulbGeometry.dispose();
    for (const m of bulbs) m.dispose();
  });

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 14) as TData)
    .nodeColor(() => '#e8e8f0')
    .nodeOpacity(1)
    .nodeResolution(20)
    .lights(all.map(([, l]) => l))
    .cooldownTime(stage.preview ? 2500 : 4000);

  stage.loop((_dt, t) => {
    red.position.set(Math.cos(t * 0.9) * 150, 60, Math.sin(t * 0.9) * 150);
    cyan.position.set(Math.cos(t * 0.9 + Math.PI) * 150, -60, Math.sin(t * 0.9 + Math.PI) * 150);
  });

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.onEngineStop(() => cam.fit(10));
  } else {
    fitOnce(graph);
  }

  if (stage.bar) {
    const on = new Set(all.map(([, l]) => l));
    for (const [name, light] of all) {
      checkbox(stage.bar, name, true, (v) => {
        if (v) on.add(light);
        else on.delete(light);
        graph.lights(all.map(([, l]) => l).filter((l) => on.has(l)));
      });
    }
  }

  return stage.dispose;
};

export default mount;
