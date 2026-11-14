// Channel solo: soloing one Channel silences all the others
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { band, PARTS, type Band } from '../../shared/band-kit.ts';
import { toneStage } from '../../shared/stage.ts';
import { pads } from '../../shared/widgets.ts';

interface Graph {
  band: Band;
  channels: Tone.Channel[];
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const strips = pads(stage.visual, PARTS.map((p) => `${p}\n`));
  let muted = [false, false, false];
  let soloed = [false, false, false];
  const paint = (m: boolean[], s: boolean[]): void => {
    strips.pads.forEach((p, i) => {
      p.style.opacity = m[i] ? '0.25' : '1';
      p.textContent = `${PARTS[i]}\n${s[i] ? 'SOLO' : m[i] ? 'muted' : 'playing'}`;
      p.style.whiteSpace = 'pre-line';
      p.style.outline = s[i] ? '2px solid #7aa2ff' : 'none';
    });
  };
  const read = (g: Graph): void => {
    muted = g.channels.map((c) => c.muted);
    soloed = g.channels.map((c) => c.solo);
  };

  return stage.run({
    build: (): Graph => {
      const b = band();
      const channels = b.parts.map((p) => {
        const c = new Tone.Channel(0, 0).toDestination();
        p.connect(c);
        return c;
      });
      return { band: b, channels };
    },
    play: (g, time) => {
      const [m, s] = [muted, soloed];
      stage.show(time, () => paint(m, s));
      g.band.start(time, 2, (part, at) => !m[part] && stage.show(at, () => strips.hit(part)));
    },
    stop: (g, time) => g.band.stop(time),
    dispose: (g) => {
      g.channels.forEach((c) => c.dispose());
      g.band.dispose();
    },
    variants: [
      { label: 'nobody soloed', solo: -1 },
      { label: 'solo bass', solo: 0 },
      { label: 'solo keys', solo: 1 },
      { label: 'solo lead', solo: 2 },
    ].map(({ label, solo }) => ({
      label,
      apply: (g: Graph) => {
        g.channels.forEach((c, i) => (c.solo = i === solo));
        read(g);
      },
    })),
    controls: (g) => {
      // Click a strip to solo it; click it again to hear everyone.
      strips.onHit((i) => {
        g.channels[i]!.solo = !g.channels[i]!.solo;
        read(g);
        paint(muted, soloed);
      });
    },
  });
};

export default mount;
