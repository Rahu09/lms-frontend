import { Footer } from "./components/Footer";
import NavBar from "./components/NavBar";
import { AuthorizationProvider } from "./context/AuthorizationProvider";
import BookInfoBase from "./pages/BookInfo/BookInfoBase";
import { BookList } from "./pages/BookList/BookList";
import { Landing } from "./pages/Landing/Landing";
import { Login } from "./pages/Login/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Signup } from "./pages/Signup/Signup";
import ProfileBase from "./pages/UserProfile/ProfileBase";
// import ProfileBase from "./pages/UserProfile/ProfileBase";

function App() {
  return (
    <>
      <AuthorizationProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-slate-50">
            <NavBar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/booklist" element={<BookList />} />
              <Route path="/bookinfo" element={<BookInfoBase />} />
              <Route path="/userprofile" element={<ProfileBase />} />
              {/* <Route path="/adminprofile" element={<AdminProfileBase />} /> */}
              <Route path="*" element={<div>Page path not defined</div>} />
            </Routes>
            {/* <Footer /> */}
          </div>
        </BrowserRouter>
      </AuthorizationProvider>
    </>
  );
}

export default App;
