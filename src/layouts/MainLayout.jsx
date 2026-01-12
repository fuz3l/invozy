import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, PlusCircle, FileText, LogOut, Glasses, Menu, X } from 'lucide-react';

export default function MainLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    async function handleLogout() {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    }

    const navItems = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'Create Invoice', path: '/create-invoice', icon: <PlusCircle size={20} /> },
        { name: 'View Invoices', path: '/invoices', icon: <FileText size={20} /> },
    ];

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8fafc' }}>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay show-on-mobile"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`app-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ backgroundColor: '#3b82f6', padding: '0.5rem', borderRadius: '8px', display: 'flex' }}>
                            <Glasses size={24} color="white" />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Invozy</h1>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Optical Shop</p>
                        </div>
                    </div>
                    {/* Close Button (Mobile Only) */}
                    <button
                        className="show-on-mobile"
                        onClick={() => setSidebarOpen(false)}
                        style={{ background: 'transparent', color: 'white' }}
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav style={{ padding: '1.5rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                color: isActive ? 'white' : '#94a3b8',
                                backgroundColor: isActive ? '#3b82f6' : 'transparent',
                                transition: 'all 0.2s',
                                fontWeight: '500'
                            })}
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid #334155' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            transition: 'background-color 0.2s',
                            textAlign: 'left'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                <header style={{
                    backgroundColor: 'white',
                    padding: '1rem 2rem',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {/* Hamburger Button (Mobile Only) */}
                        <button
                            className="show-on-mobile"
                            onClick={() => setSidebarOpen(true)}
                            style={{ background: 'transparent', color: '#1e293b' }}
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Admin Portal</span>
                </header>
                <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
