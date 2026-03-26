import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AuthLayout.css';

export default function AuthLayout() {
    return (
        <div className="auth-layout">
            <div className="auth-particles">
                {[...Array(6)].map((_, i) => <div key={i} className="particle" style={{ '--i': i }} />)}
            </div>
            <motion.div
                className="auth-card glass"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className="auth-logo">
                    <div className="logo-icon">A</div>
                    <h1>Authentica</h1>
                </div>
                <Outlet />
            </motion.div>
        </div>
    );
}
