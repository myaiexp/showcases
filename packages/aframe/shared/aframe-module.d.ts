// aframe ships no types: boot.ts casts its default export to ./types.ts AFrame
declare module 'aframe' {
  const AFRAME: unknown;
  export default AFRAME;
}
