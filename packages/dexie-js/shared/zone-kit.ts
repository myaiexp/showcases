// Dexie.Promise.PSD (the "zone") through the typed surface: read it, open a new one
import Dexie from 'dexie';

interface PsdApi {
  readonly PSD: Record<string, unknown>;
  newPSD<T>(fn: () => T): T;
}

const api = (): PsdApi => Dexie.Promise as unknown as PsdApi;

/** The zone the running code is in (Dexie.Promise.PSD). */
export function zone(): Record<string, unknown> {
  return api().PSD;
}

/** Runs `fn` in a fresh zone that derives from the current one (Dexie.Promise.newPSD). */
export function newZone<T>(fn: () => T): T {
  return api().newPSD(fn);
}
