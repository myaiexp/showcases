// What `import Pizzicato from 'pizzicato'` resolves to: the library, minus its connect bug
import { nativeConnect } from './native-connect.ts';
import Pizzicato from 'pizzicato/distr/Pizzicato.min.js';

/**
 * vite.config.ts points the bare `pizzicato` import here, so the examples import the real
 * library by its real name. Pizzicato replaces AudioNode.prototype.connect for the whole
 * page with `connect(node)`: it maps a Pizzicato effect to its input node, but it drops the
 * output and input indices and returns the wrong value. In a single-page gallery that would
 * break stereo routing in every other audio package (Tone.js splits and merges channels)
 * once a Pizzicato example had loaded. This puts back a connect that keeps Pizzicato's
 * effect mapping and passes everything else through to the browser's own method.
 */
if (nativeConnect && AudioNode.prototype.connect !== nativeConnect) {
  const native = nativeConnect as (this: AudioNode, ...args: unknown[]) => unknown;
  AudioNode.prototype.connect = function (this: AudioNode, dest: unknown, ...rest: unknown[]) {
    const effect = Pizzicato.Util.isEffect(dest) ? (dest as { inputNode: AudioNode }) : null;
    const result = native.call(this, effect ? effect.inputNode : dest, ...rest);
    return effect ? dest : result;
  } as AudioNode['connect'];
}

export default Pizzicato;
