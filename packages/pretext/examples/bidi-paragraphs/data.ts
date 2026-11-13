// Mixed-direction sample paragraphs and the font list for the bidi-paragraphs example
export interface Para {
  dir: 'ltr' | 'rtl';
  text: string;
}

export const PARAS: Para[] = [
  {
    dir: 'ltr',
    text: 'The sign read שלום עולם (shalom olam) 2026, and beneath it مرحبا بالعالم (hello world) in Arabic, 15.99 USD.',
  },
  {
    dir: 'rtl',
    text: 'بدأت الرحلة في 12 مارس 2026 مع Pretext (النسخة 1.0.0) ثم انتقلنا إلى القاهرة، وبعد ذلك سافرنا إلى Tokyo عبر Dubai.',
  },
  {
    dir: 'rtl',
    text: 'הטקסט הזה כתוב בעברית עם מילים באנגלית כמו Pretext 1.0 ומספרים 2026, ובסוף סוגריים (כך).',
  },
];

// A shorter Arabic paragraph for the 200px preview card.
export const PREVIEW_PARA: Para = {
  dir: 'rtl',
  text: 'بدأت الرحلة في 12 مارس 2026 مع Pretext (1.0.0) ثم انتقلنا.',
};

// A named font per script, as the Caveats ask: Inter for Latin, then a named Hebrew and Arabic face
// per platform (DejaVu Sans on Linux, Arial Hebrew and Geeza Pro on macOS, Segoe UI on Windows).
export const FAMILY = '"Inter Variable", "DejaVu Sans", "Arial Hebrew", "Geeza Pro", "Segoe UI", sans-serif';
export const FONT = `16px ${FAMILY}`;
export const LINE_HEIGHT = 24;
