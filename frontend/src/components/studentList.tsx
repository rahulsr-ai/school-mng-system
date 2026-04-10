import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, ChevronLeft, ChevronRight, Loader2, Trash2, Edit2, AlertCircle} from 'lucide-react';
import EditStudentModal from './EditStudentModal'; 

const fetchStudents = async (page: number, search: string) => {
  const res = await fetch(`http://localhost:8080/api/v1/admin/student/all?page=${page}&search=${encodeURIComponent(search)}`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

const StudentsList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null); 

  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['students', page, debouncedSearch],
    queryFn: () => fetchStudents(page, debouncedSearch),
    placeholderData: (prev) => prev,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:8080/api/v1/admin/student/remove-student/${id}`, {
        method: 'DELETE',
        credentials: "include"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setDeleteId(null);
    }
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 animate-in fade-in duration-700">
      
      {/* Blended Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Student Records</h1>
          <p className="text-slate-500 font-medium">Total {data?.totalStudents || 0} students currently enrolled.</p>
        </div>

        {/* Search Bar  */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-3 bg-transparent border-b-2 border-slate-100 outline-none focus:border-blue-500 transition-all font-medium text-slate-700"
          />
        </div>
      </div>

      {/* Table */}
      <div className="min-h-150 relative">
        {isLoading && !isPlaceholderData && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        )}

        <table className="w-full text-left  ">
          <thead className=''>
            <tr className="border-b-2 border-slate-100 space-x-4">
              <th className="pb-5 md:text-sm text-xs font-black text-slate-400 uppercase tracking-widest">Identification</th>
              <th className="pb-5 md:text-sm text-xs font-black text-slate-400 uppercase tracking-widest">Academic Info</th>
              <th className="pb-5 md:text-sm text-xs font-black text-slate-400 uppercase tracking-widest">Guardian</th>
              <th className="pb-5 md:text-sm text-xs font-black text-slate-400 uppercase tracking-widest">Mobile No</th>
              <th className="pb-5 md:text-sm text-xs font-black text-slate-400 uppercase tracking-widest text-center">Manage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data?.students.map((student: any) => (
              <tr key={student._id} className="group transition-colors hover:bg-slate-50/50">
                <td className="py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {student.firstName[0]}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{student.firstName} {student.lastName}</div>
                    </div>
                  </div>
                </td>
                <td className="py-6">
                  <div className="md:text-sm text-xs font-black text-slate-700 uppercase italic">{student.class} — {student.section}</div>
                  <div className="md:text-sm text-xs text-blue-500 font-bold uppercase mt-0.5">Roll No. {student.rollno}</div>
                </td>
                <td className="py-6">
                  <div className="md:text-sm text-xs font-bold text-slate-700">{student.parentName}</div>
                </td>
                <td className="py-6">
                  <div className="md:text-sm text-xs font-bold text-blue-500  ">{student.mobileNumber}</div>
                </td>
                <td className="py-6">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => setEditData(student)}
                      className="p-3 text-slate-600 cursor-pointer hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteId(student._id)}
                      className="p-3 text-slate-600 cursor-pointer hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
        <div className="md:text-sm text-xs font-black text-slate-300 uppercase tracking-[0.2em]">
          Page {page} of {data?.totalPages || 1}
        </div>
        <div className="flex items-center gap-6">
          <button
            disabled={page === 1 || isLoading}
            onClick={() => setPage(p => p - 1)}
            className="text-xs font-black text-slate-400 hover:text-blue-600 disabled:opacity-30 uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <button
            disabled={page === data?.totalPages || isLoading}
            onClick={() => setPage(p => p + 1)}
            className="text-xs font-black text-slate-400 hover:text-blue-600 disabled:opacity-30 uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Modals */}
      {editData && <EditStudentModal student={editData} onClose={() => setEditData(null)} />}
      
      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white p-10 rounded-[2.5rem] max-w-sm w-full animate-in zoom-in duration-300 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Delete Record?</h3>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">This will permanently remove the student from the system. This cannot be undone.</p>
            <div className="mt-10 space-y-3">
              <button 
                onClick={() => deleteMutation.mutate(deleteId)}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95 shadow-xl shadow-red-100"
              >
                Confirm Delete
              </button>
              <button onClick={() => setDeleteId(null)} className="w-full py-2 text-xs font-black text-slate-400 uppercase tracking-widest">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsList;