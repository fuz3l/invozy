import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, TrendingUp, Users } from 'lucide-react';

export default function Dashboard() {
    const cardStyle = {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        transition: 'transform 0.2s',
        cursor: 'pointer',
        color: '#0f172a'
    };

    return (
        <div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1e293b' }}>
                Dashboard
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Create Invoice Action */}
                <Link to="/create-invoice" style={{ textDecoration: 'none' }}>
                    <div style={cardStyle} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '10px',
                            backgroundColor: '#eff6ff',
                            color: '#3b82f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.5rem'
                        }}>
                            <PlusCircle size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Create New Invoice</h3>
                        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Generate a new bill for a customer</p>
                    </div>
                </Link>

                {/* View Invoices Action */}
                <Link to="/invoices" style={{ textDecoration: 'none' }}>
                    <div style={cardStyle} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '10px',
                            backgroundColor: '#f0fdf4',
                            color: '#22c55e',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.5rem'
                        }}>
                            <FileText size={24} />
                        </div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>View Past Invoices</h3>
                        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Check history and reprint bills</p>
                    </div>
                </Link>

                {/* Placeholder Stats */}
                <div style={{ ...cardStyle, cursor: 'default' }} onMouseOver={null} onMouseOut={null}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '10px',
                        backgroundColor: '#fdf4ff',
                        color: '#d946ef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.5rem'
                    }}>
                        <TrendingUp size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Today's Sales</h3>
                    <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Track daily revenue</p>
                    <div style={{ marginTop: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>--</div>
                </div>
            </div>
        </div>
    );
}
