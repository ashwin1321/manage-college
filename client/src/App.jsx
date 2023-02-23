import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";
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

        <Route
          path="/classView"
          element={
            <IsAdmin>
              <StudentLogin />
            </IsAdmin>
          }
        />
        <Route
          path="/class/:id/view"
          element={
            <IsAdmin>
              <ViewClass />
            </IsAdmin>
          }
        />
        <Route
          path="/class/subjects/:idd"
          element={
            <IsAdminOrStudent>
              <ListSubjects />
            </IsAdminOrStudent>
          }
        />

        <Route
          path="/class/students/:idd"
          element={
            <IsAdmin>
              <ListStudents />
            </IsAdmin>
          }
        />
        <Route path="/class/:cid/subjects/view" element={<InsideSubjects />} />
        <Route path="/subject/assignment/:idd" element={<ListAssignments />} />
        <Route path="/subject/notes/:idd" element={<ListNotes />} />
        <Route path="/notice" element={<ListNotices />} />
        <Route
          path="/teachers"
          element={
            <IsAdmin>
              <ListTeachers />
            </IsAdmin>
          }
        />
        <Route
          path="/teachers/subjects/:tidd"
          element={
            <IsTeacherOrAdmin>
              <TeacherSubjects />
            </IsTeacherOrAdmin>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

export function IsAdmin(props) {
  const user = localStorage.getItem("user");
  const role = JSON.parse(user).role;
  if (role === "admin") {
    return props.children;
  } else {
    return (
      <div className=" text-center text-3xl mt-[20%] text-red-800">
        <h1>Not Authorized! </h1>
        <h1>Please go back!!</h1>
      </div>
    );
  }
}
export function IsAdminOrStudent(props) {
  const user = localStorage.getItem("user");
  const role = JSON.parse(user).role;
  if (role === "admin" || role === "student") {
    return props.children;
  } else {
    return (
      <div className=" text-center text-3xl mt-[20%] text-red-800">
        <h1>Not Authorized! </h1>
        <h1>Please go back!!</h1>
      </div>
    );
  }
}

export function IsTeacherOrAdmin(props) {
  const user = localStorage.getItem("user");
  const role = JSON.parse(user).role;
  if (role === "admin" || role === "teacher") {
    return props.children;
  } else {
    return (
      <div className=" text-center text-3xl mt-[20%] text-red-800">
        <h1>Not Authorized! </h1>
        <h1>Please go back!!</h1>
      </div>
    );
  }
}
