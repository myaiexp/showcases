// setPointPositions then render() slides the points between layouts
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { colors, hsl } from '../../shared/color.ts';
import { circlePositions, clusterPositions, gridPositions, wavePositions } from '../../shared/shapes.ts';

type Name = 'grid' | 'circle' | 'clusters' | 'wave';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a layout: the points slide there. The first render has nothing to slide from.' });
  const count = 140;
  const layouts: Record<Name, Float32Array> = {
    grid: gridPositions(count),
    circle: circlePositions(count),
    clusters: clusterPositions(count),
    wave: wavePositions(count),
  };

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false, // no forces: the points go exactly where we say
        transitionDuration: 1200,
        pointDefaultSize: 7,
        fitViewDelay: 300,
        fitViewPadding: 0.2,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(layouts.grid);
  graph.setPointColors(colors(count, (i) => hsl((i / count) * 300, 0.8, 0.6)));
  graph.render(); // first render: snaps

  const go = async (name: Name): Promise<void> => {
    await graph.ready;
    graph.setPointPositions(layouts[name]);
    graph.render(); // later renders: animate over transitionDuration
    stage.say(`setPointPositions(${name}); render(): each point glides to its new spot`);
  };
  stage.say('First render: the grid appears at once');
  stage.select<Name>(
    'layout',
    [
      { value: 'grid', label: 'grid' },
      { value: 'circle', label: 'circle' },
      { value: 'clusters', label: 'clusters' },
      { value: 'wave', label: 'wave' },
    ],
    'grid',
    (v) => void go(v),
  );
  if (stage.preview) stage.cycle((['circle', 'clusters', 'wave', 'grid'] as const).map((n) => ({ run: () => go(n) })), 2200);
  return () => stage.dispose();
};

export default mount;
