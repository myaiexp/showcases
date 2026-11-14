// Loads ammo.js from sync-ammo once per page and sets it as the global Ammo
//
// The rigidbody system looks for a global `Ammo` when the app starts, so physics
// examples await loadAmmo() before createStage(). The global stays for the page: every
// app builds its own dynamics world from it, so sharing it is harmless. sync-ammo is an
// asm.js build (about 2 MB) that is ready on import, so there is no wasm to fetch.

let loading: Promise<void> | undefined;

export function loadAmmo(): Promise<void> {
  loading ??= import('sync-ammo').then((mod) => {
    // The ESM build has one default export; the bundled typings describe its members instead.
    (globalThis as { Ammo?: unknown }).Ammo = (mod as unknown as { default: unknown }).default;
  });
  return loading;
}
