// A custom glTF loader extension that tints every loaded PBR material
import { Color3, PBRMaterial } from '@babylonjs/core';
import { registerGLTFExtension, unregisterGLTFExtension } from '@babylonjs/loaders/glTF/2.0';
import type { GLTFLoader, IGLTFLoaderExtension } from '@babylonjs/loaders/glTF/2.0';

export const NAME = 'showcaseTint';

/** The options a caller passes under pluginOptions.gltf.extensionOptions.showcaseTint. */
export type TintOptions = { color?: [number, number, number]; strength?: number };

// Declaring the options type lets extensionOptions be checked by the compiler.
declare module '@babylonjs/loaders' {
  export interface GLTFLoaderExtensionOptions {
    showcaseTint: TintOptions;
  }
}

class TintExtension implements IGLTFLoaderExtension {
  public readonly name = NAME;
  public enabled = true;
  public order = 100;
  private readonly _loader: GLTFLoader;
  private readonly _options: TintOptions;

  constructor(loader: GLTFLoader) {
    this._loader = loader;
    this._options = loader.parent.extensionOptions[NAME] ?? {};
  }

  /** Runs once the whole file is loaded: blend each albedo colour toward the tint. */
  public onReady(): void {
    const [r, g, b] = this._options.color ?? [1, 0.3, 0.3];
    const strength = this._options.strength ?? 0.6;
    for (const mesh of this._loader.rootBabylonMesh?.getChildMeshes() ?? []) {
      if (mesh.material instanceof PBRMaterial) {
        mesh.material.albedoColor = Color3.Lerp(mesh.material.albedoColor, new Color3(r, g, b), strength);
      }
    }
  }

  public dispose(): void {}
}

/** Registers the extension (second argument false: it is not tied to a glTF format extension). */
export function registerTint(): () => void {
  registerGLTFExtension(NAME, false, (loader) => new TintExtension(loader));
  return () => void unregisterGLTFExtension(NAME);
}
