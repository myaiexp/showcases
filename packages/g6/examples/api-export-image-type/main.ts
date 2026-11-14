// toDataURL with each image type, previewed in an <img>
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { dataUrlBytes, gridData, imageBox } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

type ImageType = 'image/png' | 'image/jpeg' | 'image/webp';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [4, 3, 45] : [6, 4, 70];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(cols, rows, gap, 40, 35),
        node: { style: { size: 18, fill: '#5b8ff9' } },
        edge: { style: { stroke: '#8896b3' } },
      }),
    );
    await graph.render();
    const show = imageBox(stage, el);
    let url = '';
    const exportAs = async (type: ImageType) => {
      url = await graph.toDataURL({ type });
      show(url, `type: ${type}\nprefix: ${url.slice(0, url.indexOf(','))}\npayload: ${dataUrlBytes(url)} bytes`);
    };
    await exportAs('image/png');

    if (stage.bar) {
      let type: ImageType = 'image/png';
      select(stage.bar, 'type', ['image/png', 'image/jpeg', 'image/webp'] as const, type, (v) => void exportAs((type = v)));
      // Download is only offered here, in the full view.
      button(stage.bar, 'download', () => {
        const a = document.createElement('a');
        a.href = url;
        a.download = `graph.${type.split('/')[1]}`;
        a.click();
      });
    } else {
      const types: ImageType[] = ['image/png', 'image/jpeg', 'image/webp'];
      stage.every(1500, (i) => exportAs(types[i % types.length]!));
    }
  });

export default mount;
