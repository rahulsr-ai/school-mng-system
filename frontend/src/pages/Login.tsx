import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('admin@gridaan.com');
    const [password, setPassword] = useState('admin123');
    const [isChecking, setIsChecking] = useState(true); 

    // 🛡️ REDIRECT LOGIC: IF USER ALREADY LOGED IN REDIRECT TO DASHBOARD
    useEffect(() => {
        const checkExistingAuth = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/auth/verify", {
                    method: "GET",
                    credentials: "include", 
                });

                if (response.ok) {
                    navigate("/dashboard", { replace: true });
                } else {
                    setIsChecking(false); 
                }
            } catch (error) {
                setIsChecking(false);
            }
        };

        checkExistingAuth();
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/login", {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login Successful!");
                navigate("/dashboard"); 
            } else {
                alert(data.message || "Invalid Credentials!");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Server connection failed!");
        }
    };

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                {/* Form Side */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
                        <p className="text-gray-500 mt-2">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="admin@gridaan.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="password"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="admin123"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                            <LogIn className="h-5 w-5" />
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Image Side */}
                <div className="hidden md:block md:w-1/2 relative">
                    <img
                        src="../../login-img.jpg"
                        alt="School Building"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-600 opacity-20"></div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;