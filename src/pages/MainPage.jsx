import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookStateArray, shelf } from "../constants/constants";
import Book from "./../components/Books/Book"
function MainPage()
{
   const navigate = useNavigate();
   let books = useSelector((state) => state.books.books);
   const nagigateToSearch=()=>{
    navigate("/search")
   }
    return (
        <div className="app">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                 { bookStateArray.map((currentBookShelf)=>{
                   return(
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">{currentBookShelf.toScreen}</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          { !!books.length &&
                            books.map((book)=>{
                              return book.shelf === currentBookShelf.fromBackEnd ? <li key={book.id}> <Book book={book}></Book></li> : null
                            })
                          }
                        </ol>
                      </div>
                    </div>
                   )
                 })}
                 
                </div>
              </div>
              <div className="open-search">
                <a onClick={nagigateToSearch}>Add a book</a>
              </div>
            </div>
        </div>
      );
}

export default MainPage