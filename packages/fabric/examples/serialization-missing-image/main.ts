// Serialization: loadFromJSON with an image that fails to load, and a reviver fallback
import { Canvas, Rect, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel } from '../../shared/code-panel.ts';
import { checkbox } from '../../shared/controls.ts';
import { pictureURL } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';

const BROKEN = 'data:image/png;base64,AAAA'; // decodes to nothing: the image cannot load

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'saved JSON'],
    scene: [200, 200],
    hint: 'The saved scene holds two images; one src is broken. Without a reviver that image is simply left out. A reviver that returns an object stands in for it.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);

  const json = {
    version: '7.4.0',
    background: '#fff7d6',
    objects: [
      { type: 'Image', left: 56, top: 100, width: 80, height: 110, src: pictureURL('fruit', 80, 110) },
      { type: 'Image', left: 144, top: 100, width: 80, height: 110, src: BROKEN },
    ],
  };

  const load = async (withFallback: boolean): Promise<void> => {
    const log: string[] = [];
    await canvas.loadFromJSON(
      json,
      withFallback
        ? (serialized, instance, error) => {
            log.push(`${serialized.type}: ${instance ? 'loaded' : `failed -> placeholder (${error?.message?.slice(0, 22)}...)`}`);
            if (!instance) {
              // Only a returned object is used, and only when the original failed.
              return new Rect({ left: serialized.left, top: serialized.top, width: serialized.width, height: serialized.height, fill: '#e8e0cf', stroke: '#b55', strokeDashArray: [6, 4] }) as never;
            }
          }
        : undefined,
    );
    if (stage.disposed) return;
    canvas.requestRenderAll(); // loadFromJSON does not repaint by itself
    const kinds = canvas.getObjects().map((o) => (o.constructor as typeof FabricObject).type);
    show(`${JSON.stringify({ ...json, objects: json.objects.map((o) => ({ ...o, src: o.src.slice(0, 28) + '...' })) }, null, 1)}`);
    say(`objects on canvas: ${kinds.join(', ') || 'none'}` + (log.length ? `\n${log.join('\n')}` : ''));
  };

  if (stage.bar) {
    checkbox(stage.bar, 'reviver returns a placeholder on error', false, (on) => void load(on));
    void load(false);
  } else {
    let on = false;
    void load(on);
    stage.every(2000, () => void load((on = !on)));
  }

  return stage.dispose;
};

export default mount;
