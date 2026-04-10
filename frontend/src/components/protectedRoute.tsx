import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const apiUrl = `${import.meta.env.VITE_API_URL}` || "http://localhost:8080";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<{ isChecked: boolean; isValid: boolean }>({
    isChecked: false,
    isValid: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/auth/verify`, {
          method: "GET",
          credentials: "include", 
        });

        if (response.ok) {
          setAuth({ isChecked: true, isValid: true });
        } else {
          setAuth({ isChecked: true, isValid: false });
        }
      } catch (error) {
        setAuth({ isChecked: true, isValid: false });
      }
    };

    checkAuth();
  }, []);

  // Jab tak verification chal rahi hai, loader dikhao
  if (!auth.isChecked) {
    return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
  }

  // Agar verify nahi hua, toh login par bhej do
  if (!auth.isValid) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;