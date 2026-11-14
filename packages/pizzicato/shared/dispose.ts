// Stops and disconnects what build() returned: sounds, groups, effects
import Pizzicato from 'pizzicato';

/** Stops an effect's own oscillators (LFOs), which would otherwise run for the page's life. */
function stopOscillators(effect: object): void {
  for (const value of Object.values(effect)) {
    if (value instanceof OscillatorNode) {
      try {
        value.stop();
      } catch {
        // Never started, or already stopped: nothing is running.
      }
    }
  }
}

function release(value: unknown, seen: Set<unknown>): void {
  if (!value || typeof value !== 'object' || seen.has(value)) return;
  seen.add(value);
  if (value instanceof Pizzicato.Sound || value instanceof Pizzicato.Group) {
    value.stop();
    value.disconnect();
    for (const effect of value.effects) release(effect, seen);
    if (value instanceof Pizzicato.Group) for (const sound of value.sounds) release(sound, seen);
    return;
  }
  if (Pizzicato.Util.isEffect(value)) {
    stopOscillators(value);
    value.disconnect();
    return;
  }
  if (value instanceof AudioScheduledSourceNode) {
    try {
      value.stop();
    } catch {
      // Never started: nothing to stop.
    }
  }
  if (value instanceof AudioNode) {
    value.disconnect();
    return;
  }
  if (Array.isArray(value)) for (const v of value) release(v, seen);
  else if (Object.getPrototypeOf(value) === Object.prototype) for (const v of Object.values(value)) release(v, seen);
}

/** Releases `g`, and everything in it when it is an array or a plain object. */
export function releaseAll(g: unknown): void {
  release(g, new Set());
}

/** Stops every Sound and Group in `g` (a value, array or plain object), without disconnecting. */
export function stopAll(g: unknown): void {
  const visit = (value: unknown, depth: number): void => {
    if (!value || typeof value !== 'object' || depth > 3) return;
    if (value instanceof Pizzicato.Sound || value instanceof Pizzicato.Group) value.stop();
    else if (Array.isArray(value)) for (const v of value) visit(v, depth + 1);
    else if (Object.getPrototypeOf(value) === Object.prototype) for (const v of Object.values(value)) visit(v, depth + 1);
  };
  visit(g, 0);
}
