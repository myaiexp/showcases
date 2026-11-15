// @zephyr3d/scene: TypeScript 3D engine (WebGL2 here): PBR, post effects, water, physics
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Zephyr3D',
  npm: '@zephyr3d/scene',
  tagline: 'TypeScript 3D engine for WebGPU and WebGL2: PBR, shadows, post-processing, water, terrain, animation and physics.',
  about:
    'Zephyr3D is a scene-graph engine: an Application owns one rendering device, a Scene holds meshes, lights and cameras, and the Engine renders it every frame with physically based materials, shadow maps and a chain of post effects on the camera. Every example here runs on 0.10.0 with the WebGL2 backend. The engine allows one Application per page, so each example runs in an iframe of its own. Textures and models are generated in code, so nothing fetches. Built from the English docs pages and the tutorial code they include; the editor chapters and the site\'s demos stay out.',
  category: 'Graphics',
  homepage: 'https://github.com/gavinyork/zephyr3d',
  docsUrl: 'https://github.com/gavinyork/zephyr3d/tree/main/apps/doc/web/en',
  repo: 'https://github.com/gavinyork/zephyr3d',
  added: '2026-11-15',
  // The docs sidebar's order (apps/doc/web/en/_sidebar.md), one section per group of the
  // "Using the Scene API" part, then the Device API part. The editor part is left out.
  sections: [
    'Getting Started',
    'Basic Framework',
    'Lighting',
    'Environment',
    'Shadows',
    'Animation',
    'Physics',
    'Post-processing',
    'Scene Picking',
    'Geometry Instancing',
    'Spatial Fields',
    'Character Rendering',
    'Custom Materials',
    'Transparency',
    'Multi-view Rendering',
    'Performance',
    'Advanced Topics',
    'Device API',
  ],
});
