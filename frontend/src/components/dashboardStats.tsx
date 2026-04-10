import { CheckSquare, GraduationCap, Users } from "lucide-react";

const DashboardStats: React.FC = () => {
  const stats = [
    { title: "Total Students", value: "120", trend: "+4% from last month", icon: <Users className="text-blue-600" /> },
    { title: "Pending Tasks", value: "18", trend: "5 urgent", icon: <CheckSquare className="text-orange-500" /> },
    { title: "Attendance", value: "94%", trend: "Average this week", icon: <GraduationCap className="text-green-500" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
          </div>
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.title}</h3>
          <p className="text-3xl font-black text-slate-800 mt-1">{stat.value}</p>
          <p className="text-xs text-slate-400 mt-2 font-medium">{stat.trend}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats