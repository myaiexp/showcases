// Loads A-Frame inside an example's iframe (frame.ts imports this only there)
import AFRAME from 'aframe';
import type { AFrame } from './types.ts';

export default AFRAME as unknown as AFrame;
