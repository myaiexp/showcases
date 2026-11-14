// Opens a microphone Sound on demand and reports a refusal as a plain message
import Pizzicato, { type Sound } from 'pizzicato';

/**
 * `new Pizzicato.Sound({ source: 'input' }, callback)`. The browser asks for the microphone
 * the moment this runs, so call it from the first Play, never on mount. `done` gets the
 * sound when the stream is open, or a message when permission was refused (or the page
 * cannot ask: getUserMedia needs https).
 */
export function openMic(volume: number, done: (sound: Sound | null, problem: string | null) => void): void {
  try {
    const sound: Sound = new Pizzicato.Sound({ source: 'input', options: { volume } }, (error) => {
      if (!error) return done(sound, null);
      const name = error instanceof Error ? error.name : '';
      const reasons: Record<string, string> = {
        NotAllowedError: 'The microphone was blocked.',
        NotFoundError: 'No microphone was found.',
      };
      done(null, reasons[name] ?? `No microphone: ${name || 'unknown error'}.`);
    });
  } catch {
    done(null, 'This page cannot reach a microphone.');
  }
}

/** Stops a microphone Sound and turns the microphone off (the browser's recording light goes out). */
export function closeMic(sound: Sound | null): void {
  if (!sound) return;
  const node = sound.sourceNode;
  sound.stop();
  sound.disconnect();
  if (node instanceof MediaStreamAudioSourceNode) for (const track of node.mediaStream.getTracks()) track.stop();
}
