// Localization: text elements with keys, plural messages and a locale switch
import type { Mount } from '@/types.ts';
import { addButton, addElement, addText, color, COL, createUi, every } from '../../shared/ui.ts';

// The localization file format: header.version 1, then one entry per locale. A message is a
// string, or an array with one string per plural form of the language (English: one, other).
const FILE = {
  header: { version: 1 },
  data: [
    { info: { locale: 'en-US' }, messages: { title: 'Treasure Hunt', play: 'Play', coins: ['You have {number} coin', 'You have {number} coins'] } },
    { info: { locale: 'fr-FR' }, messages: { title: 'Chasse au trésor', play: 'Jouer', coins: ['Vous avez {number} pièce', 'Vous avez {number} pièces'] } },
    { info: { locale: 'de-DE' }, messages: { title: 'Schatzsuche', play: 'Spielen', coins: ['Du hast {number} Münze', 'Du hast {number} Münzen'] } },
    { info: { locale: 'es-ES' }, messages: { title: 'Búsqueda del tesoro', play: 'Jugar', coins: ['Tienes {number} moneda', 'Tienes {number} monedas'] } },
  ],
};
const LOCALES = FILE.data.map((d) => d.info.locale);

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);
  const { i18n } = ui.app;
  i18n.addData(FILE);

  addElement(ui.screen, 'panel', { width: 500, height: 290, color: color(COL.panel) }, [0, 20]);
  // A text element with a key shows that message in the current locale and follows locale changes.
  const title = addText(ui, ui.screen, '', { fontSize: 38 }, [0, 100]);
  title.element!.key = 'title';
  const play = addButton(ui, ui.screen, '', { width: 150, height: 50 }, [0, 20]);
  const playText = addText(ui, play, '', { fontSize: 26, color: color('#161820') });
  playText.element!.key = 'play';

  // Plural messages are looked up from script: getPluralText leaves {number} for us to fill in.
  const coins = addText(ui, ui.screen, '', { fontSize: 26, color: color(COL.dim) }, [0, -45]);
  let count = 1;
  const showCoins = (): void => {
    coins.element!.text = i18n.getPluralText('coins', count).replace('{number}', String(count));
  };
  showCoins();
  i18n.on('change', showCoins);

  LOCALES.forEach((locale, i) => {
    const b = addButton(ui, ui.screen, locale.slice(0, 2).toUpperCase(), { width: 80, height: 40, tint: COL.blue }, [(i - 1.5) * 95, -110]);
    b.button!.on('click', () => (i18n.locale = locale));
  });

  // The card cycles locale and coin count itself; in the full view the buttons do.
  if (ctx.preview) {
    every(ui.app, 1.6, (n) => {
      count = [1, 2, 5][n % 3]!;
      i18n.locale = LOCALES[n % LOCALES.length]!;
      showCoins();
    });
  } else {
    const more = addButton(ui, ui.screen, '+1 coin', { width: 110, height: 36, tint: COL.green }, [200, -45]);
    more.button!.on('click', () => {
      count++;
      showCoins();
    });
  }

  return () => {
    i18n.removeData(FILE);
    ui.dispose();
  };
};

export default mount;
