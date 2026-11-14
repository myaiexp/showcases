// Sample collections: books, fruit, accented cities, products, files, commands

export interface Book {
  title: string;
  author: string;
  year: number;
  genre: string;
  tags: string[];
}

/** The docs' sample books first, then more titles in the same shape. */
export const BOOKS: Book[] = [
  { title: "Old Man's War", author: 'John Scalzi', year: 2005, genre: 'Science fiction', tags: ['war', 'space', 'aliens'] },
  { title: 'The Lock Artist', author: 'Steve Hamilton', year: 2009, genre: 'Crime', tags: ['heist', 'safes'] },
  { title: 'HTML5', author: 'Remy Sharp', year: 2010, genre: 'Programming', tags: ['web', 'markup'] },
  { title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', year: 2008, genre: 'Programming', tags: ['web', 'language'] },
  { title: 'JavaScript Patterns', author: 'Stoyan Stefanov', year: 2010, genre: 'Programming', tags: ['design', 'web'] },
  { title: 'Artist for Life', author: 'Michelangelo', year: 1550, genre: 'Biography', tags: ['art', 'painting'] },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, genre: 'Classic', tags: ['jazz age', 'wealth'] },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, genre: 'Classic', tags: ['justice', 'childhood'] },
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', year: 1967, genre: 'Classic', tags: ['family', 'magic'] },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951, genre: 'Classic', tags: ['youth'] },
  { title: 'Brave New World', author: 'Aldous Huxley', year: 1932, genre: 'Science fiction', tags: ['dystopia', 'future'] },
  { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', year: 1969, genre: 'Science fiction', tags: ['winter', 'aliens'] },
  { title: 'Dune', author: 'Frank Herbert', year: 1965, genre: 'Science fiction', tags: ['desert', 'empire'] },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, genre: 'Fantasy', tags: ['dragon', 'quest'] },
  { title: 'A Wizard of Earthsea', author: 'Ursula K. Le Guin', year: 1968, genre: 'Fantasy', tags: ['magic', 'islands'] },
  { title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, genre: 'Classic', tags: ['marriage', 'manners'] },
];

/** The fuzzy-search page's list, plus a few more. */
export const FRUITS = ['apple', 'banana', 'orange', 'grape', 'pineapple', 'apricot', 'mango', 'papaya', 'peach', 'pear', 'plum', 'cherry'];

/** City names with accents, the case ignoreDiacritics is for. */
export const CITIES = [
  'Malmö', 'São Paulo', 'Zürich', 'Kraków', 'Reykjavík', 'Jyväskylä', 'Montréal', 'Besançon',
  'Düsseldorf', 'Córdoba', 'Bogotá', 'Ålesund', 'Łódź', 'Nîmes', 'Göteborg', 'Brasília',
];

export interface Product {
  name: string;
  sku: string;
  category: string;
  price: number;
  description: string;
}

/** A small shop. Descriptions are long on purpose: some words sit past character 60. */
export const PRODUCTS: Product[] = [
  { name: 'MacBook Pro 16"', sku: 'MBP16', category: 'Laptops', price: 2499, description: 'A large professional laptop with a bright screen, long battery life and a quiet aluminium body.' },
  { name: 'Magic Keyboard', sku: 'MK', category: 'Accessories', price: 99, description: 'A slim wireless keyboard that pairs over Bluetooth and charges with a cable, made for desks.' },
  { name: 'Mac Mini M4', sku: 'MM4', category: 'Desktops', price: 599, description: 'A small desktop computer that fits under a monitor and drives two displays without a fan noise.' },
  { name: 'Trail Running Shoes', sku: 'TRS-42', category: 'Sports', price: 129, description: 'Light shoes with a grippy sole for muddy paths, a rock plate, and laces that stay tied in rain.' },
  { name: 'Insulated Parka', sku: 'PRK-9', category: 'Clothing', price: 249, description: 'A long hooded winter coat with down filling, a windproof shell and deep pockets for gloves.' },
  { name: 'Wool Beanie', sku: 'WB-1', category: 'Clothing', price: 25, description: 'A soft merino hat that keeps ears warm on cold mornings and packs into a jacket pocket.' },
  { name: 'Espresso Machine', sku: 'ESP-2', category: 'Kitchen', price: 449, description: 'A compact coffee maker with a steam wand for milk, a pressure gauge and a removable water tank.' },
  { name: 'Cast Iron Skillet', sku: 'CIS-26', category: 'Kitchen', price: 45, description: 'A heavy frying pan that holds heat for searing steak, baking cornbread and frying eggs evenly.' },
  { name: 'Noise Cancelling Headphones', sku: 'NCH-7', category: 'Audio', price: 349, description: 'Over-ear headphones that block engine hum on flights, with a thirty hour battery and a soft case.' },
  { name: 'Bluetooth Speaker', sku: 'BTS-3', category: 'Audio', price: 79, description: 'A waterproof pocket speaker for the beach or the shower, with a strap and a twelve hour battery.' },
  { name: 'Yoga Mat', sku: 'YM-6', category: 'Sports', price: 39, description: 'A thick non-slip mat for stretching and floor workouts that rolls up with a carrying strap.' },
  { name: 'Desk Lamp', sku: 'DL-5', category: 'Home', price: 59, description: 'An adjustable reading light with warm and cool modes, a dimmer and a USB port in the base.' },
];

/** Project files, for prefix, suffix and include operators. */
export const FILES = [
  'src/index.ts', 'src/app.ts', 'src/router.ts', 'src/views/home.ts', 'src/views/settings.ts',
  'src/styles/base.css', 'test/app.test.ts', 'test/router.test.ts', 'scripts/build.js', 'scripts/deploy.sh',
  'server/main.go', 'server/handlers.go', 'README.md', 'package.json', 'docs/guide.md', 'public/logo.svg',
];

export interface Command {
  name: string;
  shortcut: string;
}

/** An editor's command palette. */
export const COMMANDS: Command[] = [
  { name: 'Open File', shortcut: 'Ctrl+O' },
  { name: 'Save All', shortcut: 'Ctrl+Alt+S' },
  { name: 'Toggle Sidebar', shortcut: 'Ctrl+B' },
  { name: 'Format Document', shortcut: 'Shift+Alt+F' },
  { name: 'Go to Line', shortcut: 'Ctrl+G' },
  { name: 'Find in Files', shortcut: 'Ctrl+Shift+F' },
  { name: 'Change Color Theme', shortcut: 'Ctrl+K Ctrl+T' },
  { name: 'Split Editor Right', shortcut: 'Ctrl+\\' },
  { name: 'Close Window', shortcut: 'Alt+F4' },
  { name: 'Rename Symbol', shortcut: 'F2' },
  { name: 'Toggle Word Wrap', shortcut: 'Alt+Z' },
  { name: 'Open Settings', shortcut: 'Ctrl+,' },
];

export interface Person {
  name: string;
  email: string;
  company: string;
}

/** An address book. */
export const PEOPLE: Person[] = [
  { name: 'Jonathan Price', email: 'jon.price@example.com', company: 'Northwind' },
  { name: 'Joanna Lindqvist', email: 'joanna@example.org', company: 'Fabrikam' },
  { name: 'Mikko Virtanen', email: 'mikko.v@example.fi', company: 'Contoso' },
  { name: 'Sara Okafor', email: 'sara.okafor@example.com', company: 'Northwind' },
  { name: 'Lucas Moreau', email: 'l.moreau@example.fr', company: 'Tailspin' },
  { name: 'Aiko Tanaka', email: 'aiko@example.jp', company: 'Contoso' },
  { name: 'Peter Johansson', email: 'peter.j@example.se', company: 'Fabrikam' },
  { name: 'Grace Hopper', email: 'grace@example.com', company: 'Navy' },
  { name: 'Ahmed Haddad', email: 'ahmed.h@example.com', company: 'Tailspin' },
  { name: 'Maria Garcia', email: 'maria.garcia@example.es', company: 'Northwind' },
];
