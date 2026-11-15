// An HTML menu opened by the point, link and background context-menu callbacks
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { eventLog } from '../../shared/log.ts';
import { web } from '../../shared/static-layouts.ts';
import { load } from '../../shared/load.ts';
import './style.css';

interface Item {
  label: string;
  run: () => void;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Right-click a point, a link or the background.' });
  const log = eventLog(stage);
  const data = web(8, 3, 34); // long links, so a right-click can tell a link from its two points
  let menu: HTMLDivElement | undefined;

  const close = (): void => {
    menu?.remove();
    menu = undefined;
  };
  // Opens the menu at the event position (relative to the graph box) and returns its first item.
  const open = (event: MouseEvent, title: string, items: Item[]): HTMLButtonElement | undefined => {
    event.preventDefault();
    close();
    const box = stage.div.getBoundingClientRect();
    const m = document.createElement('div');
    m.className = 'cm-menu';
    const head = document.createElement('div');
    head.className = 'cm-title';
    head.textContent = title;
    m.append(head);
    for (const item of items) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'cm-item';
      b.textContent = item.label;
      b.addEventListener('click', () => {
        close();
        item.run();
        log(`Menu item "${item.label}" ran`, 'ok');
      });
      m.append(b);
    }
    stage.div.append(m);
    const x = Math.min(event.clientX - box.left, box.width - m.offsetWidth - 4);
    const y = Math.min(event.clientY - box.top, box.height - m.offsetHeight - 4);
    m.style.left = `${Math.max(2, x)}px`;
    m.style.top = `${Math.max(2, y)}px`;
    menu = m;
    return m.querySelector('button') ?? undefined;
  };
  document.addEventListener('pointerdown', (e) => menu && !menu.contains(e.target as Node) && close(), { signal: stage.signal });
  document.addEventListener('keydown', (e) => e.key === 'Escape' && close(), { signal: stage.signal });
  stage.onDispose(close);

  const graph: Graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 10,
        linkDefaultColor: '#8a93a3',
        linkDefaultWidth: 3,
        enableSimulation: false, // a fixed web: the layout stays still
        rescalePositions: false,
        hoveredLinkColor: '#ffd84d',
        renderHoveredPointRing: true,
        fitViewDelay: 300,
        fitViewPadding: 0.2,
        onContextMenu: (index, _position, event) => {
          log(`onContextMenu: ${index === undefined ? 'no point' : `point ${index}`} (${event.clientX.toFixed(0)}, ${event.clientY.toFixed(0)})`);
        },
        onPointContextMenu: (index, _position, event) => {
          log(`onPointContextMenu: point ${index}`, 'ok');
          open(event, `Point ${index}`, [
            { label: 'Focus point', run: () => graph.setConfigPartial({ focusedPointIndex: index }) },
            { label: 'Highlight neighbours', run: () => graph.setConfigPartial({ highlightedPointIndices: [index, ...graph.getNeighboringPointIndices(index)] }) },
            { label: 'Zoom to point', run: () => graph.zoomToPointByIndex(index, 600, 3) },
          ]);
        },
        onLinkContextMenu: (linkIndex, event) => {
          log(`onLinkContextMenu: link ${linkIndex}`, 'ok');
          open(event, `Link ${linkIndex}`, [
            { label: 'Focus link', run: () => graph.setConfigPartial({ focusedLinkIndex: linkIndex }) },
            { label: 'Highlight its points', run: () => graph.setConfigPartial({ highlightedPointIndices: graph.getConnectedPointIndices(linkIndex) }) },
          ]);
        },
        onBackgroundContextMenu: (event) => {
          log('onBackgroundContextMenu', 'warn');
          open(event, 'Background', [
            { label: 'Fit view', run: () => graph.fitView(500) },
            { label: 'Clear focus and highlight', run: () => graph.setConfigPartial({ focusedPointIndex: undefined, focusedLinkIndex: undefined, highlightedPointIndices: undefined }) },
          ]);
        },
      },
      stage.device(),
    ),
  );
  load(graph, data);
  log('Waiting for a right-click');

  if (stage.preview) {
    // A pretend right-click opens the menu, then a pretend click picks its first item.
    const pointer = ghost(stage.div, graph);
    const link = 45;
    let n = 0;
    stage.after(1000, () => stage.every(3200, () => {
      const step = n++ % 3;
      pointer.leave();
      if (step === 0) pointer.toPoint(12);
      else if (step === 1) pointer.toLink(data.links[link * 2] ?? 0, data.links[link * 2 + 1] ?? 0);
      else pointer.moveTo(10, 12);
      stage.after(500, () => pointer.contextMenu());
      stage.after(1900, () => menu?.querySelector('button')?.click());
    }));
  }
  return () => stage.dispose();
};

export default mount;
