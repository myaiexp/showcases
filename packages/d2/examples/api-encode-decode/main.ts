// encode and decode: D2 source to a short compressed string, and back
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SOURCES = [
  'x -> y: hello world',
  'direction: right\nweb -> api -> db\ndb.shape: cylinder',
  'shape: sequence_diagram\nalice -> bob: ping\nbob -> alice: pong',
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const d2 = await stage.d2();
  const panel = stage.side('encode() and decode()');
  const pre = document.createElement('pre');
  pre.className = 'dd-pre';
  panel?.append(pre);

  const run = async (source: string): Promise<void> => {
    try {
      // encode compresses the source into URL-safe text; decode gives the source back.
      const encoded = await d2.encode(source);
      const decoded = await d2.decode(encoded);
      const result = await d2.compile(decoded, { themeID: 200, pad: 24 });
      stage.show(await d2.render(result.diagram, result.renderOptions));
      pre.textContent = `source (${source.length} chars):\n${source}\n\nencode() → ${encoded.length} chars:\n${encoded}\n\ndecode() gives the source back: ${decoded === source}`;
      stage.say(`encode() → ${encoded}`);
    } catch (err) {
      stage.fail(err);
    }
  };

  if (stage.preview) {
    let i = 0;
    await run(SOURCES[0]!);
    stage.every(3000, () => void run(SOURCES[(i = (i + 1) % SOURCES.length)]!));
  } else {
    const editor = document.createElement('textarea');
    editor.className = 'dd-editor';
    editor.value = SOURCES[1]!;
    editor.setAttribute('aria-label', 'D2 source to encode');
    panel?.prepend(editor);
    let typing = 0;
    editor.addEventListener('input', () => {
      clearTimeout(typing);
      typing = window.setTimeout(() => void run(editor.value), 300);
    });
    stage.onDispose(() => clearTimeout(typing));
    await run(editor.value);
  }
  return () => stage.dispose();
};

export default mount;
