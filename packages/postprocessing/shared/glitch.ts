// Glitch examples: GlitchMode names for selects and a card-side status line
import { GlitchMode } from 'postprocessing';

export const MODE_NAMES = ['DISABLED', 'SPORADIC', 'CONSTANT_MILD', 'CONSTANT_WILD'] as const;
export type ModeName = (typeof MODE_NAMES)[number];

/** The GlitchMode value for a name. */
export const modeValue = (name: ModeName): number => GlitchMode[name];
