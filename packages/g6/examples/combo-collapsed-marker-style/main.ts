// Collapsed marker styling: fill, font size, and a custom type function for the text
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: [
            { id: 'a1', combo: 'c1', style: { x: 60, y: 90 } },
            { id: 'a2', combo: 'c1', style: { x: 110, y: 120 } },
            { id: 'a3', combo: 'c1', style: { x: 90, y: 60 } },
            { id: 'b1', combo: 'c2', style: { x: 200, y: 90 } },
            { id: 'b2', combo: 'c2', style: { x: 250, y: 120 } },
          ],
          combos: [
            { id: 'c1', style: { collapsed: true } },
            { id: 'c2', style: { collapsed: true } },
          ],
        },
        combo: {
          style: {
            collapsedSize: 60,
            collapsedFill: '#1d2a44',
            collapsedStroke: '#1783FF',
            collapsedMarkerFill: '#1783FF',
            collapsedMarkerFontSize: 28,
            collapsedMarkerFontWeight: 'bold',
            // A function gets the children and returns the marker text.
            collapsedMarkerType: (children: unknown[]) => `${children.length} items`,
            labelText: (d) => d.id,
          },
        },
      }),
    );
    await graph.render();
    const set = async (size: number): Promise<void> => {
      graph.setCombo({
        style: {
          collapsedSize: 60,
          collapsedFill: '#1d2a44',
          collapsedStroke: '#1783FF',
          collapsedMarkerFill: size > 20 ? '#1783FF' : '#FF7A45',
          collapsedMarkerFontSize: size,
          collapsedMarkerFontWeight: 'bold',
          collapsedMarkerType: (children: unknown[]) => `${children.length} items`,
          labelText: (d: { id: string }) => d.id,
        },
      });
      await graph.draw();
    };
    if (stage.bar) slider(stage.bar, 'collapsedMarkerFontSize', [8, 40, 1], 28, (v) => void set(v));
    else stage.every(1200, (i) => set([28, 14, 20, 36][i % 4]!));
  });

export default mount;
