<!-- source: https://www.leaferjs.com/ui/en/guide/install/ui/core/ -->

# Cross-platform Core Package 

## @leafer-ui/core 

By importing `@leafer-ui/draw` (cross-platform rendering core package without interaction features), `@leafer-ui/core` (cross-platform core package, extends draw and includes interaction features), and `@leafer-ui/interface` (type interfaces) as external dependencies, you can develop cross-platform plugins and product features.

Platform packages such as `leafer-ui` are built on top of the `@leafer-ui/core` package, combining platform-specific capabilities.

## Pluggable rendering architecture 

Core logic and rendering implementation are decoupled, allowing future support for WebGL, WebGPU, Skia, and various platforms.

By replacing rendering-related sub-packages such as `@leafer/renderer`, `@leafer/canvas`, `@leafer/image`, and `@leafer-ui/web`, and recombining them in custom platform builds, the system can adapt to different renderers and platforms.
