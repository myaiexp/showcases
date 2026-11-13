// Builds an ExtSplats from a pushSplat-style generator, ready for covSplats
import { ExtSplats, type PackedSplats } from '@sparkjsdev/spark';

/**
 * Pushes splats into a scratch ExtSplats, then wraps its arrays in a new ExtSplats built
 * from `extArrays`, which is the path that uploads the GPU textures (the construct
 * callback path of a SplatMesh left them empty here). `push` can be any code written
 * for a PackedSplats, since ExtSplats has the same pushSplat().
 */
export function buildExtSplats(push: (splats: PackedSplats) => void): ExtSplats {
  const scratch = new ExtSplats();
  push(scratch as unknown as PackedSplats);
  return new ExtSplats({ extArrays: scratch.extArrays, numSplats: scratch.numSplats });
}
