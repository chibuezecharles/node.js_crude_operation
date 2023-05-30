const db = require('./bookstore');

const getAllBooks = () => {
  const data = JSON.stringify(db);
  return data;
};

const getBooksByCat = (category) => {
  const filteredBooks = db.filter((shelf) => {
    return shelf.category === category;
  });

  return JSON.stringify(filteredBooks);
};

const createBook = (book) => {
  const categoryIndex = db.findIndex((shelf) => shelf.category === book.category);
  if (categoryIndex !== -1) {
    const newBook = {
      id: db[categoryIndex].books.length + 1,
      name: book.name,
      isbn: book.isbn,
      author: book.author,
      pages: book.pages,
    };

    db[categoryIndex].books.push(newBook);
    db[categoryIndex].totalBooks += 1;

    return JSON.stringify(newBook);
  }

  return JSON.stringify({ error: 'Category not found' });
};


const updateBook = (category, updatedBook) => {
  const shelves = db.find((section) => section.category === category);
  if (shelves) {
    const bookToUpdate = shelves.books.find((book) => book.id === updatedBook.id);
    if (bookToUpdate) {
      Object.assign(bookToUpdate, updatedBook);
      console.log(bookToUpdate);
      return 'Book updated successfully.';
    }
    return 'Book not found.';
  }
  return 'Category not found.';
};


const deleteBookByCatAndId = (category, id) => {
  const shelf = db.find((section) => section.category === category);

  if (shelf) {
    const bookIndex = shelf.books.findIndex((book) => book.id === id);

    if (bookIndex !== -1) {
      shelf.books.splice(bookIndex, 1);
      return true; // Return true to indicate successful deletion
    }
  }

  return false; // Return false if the book was not found or deletion failed
};



module.exports = { getAllBooks, getBooksByCat, updateBook,createBook, deleteBookByCatAndId };


// const addBook = (category, book) => {
//   const shelves  =  db.find((section,index) => section.category === category);
//   const id = shelves.books.length + 1 
//   const newBook = book;
//   newBook.id = id;
//   shelves.books.push(newBook);
//   return;
// };

// addBook('science', 
// {
//   id: 2,
//   name:'Advanced Science',
//   isbn:14,
//   author: 'Ugo c. Ugo',
//   pages:1500,
// }
// );

// const test = db.filter((book) => {
//   return book.category === 'science';
// });

// console.log(test[0].books[2]);




