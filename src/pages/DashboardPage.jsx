import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Shield, Users, Key, Activity } from 'lucide-react';
import './DashboardPage.css';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const stats = [
    { icon: Users, label: 'Usuários', value: '—', color: '#8b5cf6' },
    { icon: Shield, label: 'Roles', value: '—', color: '#06b6d4' },
    { icon: Key, label: 'Permissões', value: '—', color: '#10b981' },
    { icon: Activity, label: 'Sessão', value: '2h', color: '#f59e0b' },
];

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="dashboard-page">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="page-title">Bem-vindo de volta</h2>
                <p className="page-subtitle">{user?.sub || 'Usuário'}</p>
            </motion.div>

            <motion.div className="stats-grid" variants={container} initial="hidden" animate="show">
                {stats.map(({ icon: Icon, label, value, color }) => (
                    <motion.div key={label} className="stat-card glass" variants={item}>
                        <div className="stat-icon" style={{ background: `${color}15`, color }}>
                            <Icon size={22} />
                        </div>
                        <div>
                            <p className="stat-value">{value}</p>
                            <p className="stat-label">{label}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div className="welcome-card glass" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <h3>🚀 Sistema de Autenticação Ativo</h3>
                <p>Seu token JWT está válido. Utilize a sidebar para navegar entre os módulos disponíveis.</p>
            </motion.div>
        </div>
    );
}
