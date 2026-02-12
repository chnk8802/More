import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const Login = () => {
    const [email, setEmail] = useState<string>('test@example.com');
    const [password, setPassword] = useState<string>('password123');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            // Temporary test login - remove in production
            const mockUser = {
                id: '1',
                name: 'Test User',
                email: email,
                role: 'admin' as const,
                organization: {
                    name: 'Test Organization'
                }
            };
            const mockToken = 'test-token-' + Date.now();
            
            login(mockUser, mockToken);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#0f172a]">
            {/* Mesh Background */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-lg z-10 page-enter">
                <Card className="glass-panel p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden bg-white/5">
                    {/* Glossy Overlay */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                    <CardHeader className="text-center">
                        <CardTitle className="text-4xl font-black text-white mb-2 leading-tight">
                            Elevate your <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Management.</span>
                        </CardTitle>
                        <CardDescription className="text-slate-400 font-medium">
                            Log in to your MRM dashboard.
                        </CardDescription>
                    </CardHeader>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-3 rounded-2xl mb-8 text-sm font-semibold flex items-center gap-3">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="form-label text-white">Work Email</Label>
                            <Input
                                type="email"
                                className="glass-input w-full"
                                placeholder="name@organization.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="form-label text-white">Password</Label>
                            <Input
                                type="password"
                                className="glass-input w-full"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="btn-primary w-full py-4 text-lg mt-4 group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                            <span>Enter Dashboard</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-slate-500 text-sm font-medium">
                            First time here?{' '}
                            <Link to="/register-org" className="text-purple-400 hover:text-purple-300 transition-colors underline-offset-4 hover:underline">
                                Register Organization
                            </Link>
                        </p>
                    </div>
                </Card>

                <p className="text-center mt-8 text-slate-500 text-xs font-bold uppercase tracking-widest opacity-50">
                    Proprietary Software • v2.0.4
                </p>
            </div>
        </div>
    );
};

export default Login;
