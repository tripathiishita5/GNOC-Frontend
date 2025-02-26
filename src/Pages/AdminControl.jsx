import { useState } from "react";
import { User, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminControl() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">

            {/* Admin Control Form Section */}
            <div className="flex-1 flex items-center justify-center px-6">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900">Admin Control</h1>
                            <p className="mt-2 text-gray-600">
                                Fill in the details to create a new user
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent pl-12 transition-all duration-200"
                                            placeholder="User ID"
                                            required
                                        />
                                        <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent pl-12 transition-all duration-200"
                                            placeholder="Password"
                                            required
                                        />
                                        <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent pl-12 transition-all duration-200"
                                            placeholder="Email"
                                            required
                                        />
                                        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent pl-12 transition-all duration-200"
                                            placeholder="Role"
                                            required
                                        />
                                        <Briefcase className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    "Creating User..."
                                ) : (
                                    <>
                                        Create User
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminControl;