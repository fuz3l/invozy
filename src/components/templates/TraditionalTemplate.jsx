import React, { forwardRef } from 'react';

const TraditionalTemplate = forwardRef(({ invoice, customer, items, totals }, ref) => {
    return (
        <div ref={ref} style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', fontFamily: 'Times New Roman, serif', border: '1px solid #ccc' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid black', paddingBottom: '20px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>Galaxy Eyewear</h1>
                <p style={{ margin: '5px 0 0', fontStyle: 'italic' }}>Premium Eyewear & Lens Specialists</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Opp. Noor stationary,Fatehwadi Tower, Juhapura, Ahmedabad, Gujarat 380055</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                    <p><strong>Invoice No:</strong> {invoice.invoiceNumber}</p>
                    <p><strong>Date:</strong> {invoice.date}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <strong>Customer Details:</strong>
                    <p style={{ margin: '5px 0 0' }}>{customer.name}</p>
                    <p style={{ margin: '0' }}>{customer.mobile}</p>
                </div>
            </div>

            {/* Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', border: '1px solid black' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '1px solid black' }}>
                        <th style={{ padding: '10px', borderRight: '1px solid black', textAlign: 'left' }}>Description</th>
                        <th style={{ padding: '10px', borderRight: '1px solid black', textAlign: 'center', width: '80px' }}>Qty</th>
                        <th style={{ padding: '10px', borderRight: '1px solid black', textAlign: 'right', width: '100px' }}>Rate</th>
                        <th style={{ padding: '10px', textAlign: 'right', width: '100px' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid black' }}>
                            <td style={{ padding: '10px', borderRight: '1px solid black' }}>{item.name}</td>
                            <td style={{ padding: '10px', borderRight: '1px solid black', textAlign: 'center' }}>{item.quantity}</td>
                            <td style={{ padding: '10px', borderRight: '1px solid black', textAlign: 'right' }}>{Number(item.price).toFixed(2)}</td>
                            <td style={{ padding: '10px', textAlign: 'right' }}>{Number(item.total).toFixed(2)}</td>
                        </tr>
                    ))}
                    {/* Empty rows to fill space if needed, traditionally used */}
                </tbody>
            </table>

            {/* Totals */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <table style={{ borderCollapse: 'collapse', width: '300px' }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: '5px 10px', textAlign: 'right', fontWeight: 'bold' }}>Subtotal:</td>
                            <td style={{ padding: '5px 10px', textAlign: 'right', border: '1px solid black' }}>{totals.subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '5px 10px', textAlign: 'right' }}>Discount:</td>
                            <td style={{ padding: '5px 10px', textAlign: 'right', border: '1px solid black' }}>{totals.discountAmount.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '5px 10px', textAlign: 'right' }}>GST:</td>
                            <td style={{ padding: '5px 10px', textAlign: 'right', border: '1px solid black' }}>{totals.gstAmount.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold', fontSize: '18px' }}>Grand Total:</td>
                            <td style={{ padding: '10px', textAlign: 'right', border: '1px solid black', fontWeight: 'bold', fontSize: '18px' }}>₹{totals.grandTotal.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between', paddingTop: '40px' }}>
                <div style={{ textAlign: 'center', width: '200px', borderTop: '1px solid black' }}>
                    <p style={{ margin: '5px 0 0' }}>Customer Signature</p>
                </div>
                <div style={{ textAlign: 'center', width: '200px', borderTop: '1px solid black' }}>
                    <p style={{ margin: '5px 0 0' }}>Authorized Signatory</p>
                </div>
            </div>
        </div>
    );
});

export default TraditionalTemplate;
