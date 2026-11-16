// Core API / Guides helper: sounds made in code, as WAV blob: URLs
/**
 * Examples never load audio files. `wavUrl` renders a mono 16-bit WAV from a sample function
 * and returns a blob: URL (made in the calling realm, so it dies with the example's iframe).
 */
export function wavUrl(seconds: number, sample: (t: number) => number, rate = 22050): string {
  const n = Math.floor(seconds * rate);
  const buffer = new ArrayBuffer(44 + n * 2);
  const v = new DataView(buffer);
  const text = (at: number, s: string): void => [...s].forEach((c, i) => v.setUint8(at + i, c.charCodeAt(0)));
  text(0, 'RIFF');
  v.setUint32(4, 36 + n * 2, true);
  text(8, 'WAVEfmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, rate, true);
  v.setUint32(28, rate * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  text(36, 'data');
  v.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) v.setInt16(44 + i * 2, Math.max(-1, Math.min(1, sample(i / rate))) * 32767, true);
  return URL.createObjectURL(new Blob([buffer], { type: 'audio/wav' }));
}

/** A soft looping rumble, like the guide's background noise. */
export function rumbleUrl(): string {
  let low = 0;
  return wavUrl(2, (t) => {
    low += (Math.random() * 2 - 1 - low) * 0.05;
    return low * 0.8 * (0.7 + 0.3 * Math.sin(t * Math.PI * 2));
  });
}
