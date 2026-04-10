import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, GraduationCap, Users, User, Phone } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query'; // Ise top par import karo

const AddStudent: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    parentName: '',
    parentGender: 'male',
    mobileNumber: '',
    class: '',
    section: 'A',
    rollno: ''
  });


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const prefix = formData.parentGender === 'male' ? 'Mr.' : 'Mrs.';
  const finalData = {
    ...formData,
    parentName: `${prefix} ${formData.parentName}`,
    rollno: Number(formData.rollno)
  };

  try {
    const response = await fetch("http://localhost:8080/api/v1/admin/add-student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
      credentials: "include", 
    });

    const result = await response.json();

    if (response.ok) {
      // 🔥 Sabse important step:
      // Ye line 'students' key wale saare data ko stale mark kar degi
      // Taaki jab tum navigate karo, toh List page naya data fetch kare
      await queryClient.invalidateQueries({ queryKey: ['students'] });

      alert("Student added successfully!");
      navigate('/dashboard'); 
    } else {
      alert(result.message || "Something went wrong");
    }
  } catch (error) {
    console.error("Error adding student:", error);
    alert("Server error. Please try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="max-w-5xl mx-auto  px-6 animate-in fade-in duration-700">
      
      {/* Header - Minimalist */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">New Enrollment</h1>
        <p className="text-slate-500 font-medium mt-2">Add a new student to the official directory.</p>
      </div>

      {/* Form Content - Blended with background */}
      <form onSubmit={handleSubmit} className="space-y-16">
        
        {/* Section 1: Personal Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <User size={20} className="text-blue-500" /> Personal Details
            </h3>
            <p className="text-sm text-slate-400">Basic identification of the student.</p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
              <input 
                type="text" required placeholder="Rahul"
                className="w-full bg-white border-b-2 border-slate-100 px-1 py-3 text-base focus:border-blue-500 outline-none transition-all font-semibold text-slate-700" 
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
              <input 
                type="text" placeholder="Rawat"
                className="w-full bg-white border-b-2 border-slate-100 px-1 py-3 text-base focus:border-blue-500 outline-none transition-all font-semibold text-slate-700" 
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Guardian Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Users size={20} className="text-blue-500" /> Guardian Details
            </h3>
            <p className="text-sm text-slate-400">Primary contact for the student.</p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Parent/Guardian Name</label>
              <div className="flex gap-4">
                <select 
                  className="bg-transparent border-b-2 border-slate-100 text-blue-600 font-bold px-1 py-3 outline-none focus:border-blue-500 cursor-pointer"
                  onChange={(e) => setFormData({...formData, parentGender: e.target.value})}
                >
                  <option value="male">Mr.</option>
                  <option value="female">Mrs.</option>
                </select>
                <input 
                  type="text" required placeholder="Full Name" 
                  className="flex-1 bg-white border-b-2 border-slate-100 px-1 py-3 text-base focus:border-blue-500 outline-none transition-all font-semibold text-slate-700" 
                  onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="tel" required maxLength={10} placeholder="9876543210" 
                  className="w-full pl-8 pr-1 py-3 bg-white border-b-2 border-slate-100 text-base focus:border-blue-500 outline-none transition-all font-semibold text-slate-700" 
                  onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Academic Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <GraduationCap size={20} className="text-blue-500" /> Academic Details
            </h3>
            <p className="text-sm text-slate-400">Class and roll number assignment.</p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase text-center block">Class</label>
              <input 
                type="text" required placeholder="10th" 
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 text-xl text-center font-black text-slate-800 focus:bg-white focus:border-blue-500 outline-none uppercase transition-all" 
                onChange={(e) => setFormData({...formData, class: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase text-center block">Section</label>
              <input 
                type="text" required defaultValue="A" 
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 text-xl text-center font-black text-slate-800 focus:bg-white focus:border-blue-500 outline-none uppercase transition-all" 
                onChange={(e) => setFormData({...formData, section: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase text-center block">Roll No</label>
              <input 
                type="number" required placeholder="01" 
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 text-xl text-center font-black text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all" 
                onChange={(e) => setFormData({...formData, rollno: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-6 pt-10">
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest
            cursor-pointer"
          >
            Go Back
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto bg-slate-900 text-white px-12 py-5 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-blue-600 shadow-2xl shadow-slate-200 hover:shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70
            cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Finalize Enrollment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;