// Image node: src picks the picture, size scales it
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { avatar, glyph, picture } from '../../shared/images.ts';

// The docs point src at a remote URL; these generated data URLs stand in for it.
const SOURCES = { avatar: avatar(0), picture: picture(1), glyph: glyph(2, '#5B8FF9') } as const;
type Source = keyof typeof SOURCES;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node1', style: { size: 60, src: SOURCES.avatar } }] },
        node: { type: 'image' },
        plugins: [{ type: 'grid-line', size: 30 }],
      }),
    );
    await graph.render();

    const update = async (style: { size?: number; src?: string }): Promise<void> => {
      graph.updateNodeData([{ id: 'node1', style }]);
      await graph.draw();
    };

    if (stage.bar) {
      slider(stage.bar, 'size', [10, 120, 1], 60, (v) => void update({ size: v }));
      select(stage.bar, 'src', Object.keys(SOURCES) as Source[], 'avatar', (v) => void update({ src: SOURCES[v] }));
    } else {
      const order: Source[] = ['avatar', 'picture', 'glyph'];
      stage.every(1300, (i) => update({ src: SOURCES[order[i % 3]!], size: 60 + (i % 2) * 30 }));
    }
  });

export default mount;
