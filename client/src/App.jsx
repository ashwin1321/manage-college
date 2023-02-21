import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import StudentLogin from "./pages/LoggedIn/StudentLogin";
import ViewClass from "./pages/LoggedIn/ViewClass";
import ListSubjects from "./pages/LoggedIn/ListSubjects";
import ListStudents from "./pages/LoggedIn/ListStudents";
import InsideSubjects from "./pages/LoggedIn/InsideSubjects";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<StudentLogin />} />
        <Route path="/class/:id" element={<ViewClass />} />
        <Route path="/class/subjects/:id" element={<ListSubjects />} />
        <Route path="/class/students/:id" element={<ListStudents />} />
        <Route path="/class/:cid/subjects/:id" element={<InsideSubjects />} />
      </Routes>
    </Router>
  );
}

export default App;
