// Small shelf of books for the logical-query examples (title, author, genre, year, cover)

export interface ShelfBook {
  title: string;
  author: string;
  genre: string;
  /** A string on purpose: Fuse searches text, and "^19" then means "starts with 19". */
  year: string;
  color: string;
}

export const SHELF_BOOKS: ShelfBook[] = [
  { title: "Old Man's War", author: 'John Scalzi', genre: 'Science fiction', year: '2005', color: 'blue' },
  { title: 'The Lock Artist', author: 'Steve Hamilton', genre: 'Crime', year: '2009', color: 'green' },
  { title: 'Old Yeller', author: 'Fred Gipson', genre: 'Classic', year: '1956', color: 'red' },
  { title: 'Artist for Life', author: 'Michelangelo', genre: 'Biography', year: '1550', color: 'blue' },
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: '1937', color: 'green' },
  { title: 'Dune', author: 'Frank Herbert', genre: 'Science fiction', year: '1965', color: 'orange' },
  { title: 'Redshirts', author: 'John Scalzi', genre: 'Science fiction', year: '2012', color: 'red' },
  { title: 'Lockwood and Co', author: 'Jonathan Stroud', genre: 'Fantasy', year: '2013', color: 'blue' },
];
