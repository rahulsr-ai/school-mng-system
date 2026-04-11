import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, ChevronRight, CheckCircle2, X, User, Trash2 } from 'lucide-react';
const apiUrl = `${import.meta.env.VITE_API_URL}` || "http://localhost:8080";


const fetchAllTasks = async () => {
  const res = await fetch(`${apiUrl}/api/v1/student/task/all`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

const TasksList: React.FC = () => {
  const queryClient = useQueryClient();

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['all-tasks'],
    queryFn: fetchAllTasks,
  });

  const groupedTasks = useMemo(() => {
    return tasks?.reduce((acc: any, task: any) => {
      const id = task.studentId;
      if (!acc[id]) {
        acc[id] = { name: task.studentName, tasks: [] };
      }
      acc[id].tasks.push(task);
      return acc;
    }, {});
  }, [tasks]);

  const statusMutation = useMutation({
    mutationFn: async (taskId: string) => {
      await fetch(`${apiUrl}/api/v1/student/update/homework/${taskId}`, {
        method: "POST",
        credentials: "include",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-tasks'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (taskId: string) => {
      await fetch(`${apiUrl}/api/v1/student/delete/homework/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-tasks'] });
    },
  });

  const currentStudent = selectedStudentId ? groupedTasks[selectedStudentId] : null;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Student Assignments</h1>
        <p className="text-slate-500 font-medium italic">Click on a student to manage their tasks.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.keys(groupedTasks || {}).map((id) => (
            <div
              key={id}
              onClick={() => setSelectedStudentId(id)}
              className="bg-white p-6 rounded-3xl border-2 border-slate-50 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{groupedTasks[id].name}</h3>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest">
                    {groupedTasks[id].tasks.length} Tasks Assigned
                  </p>
                </div>
              </div>
              <ChevronRight className="text-slate-200 group-hover:text-blue-500 transition-colors" />
            </div>
          ))}
        </div>
      )}

      {/* --- Task Detail Modal--- */}
      {currentStudent && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedStudentId(null)} />

          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 sm:p-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">{currentStudent.name}'s Tasks</h2>
                  <p className="text-sm text-slate-400 font-medium">Update status below</p>
                </div>
                <button onClick={() => setSelectedStudentId(null)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 cursor-pointer"><X size={20} /></button>
              </div>

              <div className="space-y-4 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
                {currentStudent.tasks.map((task: any) => (
                  <div key={task._id} className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className={`font-bold text-slate-800 ${task.status === 'Completed' ? 'line-through opacity-40' : ''}`}>
                        {task.title}
                      </p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Due: {new Date(task.dueDate).toLocaleDateString('en-GB')}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() => {
                          if (window.confirm("Delete this task?")) deleteMutation.mutate(task._id)
                        }}
                        className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                      >
                        {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={18} />}
                      </button>


                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${task.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                        {task.status}
                      </span>
                      {task.status === 'Pending' && (
                        <button
                          onClick={() => statusMutation.mutate(task._id)}
                          disabled={statusMutation.isPending}
                          className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all active:scale-90 cursor-pointer shadow-lg shadow-slate-200"
                        >
                          {statusMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={18} />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksList;