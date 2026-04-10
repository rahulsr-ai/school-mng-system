import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { X, Loader2} from 'lucide-react';

export const EditStudentModal: React.FC<{ student: any; onClose: () => void }> = ({ student, onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    firstName: student.firstName,
    lastName: student.lastName,
    parentName: student.parentName.split('. ')[1] || student.parentName, // Pre-fill name without Mr./Mrs.
    parentGender: student.parentName.startsWith('Mrs.') ? 'female' : 'male',
    mobileNumber: student.mobileNumber,
    class: student.class,
    section: student.section,
    rollno: student.rollno
  });

  const mutation = useMutation({
    mutationFn: async (updatedData: any) => {
      const res = await fetch(`http://localhost:8080/api/v1/admin/edit-student/${student._id}`, {
        method: "POST", // Aapne POST bola hai, wese update ke liye PATCH/PUT standard hai
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      alert("Updated Successfully");
      onClose();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = formData.parentGender === 'male' ? 'Mr.' : 'Mrs.';
    mutation.mutate({
      ...formData,
      parentName: `${prefix} ${formData.parentName}`,
      rollno: Number(formData.rollno)
    });
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-in fade-in " onClick={onClose} />
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl p-8 sm:p-10 animate-in zoom-in duration-300">
        
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Modify Student</h2>
            <p className="text-slate-400 text-sm font-medium">Updating ID: {student._id.slice(-6).toUpperCase()}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors cursor-pointer"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-3 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all" 
            />
            <input 
              type="text" value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-3 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all" 
            />
          </div>

          <div className="flex gap-2">
            <select 
              value={formData.parentGender}
              onChange={(e) => setFormData({...formData, parentGender: e.target.value})}
              className="bg-blue-50 border-2 border-blue-50 text-blue-600 font-black rounded-2xl px-4 text-xs outline-none"
            >
              <option value="male">Mr.</option>
              <option value="female">Mrs.</option>
            </select>
            <input 
              type="text" value={formData.parentName}
              onChange={(e) => setFormData({...formData, parentName: e.target.value})}
              className="flex-1 bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-3 text-sm font-bold focus:border-blue-500 outline-none transition-all" 
            />
          </div>

          <input 
            type="tel" value={formData.mobileNumber}
            onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
            className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-3 text-sm font-bold outline-none" 
          />

          <div className="grid grid-cols-3 gap-3 bg-slate-50/50 p-4 rounded-3xl">
            {['class', 'section', 'rollno'].map((field: any) => (
              <div key={field} className="text-center">
                <label className="text-[10px] font-black text-slate-400 uppercase">{field}</label>
                <input 
                  type="text" value={(formData as any)[field]}
                  onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                  className="w-full bg-white border-2 border-slate-100 rounded-xl py-2 text-center font-black text-slate-800 uppercase" 
                />
              </div>
            ))}
          </div>

          <button 
            type="submit" disabled={mutation.isPending}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 shadow-xl shadow-slate-100 cursor-pointer"
          >
            {mutation.isPending ? <Loader2 className="animate-spin" size={18} /> : "Update Record"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;