// Loads a stand-in recording as a file Sound, for examples about something else
import Pizzicato, { type Sound } from 'pizzicato';
import { recording, type RecordingName } from './recordings.ts';

type FileOptions = { loop?: boolean; volume?: number; attack?: number; release?: number; detached?: boolean };

/**
 * `new Pizzicato.Sound({ source: 'file', ... }, callback)` wrapped in a promise. Examples
 * about loading files write the constructor out themselves; the rest use this. Call it
 * inside build(), so a card's sound is made in the card's offline context.
 */
export async function fileSound(name: RecordingName, options: FileOptions = {}): Promise<Sound> {
  const path = await recording(name);
  return new Promise((resolve, reject) => {
    const sound = new Pizzicato.Sound({ source: 'file', options: { path, ...options } }, (error) =>
      error ? reject(error instanceof Error ? error : new Error(`could not load the ${name} recording`)) : resolve(sound),
    );
  });
}
