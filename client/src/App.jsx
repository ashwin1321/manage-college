import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import StudentLogin from "./pages/LoggedIn/StudentLogin";
import ViewClass from "./pages/LoggedIn/ViewClass";
import ListSubjects from "./pages/LoggedIn/ListSubjects";
import ListStudents from "./pages/LoggedIn/ListStudents";
import InsideSubjects from "./pages/LoggedIn/InsideSubjects";
import ListAssignments from "./pages/LoggedIn/ListAssignments";
import ListNotes from "./pages/LoggedIn/ListNotes";
import ListNotices from "./pages/LoggedIn/ListNotices";
import ListTeachers from "./pages/LoggedIn/ListTeachers";
import TeacherSubjects from "./pages/LoggedIn/TeacherSubjects";

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
        <Route path="/subject/assignment/:id" element={<ListAssignments />} />
        <Route path="/subject/notes/:id" element={<ListNotes />} />
        <Route path="/notice" element={<ListNotices />} />
        <Route path="/teachers" element={<ListTeachers />} />
        <Route path="/teachers/subjects/:tid" element={<TeacherSubjects />} />
      </Routes>
    </Router>
  );
}

export default App;
