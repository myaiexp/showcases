// The page drags a point itself: setPinnedPoint, setPointPosition, then release
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { communities } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a point. With pinning on it stays where you drop it; with pinning off the forces pull it back.' });
  const data = communities(4, 25, 6);
  let hovered: number | undefined;
  let pinWhileDragging = true;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableDrag: false, // cosmos.gl's own drag is off: this page does the dragging
        enableZoom: false, // otherwise the drag would also pan the view
        pointDefaultSize: 10,
        linkDefaultColor: '#5a5f6a',
        simulationDecay: 100000, // keep the layout running so the forces keep acting
        simulationLinkSpring: 1.2,
        fitViewDelay: 1200,
        renderHoveredPointRing: true,
        hoveredPointCursor: 'grab',
        onPointMouseOver: (i) => (hovered = i),
        onPointMouseOut: () => (hovered = undefined),
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  stage.refit(graph, 3000);

  // The host's drag, in four calls: pin, move on every pointer move, release.
  const grab = (index: number, pin: boolean): boolean => {
    const was = graph.isPointPinned(index);
    if (pin) graph.setPinnedPoint(index, true);
    return was;
  };
  const move = (index: number, x: number, y: number): void => {
    const [sx, sy] = graph.screenToSpacePosition([x, y]);
    graph.setPointPosition(index, sx, sy);
  };
  const drop = (index: number, wasPinned: boolean): void => {
    if (!wasPinned) graph.setPinnedPoint(index, false);
  };

  if (!stage.preview) {
    let held: { index: number; was: boolean } | undefined;
    const local = (e: PointerEvent): [number, number] => {
      const r = stage.div.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    stage.div.addEventListener(
      'pointerdown',
      (e) => {
        if (hovered === undefined) return;
        held = { index: hovered, was: grab(hovered, pinWhileDragging) };
        stage.say(`dragging point ${held.index}: setPinnedPoint(${held.index}, ${pinWhileDragging}) then setPointPosition on every move`, 'ok');
        e.preventDefault();
      },
      { signal: stage.signal },
    );
    window.addEventListener('pointermove', (e) => held && move(held.index, ...local(e)), { signal: stage.signal });
    window.addEventListener(
      'pointerup',
      () => {
        if (!held) return;
        drop(held.index, held.was);
        stage.say(pinWhileDragging ? `point ${held.index} released: pinned while held, then unpinned` : `point ${held.index} released: it was never pinned, so the forces pull it back`);
        held = undefined;
      },
      { signal: stage.signal },
    );
    stage.toggle('Pin while dragging', true, (on) => (pinWhileDragging = on));
    stage.say('Drag any point.');
  } else {
    // A card has no pointer: a scripted drag makes the same calls, with the pretend pointer showing where.
    const pointer = ghost(stage.div, graph);
    const scripted = async (pin: boolean): Promise<void> => {
      const index = 3;
      stage.say(pin ? 'setPinnedPoint(i, true), then setPointPosition(i, x, y) while dragging' : 'dragging without pinning: setPointPosition only');
      const p = graph.getPointPositions();
      const [x0, y0] = [p[index * 2] ?? 0, p[index * 2 + 1] ?? 0];
      const was = grab(index, pin);
      for (let k = 0; k <= 24; k++) {
        const a = (k / 24) * Math.PI;
        graph.setPointPosition(index, x0 + Math.sin(a) * 90, y0 + (1 - Math.cos(a)) * 30);
        const [sx, sy] = graph.spaceToScreenPosition([x0 + Math.sin(a) * 90, y0 + (1 - Math.cos(a)) * 30]);
        pointer.moveTo(sx, sy);
        await stage.wait(40);
      }
      drop(index, was);
      stage.say(pin ? 'released: it stayed while pinned, now free again' : 'released unpinned: the forces take it back');
    };
    stage.cycle([{ run: () => scripted(true), hold: 2000 }, { run: () => scripted(false), hold: 2200 }], 600);
  }
  return () => stage.dispose();
};

export default mount;
