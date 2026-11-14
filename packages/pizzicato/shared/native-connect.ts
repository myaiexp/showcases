// Saves the browser's own AudioNode.connect before Pizzicato replaces it page-wide
/**
 * Pizzicato's Shims.js swaps AudioNode.prototype.connect for a version that accepts its
 * effects but drops connect()'s output and input indices. entry.ts imports this module
 * first, so the native method is captured before Pizzicato's module body runs.
 */
export const nativeConnect: AudioNode['connect'] | undefined =
  typeof AudioNode === 'undefined' ? undefined : AudioNode.prototype.connect;
