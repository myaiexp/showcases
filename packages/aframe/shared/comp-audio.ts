// Sounds generated in code as WAV blob: URLs, for the sound component and <a-sound>
/**
 * The docs play `river.mp3` and `ticklelaugh.mp3`. Examples have no sound files, so each helper
 * here renders a short mono 16-bit WAV in memory and returns a `blob:` URL (made in the calling
 * realm, so call it from an example's `scene()`, `setup` or `run`). Put it in an `<audio id>` in
 * `<a-assets>` and point `sound="src: #id"` at it, as the docs' preloading section does.
 * Examples that use these set `audio: true` in meta.ts, so their gallery card never mounts.
 */

const RATE = 22050;

/** Renders `render(t)` (t in seconds, return -1..1) for `seconds` and wraps it as a WAV blob: URL. */
export function wavUrl(seconds: number, render: (t: number, i: number) => number, rate = RATE): string {
  const n = Math.floor(seconds * rate);
  const buf = new ArrayBuffer(44 + n * 2);
  const v = new DataView(buf);
  const str = (o: number, s: string): void => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, 'RIFF');
  v.setUint32(4, 36 + n * 2, true);
  str(8, 'WAVE');
  str(12, 'fmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, rate, true);
  v.setUint32(28, rate * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  str(36, 'data');
  v.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) {
    const s = Math.max(-1, Math.min(1, render(i / rate, i)));
    v.setInt16(44 + i * 2, s * 32767, true);
  }
  return URL.createObjectURL(new Blob([buf], { type: 'audio/wav' }));
}

const TAU = Math.PI * 2;

/** A decaying bell: a note with two overtones. */
function bell(t: number, freq: number): number {
  const env = Math.exp(-t * 5);
  return env * (Math.sin(TAU * freq * t) + 0.4 * Math.sin(TAU * freq * 2.01 * t) + 0.2 * Math.sin(TAU * freq * 3.2 * t)) * 0.45;
}

export const sounds = {
  /** A 0.9 s bell with a rising two-note chime: a button or a click. */
  chime: () => wavUrl(0.9, (t) => (t < 0.2 ? bell(t, 660) : bell(t - 0.2, 880))),
  /** A 0.35 s falling blip: a laugh stand-in for "play when clicked". */
  blip: () => wavUrl(0.35, (t) => Math.sin(TAU * (900 - t * 1400) * t) * Math.exp(-t * 7) * 0.6),
  /** A 2 s looping pad: a slow chord with a gentle swell, steady enough to hear it move in space. */
  drone: () =>
    wavUrl(2, (t) => {
      const swell = 0.7 + 0.3 * Math.sin(TAU * t * 0.5);
      return swell * 0.25 * (Math.sin(TAU * 220 * t) + Math.sin(TAU * 277.18 * t) + Math.sin(TAU * 329.63 * t));
    }),
  /** A 1.5 s burst of smoothed noise: wind or running water, for the "river" examples. */
  river: () => {
    let a = 0;
    let b = 0;
    let seed = 7;
    return wavUrl(1.5, () => {
      seed = (seed * 16807) % 2147483647;
      const white = (seed / 2147483647) * 2 - 1;
      a += (white - a) * 0.12;
      b += (a - b) * 0.3;
      return b * 1.6;
    });
  },
};
