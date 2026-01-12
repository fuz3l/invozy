
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addInvoice } from '../services/firestore';

export default function CreateInvoice() {
    const navigate = useNavigate();

    // --- State ---
    const [customer, setCustomer] = useState({
        name: '',
        mobile: ''
    });

    const [invoiceDetails, setInvoiceDetails] = useState({
        invoiceNumber: `INV - ${Date.now()} `,
        date: new Date().toISOString().split('T')[0]
    });

    const [items, setItems] = useState([
        { id: 1, name: '', quantity: 1, price: 0, total: 0 }
    ]);

    const [pricing, setPricing] = useState({
        discountType: 'percentage', // or 'amount'
        discountValue: 0,
        gstPercentage: 18,
    });

    const [totals, setTotals] = useState({
        subtotal: 0,
        discountAmount: 0,
        gstAmount: 0,
        grandTotal: 0
    });

    const [selectedTemplate, setSelectedTemplate] = useState('modern');

    // --- Navigation for Print ---
    const handlePreview = () => {
        navigate('/print-preview', {
            state: { invoiceDetails, customer, items, totals, selectedTemplate }
        });
    };

    // --- Effects ---
    useEffect(() => {
        calculateTotals();
    }, [items, pricing]);

    // --- Handlers ---
    const handleItemChange = (id, field, value) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, [field]: value };
                if (field === 'quantity' || field === 'price') {
                    updatedItem.total = (Number(updatedItem.quantity) || 0) * (Number(updatedItem.price) || 0);
                }
                return updatedItem;
            }
            return item;
        }));
    };

    const addItem = () => {
        setItems([...items, { id: Date.now(), name: '', quantity: 1, price: 0, total: 0 }]);
    };

    const removeItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const calculateTotals = () => {
        const subtotal = items.reduce((acc, item) => acc + item.total, 0);

        let discountAmount = 0;
        if (pricing.discountType === 'percentage') {
            discountAmount = (subtotal * (Number(pricing.discountValue) || 0)) / 100;
        } else {
            discountAmount = Number(pricing.discountValue) || 0;
        }

        const taxableAmount = subtotal - discountAmount;
        const gstAmount = (taxableAmount * (Number(pricing.gstPercentage) || 0)) / 100;
        const grandTotal = taxableAmount + gstAmount;

        setTotals({
            subtotal,
            discountAmount,
            gstAmount,
            grandTotal
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSave = {
                customer,
                ...invoiceDetails,
                items,
                pricing,
                ...totals,
                selectedTemplate
            };

            await addInvoice(dataToSave);
            alert('Invoice saved successfully to Database!');
            navigate('/invoices'); // Redirect to list
        } catch (error) {
            console.error(error);
            alert('Failed to save invoice.');
        }
    };

    const inputStyle = {
        padding: '0.625rem',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        width: '100%',
        fontSize: '0.875rem',
        outline: 'none',
        transition: 'border-color 0.15s'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#475569',
        marginBottom: '0.25rem'
    };

    return (
        <div style={{ paddingBottom: '4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1e293b' }}>New Invoice</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        style={{ ...inputStyle, width: '150px' }}
                    >
                        <option value="modern">Modern Design</option>
                        <option value="traditional">Traditional Design</option>
                    </select>

                    <button
                        onClick={handlePreview}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.625rem 1rem',
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            color: '#475569',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}>
                        <Printer size={18} />
                        Print / PDF
                    </button>
                    <button
                        onClick={handleSubmit}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.625rem 1rem',
                            borderRadius: '8px',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}>
                        <Save size={18} />
                        Save Invoice
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Left Column: Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Customer Details */}
                    <section style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#334155' }}>Customer Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={labelStyle}>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    style={inputStyle}
                                    value={customer.name}
                                    onChange={e => setCustomer({ ...customer, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Mobile Number</label>
                                <input
                                    type="tel"
                                    placeholder="9876543210"
                                    style={inputStyle}
                                    value={customer.mobile}
                                    onChange={e => setCustomer({ ...customer, mobile: e.target.value })}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Items */}
                    <section style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#334155' }}>Items</h3>
                            <button onClick={addItem} style={{
                                display: 'flex', alignItems: 'center', gap: '0.25rem',
                                fontSize: '0.875rem', color: '#2563eb', fontWeight: '500'
                            }}>
                                <Plus size={16} /> Add Item
                            </button>
                        </div>

                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', color: '#64748b', fontSize: '0.875rem' }}>
                                    <th style={{ paddingBottom: '0.75rem', width: '40%' }}>Item Name</th>
                                    <th style={{ paddingBottom: '0.75rem', width: '15%' }}>Qty</th>
                                    <th style={{ paddingBottom: '0.75rem', width: '20%' }}>Price</th>
                                    <th style={{ paddingBottom: '0.75rem', width: '20%' }}>Total</th>
                                    <th style={{ paddingBottom: '0.75rem', width: '5%' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{ padding: '0.5rem 0' }}>
                                            <input
                                                type="text"
                                                placeholder="Frame / Lens"
                                                style={inputStyle}
                                                value={item.name}
                                                onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                                            />
                                        </td>
                                        <td style={{ padding: '0.5rem 0.5rem' }}>
                                            <input
                                                type="number"
                                                min="1"
                                                style={inputStyle}
                                                value={item.quantity}
                                                onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                                            />
                                        </td>
                                        <td style={{ padding: '0.5rem 0.5rem' }}>
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="0.00"
                                                style={inputStyle}
                                                value={item.price}
                                                onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                                            />
                                        </td>
                                        <td style={{ padding: '0.5rem 0', fontWeight: '600', color: '#334155' }}>
                                            ₹{item.total.toFixed(2)}
                                        </td>
                                        <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                style={{ color: '#ef4444', padding: '0.25rem' }}
                                                disabled={items.length === 1}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>

                {/* Right Column: Invoice Info & Totals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    <section style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#334155' }}>Invoice Details</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={labelStyle}>Invoice No.</label>
                                <input
                                    type="text"
                                    value={invoiceDetails.invoiceNumber}
                                    readOnly
                                    style={{ ...inputStyle, backgroundColor: '#f1f5f9', cursor: 'not-allowed' }}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Date</label>
                                <input
                                    type="date"
                                    value={invoiceDetails.date}
                                    onChange={(e) => setInvoiceDetails({ ...invoiceDetails, date: e.target.value })}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    </section>

                    <section style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#334155' }}>Summary</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                                <span>Subtotal</span>
                                <span>₹{totals.subtotal.toFixed(2)}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#64748b' }}>Discount</span>
                                <div style={{ display: 'flex', gap: '0.5rem', width: '150px' }}>
                                    <select
                                        value={pricing.discountType}
                                        onChange={(e) => setPricing({ ...pricing, discountType: e.target.value })}
                                        style={{ ...inputStyle, padding: '0.25rem', width: '60px' }}
                                    >
                                        <option value="percentage">%</option>
                                        <option value="amount">₹</option>
                                    </select>
                                    <input
                                        type="number"
                                        value={pricing.discountValue}
                                        onChange={(e) => setPricing({ ...pricing, discountValue: e.target.value })}
                                        style={{ ...inputStyle, padding: '0.25rem', textAlign: 'right' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#64748b' }}>GST (%)</span>
                                <input
                                    type="number"
                                    value={pricing.gstPercentage}
                                    onChange={(e) => setPricing({ ...pricing, gstPercentage: e.target.value })}
                                    style={{ ...inputStyle, width: '100px', padding: '0.25rem', textAlign: 'right' }}
                                />
                            </div>
                        </div>

                        <div style={{ paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: '#1e293b' }}>Grand Total</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>
                                ₹{totals.grandTotal.toFixed(2)}
                            </span>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
