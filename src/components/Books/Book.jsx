import { Fragment, useEffect, useState } from "react";
import { shelf } from "../../constants/constants";
import { update } from "../../BooksAPI";
import { useDispatch } from "react-redux";
import { booksAction } from "../../store/books-slice";
import { uiActions } from "../../store/ui-slice";
// book component where the props hold the book itself from the parent component can get the current book with (props.book)
// the drop down menu that hold the main functionality is also here inside the book component
// when the user select any option from the drop down menu
// 1 - if the value is none --> nothing happens
// 2 -if the value is the current book shel value - > nothing happens 
// 3 - if the user cohoose any other shelf we procced on the update procces
function Book(props)
{
    const dispatch=useDispatch();
    const bookShelf =props.book.shelf;
    const[selectedValue , setSelectedValue]= useState(bookShelf || "none");
    const thumbnail = props.book?.imageLinks?.thumbnail || "https://www.iconpacks.net/icons/2/free-opened-book-icon-3163-thumb.png";
    const {title}= props.book || "";
    const authors= (props.book.authors || []).join(" & ")
    const changeBookHandler = (e)=>
    {
      if(e.target.value==='none') return;
      dispatch(uiActions.toggle());
      update(props.book,e.target.value).then((res)=>{
        const bookToBeUpdated = {book:props.book,shelf:e.target.value}
        if(!props.book.shelf)
        {
          bookToBeUpdated.fromSearchPage=true;
        }
        dispatch(booksAction.updateBookShelf(bookToBeUpdated));
        dispatch(uiActions.toggle())
      })
      setSelectedValue(e.target.value)
    }
    return (
        <Fragment>
             <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                `url(${thumbnail})`,
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select value={selectedValue} onChange={(e)=>{changeBookHandler(e)}}>
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                              {shelf.curentlyReading}
                              </option>
                              <option value="wantToRead">{shelf.wantToRead}</option>
                              <option value="read">{shelf.read}</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{title}</div>
                        <div className="book-authors">{authors}</div>
             </div>
        </Fragment>
    )
}
export default Book;