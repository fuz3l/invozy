import React, { useEffect, useState } from 'react';
import { getInvoices } from '../services/firestore';
import { Eye, Printer } from 'lucide-react';

export default function InvoiceList() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchInvoices() {
            try {
                const data = await getInvoices();
                setInvoices(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load invoices: ' + err.message);
                alert('Error loading invoices: ' + err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchInvoices();
    }, []);

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading invoices...</div>;
    if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '2rem' }}>Past Invoices</h1>

            {invoices.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '12px', color: '#64748b' }}>
                    No invoices found. Create one to get started.
                </div>
            ) : (
                <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <tr>
                                <th style={{ padding: '1rem', fontWeight: '600', color: '#475569', fontSize: '0.875rem' }}>Invoice No</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: '#475569', fontSize: '0.875rem' }}>Date</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: '#475569', fontSize: '0.875rem' }}>Customer</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: '#475569', fontSize: '0.875rem' }}>Amount</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: '#475569', fontSize: '0.875rem' }}>Status</th>
                                {/* <th style={{ padding: '1rem', fontWeight: '600', color: '#475569', fontSize: '0.875rem', textAlign: 'right' }}>Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice) => (
                                <tr key={invoice.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem', fontWeight: '500', color: '#1e293b' }}>{invoice.invoiceNumber}</td>
                                    <td style={{ padding: '1rem', color: '#64748b' }}>{invoice.date}</td>
                                    <td style={{ padding: '1rem', color: '#1e293b' }}>
                                        <div>{invoice.customer.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{invoice.customer.mobile}</div>
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: '600', color: '#1e293b' }}>
                                        ₹{Number(invoice.grandTotal).toFixed(2)}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            backgroundColor: '#dcfce7', color: '#166534',
                                            padding: '0.25rem 0.75rem', borderRadius: '9999px',
                                            fontSize: '0.75rem', fontWeight: '500'
                                        }}>
                                            Paid
                                        </span>
                                    </td>
                                    {/* Action buttons placeholder for future expansion (View/Print again) */}
                                    {/* <td style={{ padding: '1rem', textAlign: 'right' }}> ... </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
