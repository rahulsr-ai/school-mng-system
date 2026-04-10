import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import DashboardLayout from "./pages/Dashboard";
import DashboardStats from "./components/dashboardStats";
import StudentsList from "./components/studentList";
import ProtectedRoute from "./components/protectedRoute";
import AddStudent from "./pages/addStudent";
import AssignTask from "./pages/assignTask";
import TasksList from "./components/taskList";



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />


        {/* Protected Group with Sidebar Layout */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<StudentsList />} />
          <Route path="overview" element={<DashboardStats />} />
          <Route path="student/add" element={<AddStudent />} />
          <Route path="assign-tasks" element={<AssignTask />} />
          <Route path="tasks/all" element={<TasksList />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;