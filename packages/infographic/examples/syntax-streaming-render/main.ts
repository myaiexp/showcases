// Streaming: append syntax chunks to a buffer and re-render on every chunk
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const FULL = `infographic list-row-horizontal-icon-arrow
theme dark
data
  title Customer Growth Engine
  desc Multi-channel reach and repeat purchases
  lists
    - label Lead Acquisition
      value 18.6
      desc Channel investment and content marketing
      icon rocket
    - label Conversion
      value 12.4
      desc Lead scoring and automated follow-ups
      icon chart-line
    - label Loyalty Boost
      value 9.8
      desc Membership programs and benefits
      icon users
    - label Brand Advocacy
      value 6.2
      desc Community rewards and referral loops
      icon bullhorn
`;

// Cut the text into uneven slices, so some end in the middle of a word.
const CHUNKS: string[] = [];
for (let i = 0, n = 0; i < FULL.length; n++) {
  const size = 24 + ((n * 17) % 31);
  CHUNKS.push(FULL.slice(i, i + size));
  i += size;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The whole buffer is rendered again after each chunk.' });
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('Buffer');
  const step = ctx.preview ? 280 : 320;

  void (async () => {
    for (;;) {
      let buffer = '';
      for (const [i, chunk] of CHUNKS.entries()) {
        buffer += chunk;
        infographic.render(buffer);
        if (code) code.textContent = buffer;
        stage.say(`chunk ${i + 1} of ${CHUNKS.length}: ${buffer.length} characters`);
        await stage.wait(step);
      }
      await stage.wait(2200);
    }
  })().catch((err: unknown) => {
    if (!stage.disposed) console.error('streaming loop failed', err);
  });

  return () => stage.dispose();
};

export default mount;
