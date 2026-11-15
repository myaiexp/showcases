// enableZoom: false ignores wheel, double-click and pinch; code still zooms
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Turn zooming off, then try the wheel and the buttons.' });
  const data = communities(4, 30, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#5a5f6a',
        enableZoom: true,
        fitViewDelay: 1500,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  // The init fit sees only the start scatter: in the full view, fit again once the layout has spread.
  if (!stage.preview) stage.after(2500, () => graph.fitView(600, 0.12));

  const setZoom = (on: boolean): void => {
    graph.setConfigPartial({ enableZoom: on });
    stage.say(on ? 'enableZoom: true' : 'enableZoom: false. The wheel is ignored, zoom() still works');
  };
  stage.toggle('enableZoom', true, setZoom);
  stage.button('zoom(3, 600)', () => graph.zoom(3, 600));
  stage.button('fitView(600)', () => graph.fitView(600));

  if (stage.preview) {
    // A card has no wheel: scripted wheel events show it working, then ignored.
    const pointer = ghost(stage.div, graph);
    const wheel = (deltaY: number): void => {
      const canvas = stage.div.querySelector('canvas');
      const r = canvas?.getBoundingClientRect();
      if (!canvas || !r) return;
      canvas.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY, clientX: r.left + pointer.x, clientY: r.top + pointer.y }));
    };
    const spin = async (deltaY: number): Promise<void> => {
      for (let i = 0; i < 8; i++) {
        wheel(deltaY);
        await stage.wait(60);
      }
    };
    stage.after(300, () => pointer.moveTo(130, 90));
    // Let the layout spread and fit it once, then start the show.
    stage.after(2500, () => graph.fitView(500));
    stage.after(3300, () => stage.cycle([
      { say: 'enableZoom: true, wheel in', run: () => spin(-120), hold: 1800 },
      { say: 'enableZoom: true, wheel out', run: () => spin(120), hold: 1500 },
      { say: 'enableZoom: false, the wheel does nothing', run: async () => (setZoom(false), await stage.wait(300), await spin(-120)), hold: 1800 },
      { say: 'enableZoom: false, but zoom(2.5, 700) works', run: () => graph.zoom(2.5, 700), hold: 1800 },
      { say: 'enableZoom: true again', run: () => (setZoom(true), graph.fitView(600)), hold: 1500 },
    ]));
  }
  return () => stage.dispose();
};

export default mount;
