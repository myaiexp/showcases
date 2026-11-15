// An asset manifest in the VFS: fetchTexture('/assets/rock.png') loads the file the build shipped instead
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import { Application, createManifestSourceResolver, DirectionalLight, getEngine, Mesh, PBRMetallicRoughnessMaterial, Scene, SphereShape } from '@zephyr3d/scene';
import { button } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/light-world.ts';
import { bricksAlbedo, checker, png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  // A build ships /assets/rock.1a2b3c4d.png (here: the bricks) and not the source /assets/rock.png.
  // asset-manifest.json at the VFS root maps one to the other. A second manifest elsewhere
  // points the same source path at a different file.
  const VFS = await memoryFiles({
    '/assets/rock.1a2b3c4d.png': png(256, 256, bricksAlbedo),
    '/assets/rock.alt.png': png(256, 256, checker(8, [250, 200, 60], [60, 40, 120])),
    '/asset-manifest.json': JSON.stringify({ version: 1, textures: { '/assets/rock.png': '/assets/rock.1a2b3c4d.png' } }),
    '/game/asset-manifest.json': JSON.stringify({ version: 1, textures: { '/assets/rock.png': '/assets/rock.alt.png' } }),
  });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const engine = getEngine();
  const resources = engine.resourceManager;

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(Vector3.one(), Vector3.zero(), Vector3.axisPY());
  const material = new PBRMetallicRoughnessMaterial();
  material.metallic = 0;
  material.roughness = 0.7;
  new Mesh(scene, new SphereShape({ radius: 1.5 }), material);
  orbitCamera(scene, new Vector3(0, 0, 5), 100);

  const out = stage.readout();
  const show = async (label: string): Promise<void> => {
    // Cached results hide the change of manifest: evict, then load by the *source* path
    resources.clearCache();
    let status: string;
    try {
      material.albedoTexture = await resources.fetchTexture<Texture2D>('/assets/rock.png');
      status = 'fetchTexture(/assets/rock.png) loaded';
    } catch (err) {
      status = `fetchTexture(/assets/rock.png) failed: ${err instanceof Error ? err.message : String(err)}`;
    }
    // Only loads through the resource manager are redirected; a direct read sees the build's files
    let direct: string;
    try {
      const bytes = await resources.assetManager.fetchBinaryData('/assets/rock.png');
      direct = bytes ? `${bytes.byteLength} bytes` : 'not found';
    } catch {
      direct = 'not found';
    }
    stage.caption(label);
    if (out) out.textContent = `${label}\n${status}\nfetchBinaryData(/assets/rock.png): ${direct}`;
  };

  // The engine read /asset-manifest.json while starting up
  await show('startup manifest: /asset-manifest.json (bricks)');

  if (stage.bar) {
    button(stage.bar, "loadAssetManifest('/game/asset-manifest.json')", () => {
      void engine.loadAssetManifest('/game/asset-manifest.json').then(() => show('manifest: /game/asset-manifest.json (checker)'));
    });
    button(stage.bar, 'loadAssetManifest()', () => {
      void engine.loadAssetManifest().then(() => show('manifest: /asset-manifest.json (bricks)'));
    });
    button(stage.bar, 'assetSourceResolver = null', () => {
      resources.assetManager.assetSourceResolver = null;
      void show('no resolver: the source path no longer resolves');
    });
    button(stage.bar, 'own resolver', () => {
      // The manifest is implemented as a resolver; this one is built from an in-code manifest
      resources.assetManager.assetSourceResolver = createManifestSourceResolver(VFS, {
        version: 1,
        textures: { '/assets/rock.png': '/assets/rock.alt.png' },
      });
      void show('createManifestSourceResolver(vfs, manifest) installed by hand');
    });
  } else {
    stage.every(2200, (i) => {
      const alt = i % 2 === 1;
      void engine.loadAssetManifest(alt ? '/game/asset-manifest.json' : '/asset-manifest.json').then(() => show(alt ? 'manifest B: checker' : 'manifest A: bricks'));
    });
  }
  myApp.on('tick', (_dt, ms) => {
    scene.rootNode.children[0]?.rotation.fromEulerAngle(0, ms * 0.0004, 0);
  });
  myApp.run();
});
