import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Book from "../components/Books/Book";
import { booksAction } from "../store/books-slice";
import { uiActions } from "../store/ui-slice";
import {search} from './../BooksAPI'
function Search()
{
  /**
   * #TODO we need to use Debounce here to make the request to get search results 
   */
  const navigate = useNavigate();
  const searchBooks = useSelector((state) => state.books.searchBooks);
  const [searchValue,setSearchValue] = useState("");
  const searchHandler= (e)=>{
    setSearchValue(e.target.value)
  }


  const dispatch = useDispatch();

  // we use here debouncing // not to call the request on each ket stock
  useEffect(()=>{
    if(!searchValue.trim())
    {
      dispatch(booksAction.setSearchBooks([]));
      return;
    }
    const getData = setTimeout(() => {
      dispatch(uiActions.toggle());
      search(searchValue.trim()).then((res)=>{
        if(res?.error)
        {
          throw("error")
        }
        dispatch(booksAction.setSearchBooks(res || []));
        dispatch(uiActions.toggle());
      }).catch(err=>{
        dispatch(booksAction.setSearchBooks([]))
        dispatch(uiActions.toggle());
        
      })
    }, 1000);
    return () => clearTimeout(getData)
  },[searchValue])
  const nagigateToHomePage=()=>{
    navigate("/")
   }
    return(
      <Fragment>
         <div className="search-books">
              <div className="search-books-bar">
                <a
                  className="close-search"
                  onClick={nagigateToHomePage}
                >
                  Close
                </a>
                <div className="search-books-input-wrapper">
                  <input onChange={(e)=>{searchHandler(e)}}
                    type="text"
                    placeholder="Search by title, author, or ISBN"
                  />
                </div>
              </div>
              {!searchBooks.length && <div className="empty-results">
                <img src="images/undraw_no_data_re_kwbl.svg" alt=""  width={300}/>
              </div>}
              <div className="search-books-results">
                <ol className="books-grid">
                { searchBooks &&
                          searchBooks.map((searchBook)=>{
                            return <li key={searchBook.id}> <Book book={searchBook}></Book></li> 
                          })
                }
                </ol>
              </div>
          </div>
    </Fragment>
    )
}

export default Search;