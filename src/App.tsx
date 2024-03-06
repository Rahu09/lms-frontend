import { NavBar } from "./components/NavBar";
import { AuthorizationProvider } from "./context/AuthorizationProvider";
import { BookList } from "./pages/BookList/BookList";
import { Login } from "./pages/Login/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <AuthorizationProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/booklist" element={<BookList />} />
            <Route path="*" element={<div>Page path not defined</div>} />
          </Routes>
        </BrowserRouter>
      </AuthorizationProvider>
    </>
  );
}

export default App;
