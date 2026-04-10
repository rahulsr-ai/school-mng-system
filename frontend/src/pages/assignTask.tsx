import React, { useState } from 'react';
import { useQuery, useQueryClient} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Loader2, BookOpen, UserCheck, Calendar, LayoutList } from 'lucide-react';

// Students fetch karne ke liye (Dropdown ke liye)
const fetchAllStudents = async () => {
  const res = await fetch("http://localhost:8080/api/v1/admin/student/all?limit=1000", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
};

const AssignTask: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    studentId: '',
    dueDate: ''
  });

  const queryClient = useQueryClient();

  // Students list for dropdown
  const { data: studentsData } = useQuery({
    queryKey: ['all-students-list'],
    queryFn: fetchAllStudents
  });

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId) return alert("Please select a student");
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/v1/student/assign-homework/${formData.studentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            dueDate: formData.dueDate
        }), 
        credentials: "include", 
      });

      if (response.ok) {
        alert("Task Assigned Successfully!");
        navigate('/dashboard/tasks/all'); 
        queryClient.invalidateQueries({ queryKey: ['all-tasks'] });
      } else {
        const errData = await response.json();
        alert(errData.message || "Failed to assign task");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
};



  return (
    <div className="max-w-5xl mx-auto py-10 px-6 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Assign Homework</h1>
        <p className="text-slate-500 font-medium mt-2">Create a new task and link it to a student.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-16">
        
        {/* Section 1: Task Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BookOpen size={20} className="text-blue-500" /> Task Details
            </h3>
            <p className="text-sm text-slate-400">What needs to be done?</p>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Task Title</label>
              <input 
                type="text" required placeholder="e.g. Solve Mathematics Chapter 5"
                className="w-full bg-white border-b-2 border-slate-100 px-1 py-3 text-lg focus:border-blue-500 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-200" 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Description (Optional)</label>
              <textarea 
                placeholder="Add specific instructions here..."
                className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium text-slate-600 min-h-30" 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Assignment Target */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <UserCheck size={20} className="text-blue-500" /> Assign To
            </h3>
            <p className="text-sm text-slate-400">Select the student for this task.</p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Student</label>
              <select 
                required
                className="w-full bg-white border-b-2 border-slate-100 px-1 py-3 text-base focus:border-blue-500 outline-none transition-all font-semibold text-slate-700 cursor-pointer"
                onChange={(e) => setFormData({...formData, studentId: e.target.value})}
              >
                <option value="">Choose a student...</option>
                {studentsData?.students?.map((s: any) => (
                  <option key={s._id} value={s._id}>
                    {s.firstName} {s.lastName} ({s.class}-{s.section})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Due Date</label>
              <div className="relative">
                <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="date" required 
                  className="w-full pl-8 pr-1 py-3 bg-white border-b-2 border-slate-100 text-base focus:border-blue-500 outline-none transition-all font-semibold text-slate-700" 
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-6 pt-10 border-t border-slate-50">
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="text-sm font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto bg-slate-900 text-white px-12 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-600 shadow-2xl shadow-slate-200 hover:shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <LayoutList size={18} /> Assign Task
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignTask;