import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { addToast, ToastContainer } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            addToast(err.response?.data?.message || 'Credenciais inválidas', 'error');
        } finally { setLoading(false); }
    };

    return (
        <>
            <ToastContainer />
            <motion.p className="auth-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 24, fontSize: '0.9rem' }}>
                Acesse sua conta
            </motion.p>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <Mail size={18} className="icon" />
                </div>
                <div className="input-group">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Senha" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required 
                        minLength={6} 
                    />
                    <Lock size={18} className="icon" />
                    <button 
                        type="button" 
                        className="btn-icon toggle-password" 
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex="-1"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? <span className="spinner" /> : <><span>Entrar</span><ArrowRight size={18} /></>}
                </button>
            </form>
            <div className="auth-links">
                <Link to="/forgot-password">Esqueci minha senha</Link>
            </div>
            <div className="auth-links" style={{ marginTop: 4 }}>
                Não tem conta?<Link to="/register">Criar conta</Link>
            </div>
        </>
    );
}
