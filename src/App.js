import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { getAll , get,search} from "./BooksAPI"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage"
import Search from "./pages/Search";
import { useDispatch, useSelector } from "react-redux";
import { booksAction } from "./store/books-slice";
import Spinner from "./components/UI/Spinner/Spinner";
import { uiActions } from "./store/ui-slice";
import NotFound from "./pages/NotFound";
const router = createBrowserRouter([
  {path:"/" , element: <MainPage/>},
  {path:"/search" , element: <Search/>},
  {path:"*" , element: <NotFound></NotFound>}
])

function App() {
  const dispatchBooks = useDispatch();
  const dispatchUi = useDispatch();
  const loadingSpinner = useSelector((state)=>state.ui.loadingSpinner);
  useEffect(()=>{
    dispatchUi(uiActions.toggle());
    getAll().then((res)=>{
      dispatchBooks(booksAction.setBooks(res));
      dispatchUi(uiActions.toggle());
    }).catch((err)=>{
      dispatchUi(uiActions.toggle());
    })
  },[])

  return (
    <Fragment>
      {loadingSpinner && <Spinner></Spinner>}
      <RouterProvider router ={router}/>
    </Fragment>
  );
}
export default App;
