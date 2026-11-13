// Named palette maps for the workspace palette example
// Keys must start with --psp-user--gradient-, --psp-user--palette- or --psp-user--color-.
// A gradient positions every stop; a palette lists colours with no positions.
export const PALETTES: Record<string, Record<string, string>> = {
  warm: {
    '--psp-user--gradient-heat': 'linear-gradient(to right, #2a1d18 0%, #ff7a2f 60%, #f6c453 100%)',
    '--psp-user--palette-brand': 'linear-gradient(to right, #ff7a2f, #f6c453, #a8325e)',
    '--psp-user--palette-spare': 'linear-gradient(to right, #ffffff, #000000)',
  },
  cool: {
    '--psp-user--gradient-heat': 'linear-gradient(to right, #101a2a 0%, #3d9be0 60%, #b6f0ff 100%)',
    '--psp-user--palette-brand': 'linear-gradient(to right, #3d9be0, #7ad17a, #b07ae0)',
  },
  diverging: {
    '--psp-user--gradient-heat': 'linear-gradient(to right, #0366d6 0%, #1a1a1a 50%, #ff7f0e 100%)',
    '--psp-user--palette-brand': 'linear-gradient(to right, #2771a8, #8b86ff, #ff471e)',
  },
};
