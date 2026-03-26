import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';
import { Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const { addToast, ToastContainer } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) return addToast('As senhas não coincidem', 'error');
        setLoading(true);
        try {
            await register(email, password);
            navigate('/dashboard');
        } catch (err) {
            addToast(err.response?.data?.message || 'Erro ao registrar', 'error');
        } finally { setLoading(false); }
    };

    return (
        <>
            <ToastContainer />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 24, fontSize: '0.9rem' }}>
                Crie sua conta
            </motion.p>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <Mail size={18} className="icon" />
                </div>
                <div className="input-group">
                    <input type="password" placeholder="Senha (min. 6 caracteres)" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
                    <Lock size={18} className="icon" />
                </div>
                <div className="input-group">
                    <input type="password" placeholder="Confirmar senha" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={6} />
                    <ShieldCheck size={18} className="icon" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? <span className="spinner" /> : <><span>Criar Conta</span><ArrowRight size={18} /></>}
                </button>
            </form>
            <div className="auth-links">
                Já tem conta?<Link to="/login">Fazer login</Link>
            </div>
        </>
    );
}
