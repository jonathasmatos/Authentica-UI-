import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { useToast } from '../hooks/useToast';
import { motion } from 'framer-motion';
import { Users, Shield, Key, Plus, Trash2, Edit2, Link as LinkIcon, X } from 'lucide-react';
import './AdminPage.css';

export default function AdminPage() {
    const { addToast, ToastContainer } = useToast();
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Initial Load
    useEffect(() => { loadData(); }, [activeTab]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'users') {
                const { data } = await adminAPI.getUsers();
                setUsers(data || []);
            } else if (activeTab === 'roles') {
                const { data } = await adminAPI.getRoles();
                setRoles(data || []);
            } else if (activeTab === 'permissions') {
                const { data } = await adminAPI.getPermissions();
                setPermissions(data || []);
            }
        } catch { addToast('Erro ao carregar dados', 'error'); }
        finally { setLoading(false); }
    };

    // --- USERS CRUD ---
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPass, setNewUserPass] = useState('');
    const [userActionLoading, setUserActionLoading] = useState(false);

    // Assign Role State
    const [assignUserId, setAssignUserId] = useState('');
    const [assignRoleName, setAssignRoleName] = useState('');

    const handleCreateUser = async (e) => {
        e.preventDefault();
        if (!newUserEmail || !newUserPass) return;
        setUserActionLoading(true);
        try {
            await adminAPI.createUser({ email: newUserEmail.trim(), password: newUserPass, active: true });
            addToast('Usuário criado com sucesso!', 'success');
            setNewUserEmail(''); setNewUserPass('');
            loadData();
        } catch { addToast('Erro ao criar usuário', 'error'); }
        finally { setUserActionLoading(false); }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Realmente deseja inativar este usuário?')) return;
        try {
            await adminAPI.deleteUser(id);
            addToast('Usuário inativado', 'success');
            loadData();
        } catch { addToast('Erro ao deletar usuário', 'error'); }
    };

    const handleAssignRole = async (e) => {
        e.preventDefault();
        try {
            await adminAPI.assignRole(assignUserId, assignRoleName.toUpperCase());
            addToast('Cargo(Role) atribuído/a ao Usuário!', 'success');
            setAssignUserId(''); setAssignRoleName('');
            loadData();
        } catch { addToast('Erro ao atribuir Role', 'error'); }
    };

    const handleRemoveRoleFromUser = async (userId, roleName) => {
        if (!window.confirm(`Remover cargo ${roleName} do usuário?`)) return;
        try {
            await adminAPI.removeRole(userId, roleName);
            addToast('Cargo removido do usuário!', 'success');
            loadData();
        } catch { addToast('Erro ao remover', 'error'); }
    };

    // --- ROLES CRUD ---
    const [newRoleName, setNewRoleName] = useState('');
    const [roleActionLoading, setRoleActionLoading] = useState(false);

    // Assign Permission to Role State
    const [bindRoleName, setBindRoleName] = useState('');
    const [bindPermName, setBindPermName] = useState('');

    const handleCreateRole = async (e) => {
        e.preventDefault();
        if (!newRoleName) return;
        setRoleActionLoading(true);
        try {
            await adminAPI.createRole(newRoleName.trim().toUpperCase());
            addToast('Role criada!', 'success');
            setNewRoleName(''); loadData();
        } catch { addToast('Erro ao criar Role', 'error'); }
        finally { setRoleActionLoading(false); }
    };

    const handleDeleteRole = async (id) => {
        if (!window.confirm('Deletar Role? (Pode quebrar usuários que a utilizam)')) return;
        try {
            await adminAPI.deleteRole(id);
            addToast('Role deletada', 'success'); loadData();
        } catch { addToast('Erro ao deletar', 'error'); }
    };

    const handleBindPermission = async (e) => {
        e.preventDefault();
        try {
            await adminAPI.addPermission(bindRoleName.toUpperCase(), bindPermName.toUpperCase());
            addToast('Permissão vinculada à Role!', 'success');
            setBindRoleName(''); setBindPermName('');
            loadData();
        } catch { addToast('Erro ao vincular', 'error'); }
    };

    const handleRemovePermissionFromRole = async (roleName, permName) => {
        if (!window.confirm(`Remover permissão ${permName} da Role ${roleName}?`)) return;
        try {
            await adminAPI.removePermission(roleName, permName);
            addToast('Permissão removida!', 'success');
            loadData();
        } catch { addToast('Erro ao remover', 'error'); }
    };

    // --- PERMISSIONS CRUD ---
    const [newPermName, setNewPermName] = useState('');
    const [permActionLoading, setPermActionLoading] = useState(false);

    const handleCreatePerm = async (e) => {
        e.preventDefault();
        if (!newPermName) return;
        setPermActionLoading(true);
        try {
            await adminAPI.createPermission(newPermName.trim().toUpperCase());
            addToast('Permissão criada com sucesso', 'success');
            setNewPermName(''); loadData();
        } catch { addToast('Erro ao criar permissão', 'error'); }
        finally { setPermActionLoading(false); }
    };

    const handleDeletePerm = async (id) => {
        if (!window.confirm('Deletar Permissão globalmente?')) return;
        try {
            await adminAPI.deletePermission(id);
            addToast('Permissão deletada', 'success'); loadData();
        } catch { addToast('Erro', 'error'); }
    };

    // --- RENDER HELPERS ---
    const renderUsers = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-section glass">
            <div className="admin-actions-bar">
                <form className="inline-form" onSubmit={handleCreateUser}>
                    <input placeholder="E-mail" type="email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} required />
                    <input placeholder="Senha Padrão" type="text" value={newUserPass} onChange={e => setNewUserPass(e.target.value)} required />
                    <button type="submit" className="btn btn-primary" disabled={userActionLoading}>
                        <Plus size={16} /> Criar
                    </button>
                </form>
            </div>

            <div className="admin-actions-bar">
                <form className="inline-form" onSubmit={handleAssignRole}>
                    <input placeholder="ID do Usuário (UUID)" value={assignUserId} onChange={e => setAssignUserId(e.target.value)} required />
                    <input placeholder="Nome da Role (ex: ADMIN)" value={assignRoleName} onChange={e => setAssignRoleName(e.target.value)} required />
                    <button type="submit" className="btn btn-primary">
                        <Shield size={16} /> Atribuir Role
                    </button>
                </form>
            </div>

            <div className="admin-table-container">
                {loading ? <div className="p-4 text-center">Carregando...</div> : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Roles Vinculadas</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>
                                        <div>{u.email}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.id}</div>
                                    </td>
                                    <td>
                                        <span className={`badge ${u.active ? 'active' : 'inactive'}`}>
                                            {u.active ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                            {u.roles?.map(r => (
                                                <span key={r.id} className="badge badge-role" title="Clique para remover"
                                                    style={{ cursor: 'pointer' }} onClick={() => handleRemoveRoleFromUser(u.id, r.name)}>
                                                    {r.name} <X size={10} style={{ marginLeft: 4, display: 'inline' }} />
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="btn-icon danger" onClick={() => handleDeleteUser(u.id)} title="Inativar Usuário">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && <tr><td colSpan="4" className="text-center p-4">Nenhum usuário encontrado</td></tr>}
                        </tbody>
                    </table>
                )}
            </div>
        </motion.div>
    );

    const renderRoles = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-section glass">
            <div className="admin-actions-bar">
                <form className="inline-form" onSubmit={handleCreateRole}>
                    <input placeholder="Nome da Role (ex: MANAGER)" value={newRoleName} onChange={e => setNewRoleName(e.target.value)} required />
                    <button type="submit" className="btn btn-primary" disabled={roleActionLoading}>
                        <Plus size={16} /> Criar Role
                    </button>
                </form>
            </div>

            <div className="admin-actions-bar">
                <form className="inline-form" onSubmit={handleBindPermission}>
                    <input placeholder="Nome da Role" value={bindRoleName} onChange={e => setBindRoleName(e.target.value)} required />
                    <input placeholder="Nome da Permissão" value={bindPermName} onChange={e => setBindPermName(e.target.value)} required />
                    <button type="submit" className="btn btn-primary">
                        <LinkIcon size={16} /> Vincular Permissão
                    </button>
                </form>
            </div>

            <div className="admin-table-container">
                {loading ? <div className="p-4 text-center">Carregando...</div> : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Nome (Cargo)</th>
                                <th>Permissões Vinculadas</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map(r => (
                                <tr key={r.id}>
                                    <td>
                                        <div>{r.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.id}</div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                            {r.permissions?.map(p => (
                                                <span key={p.id} className="badge" title="Clique para remover"
                                                    style={{ cursor: 'pointer' }} onClick={() => handleRemovePermissionFromRole(r.name, p.name)}>
                                                    {p.name} <X size={10} style={{ marginLeft: 4, display: 'inline' }} />
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="btn-icon danger" onClick={() => handleDeleteRole(r.id)} title="Deletar Role">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {roles.length === 0 && <tr><td colSpan="3" className="text-center p-4">Nenhuma role encontrada</td></tr>}
                        </tbody>
                    </table>
                )}
            </div>
        </motion.div>
    );

    const renderPermissions = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-section glass">
            <div className="admin-actions-bar">
                <form className="inline-form" onSubmit={handleCreatePerm}>
                    <input placeholder="Nome da Permissão (ex: VIEW_REPORTS)" value={newPermName} onChange={e => setNewPermName(e.target.value)} required />
                    <button type="submit" className="btn btn-primary" disabled={permActionLoading}>
                        <Plus size={16} /> Criar Permissão
                    </button>
                </form>
            </div>

            <div className="admin-table-container">
                {loading ? <div className="p-4 text-center">Carregando...</div> : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Nome (Permissão Base)</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.map(p => (
                                <tr key={p.id}>
                                    <td>
                                        <div>{p.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.id}</div>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="btn-icon danger" onClick={() => handleDeletePerm(p.id)} title="Deletar Permissão">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {permissions.length === 0 && <tr><td colSpan="2" className="text-center p-4">Nenhuma permissão encontrada</td></tr>}
                        </tbody>
                    </table>
                )}
            </div>
        </motion.div>
    );

    return (
        <div className="admin-page">
            <ToastContainer />
            <div className="admin-header">
                <div>
                    <h2 className="page-title">Administração Completa</h2>
                    <p className="page-subtitle">Gestão de Usuários e RBAC</p>
                </div>
            </div>

            <div className="admin-tabs">
                <button className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                    <Users size={16} style={{ display: 'inline', marginRight: 8 }} /> Usuários
                </button>
                <button className={`tab-btn ${activeTab === 'roles' ? 'active' : ''}`} onClick={() => setActiveTab('roles')}>
                    <Shield size={16} style={{ display: 'inline', marginRight: 8 }} /> Roles/Cargos
                </button>
                <button className={`tab-btn ${activeTab === 'permissions' ? 'active' : ''}`} onClick={() => setActiveTab('permissions')}>
                    <Key size={16} style={{ display: 'inline', marginRight: 8 }} /> Permissões Base
                </button>
            </div>

            {activeTab === 'users' && renderUsers()}
            {activeTab === 'roles' && renderRoles()}
            {activeTab === 'permissions' && renderPermissions()}
        </div>
    );
}
