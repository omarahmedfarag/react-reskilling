import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'cart',
  initialState: {
    books: [],
    searchBooks : [ ]
  },
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
    setSearchBooks(state, action) {
      state.searchBooks = action.payload;
    },
    updateBookShelf(state,action)
    {
      // let book;
      let book = state.books.find(book => book.id === action.payload.book.id);
      if(action.payload.fromSearchPage)
      {
        if(book)
        {
          book.shelf=action.payload.shelf
        }
        else{
          let book = {...action.payload.book};
          book.shelf=action.payload.shelf
          state.books.push(book)
        }
      }
      else
      {
        book.shelf=action.payload.shelf;
      }

    }
  },
  
});

export const booksAction = booksSlice.actions;

export default booksSlice;


// replaceCart(state, action) {
//   state.totalQuantity = action.payload.totalQuantity;
//   state.items = action.payload.items;
// },
// addItemToCart(state, action) {
//   const newItem = action.payload;
//   const existingItem = state.items.find((item) => item.id === newItem.id);
//   state.totalQuantity++;
//   state.changed = true;
//   if (!existingItem) {
//     state.items.push({
//       id: newItem.id,
//       price: newItem.price,
//       quantity: 1,
//       totalPrice: newItem.price,
//       name: newItem.title,
//     });
//   } else {
//     existingItem.quantity++;
//     existingItem.totalPrice = existingItem.totalPrice + newItem.price;
//   }
// },
// removeItemFromCart(state, action) {
//   const id = action.payload;
//   const existingItem = state.items.find((item) => item.id === id);
//   state.totalQuantity--;
//   state.changed = true;
//   if (existingItem.quantity === 1) {
//     state.items = state.items.filter((item) => item.id !== id);
//   } else {
//     existingItem.quantity--;
//     existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
//   }
// },
