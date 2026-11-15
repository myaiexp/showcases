// simulation.trackPoints returns handles that follow a few chosen points
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two trackers follow different points. Each marker is a plain div placed from tracker.positions().' });
  const data = communities(4, 40, 4);
  const sets = [[0, 40, 80, 120], [10, 55, 95]] as const;
  const looks = ['#ffd84d', '#6ee7f2'];

  const graph = stage.own(
    new Graph(
      stage.div,
      { pointDefaultSize: 7, linkDefaultColor: '#4a4f5a', simulationDecay: 8000, simulationRepulsion: 0.9, fitViewDelay: 900 },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  stage.refit(graph, 2500);

  // Every call returns a new handle with its own set of points: several parts of an app can follow different ones.
  const trackers = sets.map((s) => graph.simulation.trackPoints(s));
  stage.onDispose(() => trackers.forEach((t) => t.destroy()));

  const dots: HTMLDivElement[][] = trackers.map(() => []);
  const dot = (set: number, k: number): HTMLDivElement => {
    let d = dots[set]?.[k];
    if (!d) {
      d = document.createElement('div');
      d.style.cssText = `position:absolute;left:0;top:0;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;border:2px solid ${looks[set]};pointer-events:none;z-index:2;font:10px/14px sans-serif;color:${looks[set]};text-align:center`;
      stage.div.append(d);
      dots[set]?.push(d);
    }
    return d;
  };
  stage.onDispose(() => dots.flat().forEach((d) => d.remove()));

  let raf = 0;
  const frame = (): void => {
    raf = requestAnimationFrame(frame);
    if (!graph.isReady) return;
    trackers.forEach((t, s) => {
      const map = t.positions({ nonBlocking: true }); // the latest positions the GPU has handed back
      t.indices.forEach((index, k) => {
        const p = map.get(index);
        const d = dot(s, k);
        d.style.display = p ? '' : 'none';
        if (!p) return;
        const [x, y] = graph.spaceToScreenPosition(p);
        d.style.transform = `translate(${x}px, ${y}px)`;
        d.textContent = String(index);
      });
    });
  };
  raf = requestAnimationFrame(frame);
  stage.onDispose(() => cancelAnimationFrame(raf));

  const describe = (): string => trackers.map((t, s) => `tracker ${s + 1}: ${t.indices.join(', ')}`).join(' | ');
  const shuffle = (): void => {
    const second = trackers[1];
    second?.setIndices(second.indices.length === 3 ? [25, 70, 110, 150] : [10, 55, 95]);
    stage.say(describe());
  };
  stage.say(describe());
  stage.button('setIndices on tracker 2', shuffle);
  stage.button('Reheat layout', () => graph.start(1));
  stage.cycle(
    [
      { say: describe(), run: () => graph.start(1) },
      { run: shuffle, hold: 3000 },
    ],
    3000,
  );
  return () => stage.dispose();
};

export default mount;
