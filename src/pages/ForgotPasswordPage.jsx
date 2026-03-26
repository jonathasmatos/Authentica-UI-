import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useToast } from '../hooks/useToast';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const { addToast, ToastContainer } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authAPI.forgotPassword(email);
            setSent(true);
            addToast('Link de redefinição enviado!', 'success');
        } catch {
            addToast('Erro ao enviar email', 'error');
        } finally { setLoading(false); }
    };

    return (
        <>
            <ToastContainer />
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 24, fontSize: '0.9rem' }}>
                {sent ? 'Verifique seu email' : 'Informe seu email para redefinir a senha'}
            </p>
            {!sent ? (
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="email" placeholder="Seu email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <Mail size={18} className="icon" />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? <span className="spinner" /> : <><span>Enviar Link</span><Send size={18} /></>}
                    </button>
                </form>
            ) : (
                <p style={{ textAlign: 'center', color: 'var(--success)', fontSize: '0.9rem' }}>
                    ✓ Um link de redefinição foi enviado para <strong>{email}</strong>
                </p>
            )}
            <div className="auth-links">
                <Link to="/login"><ArrowLeft size={14} style={{ verticalAlign: 'middle' }} /> Voltar ao login</Link>
            </div>
        </>
    );
}
