import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Shield, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './DashboardLayout.css';

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin', icon: Shield, label: 'Admin', adminOnly: true },
];

export default function DashboardLayout() {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/login'); };

    return (
        <div className="dashboard-layout">
            <aside className={`sidebar glass ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo-icon small">A</div>
                    <span className="sidebar-title">Authentica</span>
                    <button className="btn-ghost sidebar-close" onClick={() => setSidebarOpen(false)}>
                        <X size={18} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems
                        .filter(item => !item.adminOnly || isAdmin)
                        .map(({ to, icon: Icon, label }) => (
                            <NavLink key={to} to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => setSidebarOpen(false)}>
                                <Icon size={18} /> {label}
                            </NavLink>
                        ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="avatar">{user?.sub?.[0]?.toUpperCase() || 'U'}</div>
                        <span className="user-email">{user?.sub || 'Usuário'}</span>
                    </div>
                    <button className="btn-ghost" onClick={handleLogout} title="Sair">
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>

            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

            <main className="main-content">
                <header className="topbar">
                    <button className="btn-ghost mobile-menu" onClick={() => setSidebarOpen(true)}>
                        <Menu size={20} />
                    </button>
                </header>
                <div className="content-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
