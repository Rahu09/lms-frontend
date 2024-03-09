import { Footer } from "./components/Footer";
import NavBar from "./components/NavBar";
import { AuthorizationProvider } from "./context/AuthorizationProvider";
import { BookList } from "./pages/BookList/BookList";
import { Landing } from "./pages/Landing/Landing";
import { Login } from "./pages/Login/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <AuthorizationProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-indigo-50">
            <NavBar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/booklist" element={<BookList />} />
              <Route path="*" element={<div>Page path not defined</div>} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthorizationProvider>
    </>
  );
}

export default App;
