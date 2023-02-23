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
import Dashboard from "./pages/LoggedIn/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/classView" element={<StudentLogin />} />
        <Route path="/class/:id/view" element={<ViewClass />} />
        <Route path="/class/subjects/:idd" element={<ListSubjects />} />
        <Route path="/class/students/:idd" element={<ListStudents />} />
        <Route path="/class/:cid/subjects/view" element={<InsideSubjects />} />
        <Route path="/subject/assignment/:idd" element={<ListAssignments />} />
        <Route path="/subject/notes/:idd" element={<ListNotes />} />
        <Route path="/notice" element={<ListNotices />} />
        <Route path="/teachers" element={<ListTeachers />} />
        <Route path="/teachers/subjects/:tidd" element={<TeacherSubjects />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
