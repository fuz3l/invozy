import React, { forwardRef } from 'react';

const ModernTemplate = forwardRef(({ invoice, customer, items, totals }, ref) => {
    return (
        <div ref={ref} style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', fontFamily: 'Inter, sans-serif' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>INVOICE</h1>
                    <p style={{ color: '#64748b', marginTop: '5px' }}>#{invoice.invoiceNumber}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Optical Shop Name</h2>
                    <p style={{ margin: '5px 0 0', color: '#64748b' }}>123 Main Street, City</p>
                    <p style={{ margin: '0', color: '#64748b' }}>Phone: +91 0000000000</p>
                </div>
            </div>

            {/* Bill To & Date */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                <div>
                    <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px', marginBottom: '10px' }}>Bill To</h3>
                    <p style={{ margin: '0', fontWeight: '600' }}>{customer.name}</p>
                    <p style={{ margin: '5px 0 0', color: '#64748b' }}>{customer.mobile}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px', marginBottom: '10px' }}>Date</h3>
                    <p style={{ margin: '0', fontWeight: '600' }}>{invoice.date}</p>
                </div>
            </div>

            {/* Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                        <th style={{ padding: '15px 0', color: '#64748b', fontSize: '14px' }}>ITEM</th>
                        <th style={{ padding: '15px 0', color: '#64748b', fontSize: '14px', textAlign: 'center' }}>QTY</th>
                        <th style={{ padding: '15px 0', color: '#64748b', fontSize: '14px', textAlign: 'right' }}>PRICE</th>
                        <th style={{ padding: '15px 0', color: '#64748b', fontSize: '14px', textAlign: 'right' }}>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '15px 0', fontWeight: '500' }}>{item.name}</td>
                            <td style={{ padding: '15px 0', textAlign: 'center', color: '#64748b' }}>{item.quantity}</td>
                            <td style={{ padding: '15px 0', textAlign: 'right', color: '#64748b' }}>₹{Number(item.price).toFixed(2)}</td>
                            <td style={{ padding: '15px 0', textAlign: 'right', fontWeight: '600' }}>₹{Number(item.total).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '250px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#64748b' }}>
                        <span>Subtotal</span>
                        <span>₹{totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#64748b' }}>
                        <span>Discount (-{totals.discountAmount})</span>
                        <span>- ₹{totals.discountAmount.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#64748b' }}>
                        <span>GST</span>
                        <span>₹{totals.gstAmount.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #e2e8f0', fontSize: '18px', fontWeight: 'bold' }}>
                        <span>Total</span>
                        <span style={{ color: '#2563eb' }}>₹{totals.grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '60px', textAlign: 'center', color: '#94a3b8', fontSize: '12px' }}>
                <p>Thank you for your business!</p>
            </div>
        </div>
    );
});

export default ModernTemplate;
