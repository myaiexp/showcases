// The docs' downloadImage recipe, with the exported image previewed beside it
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { dataUrlBytes, gridData, imageBox } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

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
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();
    const show = imageBox(stage, el);
    const preview = async () => {
      const url = await graph.toDataURL();
      show(url, `${dataUrlBytes(url)} bytes as ${url.slice(5, url.indexOf(';'))}\nPan or zoom, then export again.`);
    };
    await preview();

    async function downloadImage() {
      const dataURL = await graph.toDataURL();
      const [head, content] = dataURL.split(',');
      const contentType = head!.match(/:(.*?);/)![1]!;

      const bstr = atob(content!);
      let length = bstr.length;
      const u8arr = new Uint8Array(length);
      while (length--) u8arr[length] = bstr.charCodeAt(length);

      const blob = new Blob([u8arr], { type: contentType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'graph.png';
      a.click();
      // The docs leave the object URL alive; releasing it right after the click is safe.
      URL.revokeObjectURL(url);
    }

    if (stage.bar) {
      button(stage.bar, 'export preview', () => void preview());
      button(stage.bar, 'download graph.png', () => void downloadImage());
    } else {
      stage.every(1500, async (i) => {
        await graph.translateBy([i % 2 ? -30 : 30, 0], false);
        await preview();
      });
    }
  });

export default mount;
