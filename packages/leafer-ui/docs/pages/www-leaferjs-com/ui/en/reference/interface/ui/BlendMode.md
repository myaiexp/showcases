<!-- source: https://www.leaferjs.com/ui/en/reference/interface/ui/BlendMode.html -->

# BlendMode 

Blend modes. Learn about blending principles and blending effects.

ts

```
type BlendMode =
  | 'pass-through' // Pass-through, best performance
  | 'normal' // Normal, rendered on a separate layer; heavy use may affect performance
  | 'multiply' // Multiply---
  | 'darken' // Darken
  | 'color-burn' // Color burn
  | 'lighten' // Lighten---
  | 'color-dodge' // Color dodge
  | 'screen' // Screen
  | 'overlay' // Overlay---
  | 'hard-light' // Hard light
  | 'soft-light' // Soft light
  | 'difference' // Difference---
  | 'exclusion' // Exclusion
  | 'hue' // Hue ---
  | 'saturation' // Saturation
  | 'color' // Color
  | 'luminosity' // Luminosity
```

## Pass-through Mode 

Child blend modes of an element (such as fill, stroke, and effect blend modes) can blend independently with the content below.

Otherwise, child blend modes only affect the current element layer, and then the element as a whole blends with the content below.
