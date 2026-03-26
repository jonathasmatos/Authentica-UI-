import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useToast } from '../hooks/useToast';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ResetPasswordPage() {
    const [params] = useSearchParams();
    const token = params.get('token') || '';
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { addToast, ToastContainer } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) return addToast('As senhas não coincidem', 'error');
        setLoading(true);
        try {
            await authAPI.resetPassword(token, password);
            addToast('Senha redefinida com sucesso!', 'success');
            setTimeout(() => navigate('/login'), 1500);
        } catch {
            addToast('Token inválido ou expirado', 'error');
        } finally { setLoading(false); }
    };

    return (
        <>
            <ToastContainer />
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 24, fontSize: '0.9rem' }}>
                Defina sua nova senha
            </p>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="password" placeholder="Nova senha (min. 6)" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
                    <Lock size={18} className="icon" />
                </div>
                <div className="input-group">
                    <input type="password" placeholder="Confirmar nova senha" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={6} />
                    <ShieldCheck size={18} className="icon" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? <span className="spinner" /> : <><span>Redefinir Senha</span><ArrowRight size={18} /></>}
                </button>
            </form>
        </>
    );
}
