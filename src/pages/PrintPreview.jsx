import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from '../components/pdf/InvoicePDF';

export default function PrintPreview() {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (location.state) {
            setData(location.state);
        } else {
            navigate('/');
        }
    }, [location, navigate]);

    if (!data) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading preview...</div>;

    const { invoiceDetails, customer, items, totals } = data;

    return (
        <div style={{ backgroundColor: '#1e293b', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Header Toolbar */}
            <div style={{ padding: '1rem 2rem', backgroundColor: '#0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', backgroundColor: 'transparent', fontWeight: '500' }}
                >
                    <ArrowLeft size={20} /> Back to Editor
                </button>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>High Quality PDF Preview</span>
                    <PDFDownloadLink
                        document={<InvoicePDF invoice={invoiceDetails} customer={customer} items={items} totals={totals} />}
                        fileName={`Invoice-${invoiceDetails.invoiceNumber}.pdf`}
                        style={{
                            textDecoration: 'none',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            fontWeight: '500',
                            fontSize: '0.875rem'
                        }}
                    >
                        {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
                    </PDFDownloadLink>
                </div>
            </div>

            {/* PDF Viewer */}
            <div style={{ flex: 1, padding: '2rem', display: 'flex', justifyContent: 'center' }}>
                <PDFViewer width="100%" height="100%" style={{ border: 'none', borderRadius: '8px', maxWidth: '1200px', height: '80vh' }}>
                    <InvoicePDF invoice={invoiceDetails} customer={customer} items={items} totals={totals} />
                </PDFViewer>
            </div>
        </div>
    );
}
