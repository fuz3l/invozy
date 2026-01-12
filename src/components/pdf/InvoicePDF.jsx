import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
// Font.register({
//     family: 'Inter',
//     fonts: [
//         { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf', fontWeight: 400 },
//         { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.ttf', fontWeight: 600 },
//         { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.ttf', fontWeight: 700 },
//     ],
// });

const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#334155' },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
    brand: { fontSize: 24, fontWeight: 700, color: '#2563eb' },
    invoiceTitle: { fontSize: 14, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 },
    invoiceValue: { fontSize: 12, fontWeight: 600 },
    companyDetails: { textAlign: 'right', color: '#64748b' },

    billTo: { marginBottom: 30 },
    sectionTitle: { fontSize: 9, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
    billName: { fontSize: 14, fontWeight: 600, color: '#1e293b' },
    billAddress: { marginTop: 4, color: '#64748b' },

    table: { marginTop: 20 },
    tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 8, marginBottom: 8 },
    tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingVertical: 8 },
    colItem: { flex: 4 },
    colQty: { flex: 1, textAlign: 'center' },
    colPrice: { flex: 1.5, textAlign: 'right' },
    colTotal: { flex: 1.5, textAlign: 'right' },
    th: { fontSize: 9, fontWeight: 600, color: '#64748b', textTransform: 'uppercase' },
    td: { fontSize: 10, color: '#334155' },
    tdBold: { fontSize: 10, fontWeight: 600, color: '#1e293b' },

    totals: { marginTop: 20, flexDirection: 'column', alignItems: 'flex-end' },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', width: 200, marginBottom: 6 },
    totalLabel: { color: '#64748b' },
    totalValue: { fontWeight: 600, color: '#1e293b' },
    grandTotal: { borderTopWidth: 2, borderTopColor: '#e2e8f0', paddingTop: 10, marginTop: 4, flexDirection: 'row', justifyContent: 'space-between', width: 200 },
    grandTotalLabel: { fontSize: 12, fontWeight: 700, color: '#1e293b' },
    grandTotalValue: { fontSize: 14, fontWeight: 700, color: '#2563eb' },

    footer: { position: 'absolute', bottom: 40, left: 40, right: 40, borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 20, textAlign: 'center', color: '#94a3b8', fontSize: 9 }
});

const Currency = ({ value }) => <Text>{Number(value).toFixed(2)}</Text>;

export default function InvoicePDF({ invoice, customer, items, totals }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.brand}>INVOICE</Text>
                        <Text style={{ marginTop: 8, color: '#64748b' }}>#{invoice.invoiceNumber}</Text>
                    </View>
                    <View style={styles.companyDetails}>
                        <Text style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>Galaxy Eyewear</Text>
                        <Text>Opp. Noor stationary,Fatehwadi Tower, Juhapura</Text>
                        <Text>Ahmedabad, Gujarat 380055</Text>
                        <Text>Phone: +91 8735871937</Text>
                    </View>
                </View>

                {/* Bill To & Date */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 }}>
                    <View>
                        <Text style={styles.sectionTitle}>Bill To</Text>
                        <Text style={styles.billName}>{customer.name}</Text>
                        <Text style={{ marginTop: 4 }}>{customer.mobile}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.sectionTitle}>Invoice Date</Text>
                        <Text style={styles.invoiceValue}>{invoice.date}</Text>
                    </View>
                </View>

                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.th, styles.colItem]}>Item Description</Text>
                    <Text style={[styles.th, styles.colQty]}>Qty</Text>
                    <Text style={[styles.th, styles.colPrice]}>Price</Text>
                    <Text style={[styles.th, styles.colTotal]}>Total</Text>
                </View>

                {/* Table Rows */}
                {items.map((item, i) => (
                    <View key={i} style={styles.tableRow}>
                        <Text style={[styles.td, styles.colItem]}>{item.name}</Text>
                        <Text style={[styles.td, styles.colQty]}>{item.quantity}</Text>
                        <Text style={[styles.td, styles.colPrice]}><Currency value={item.price} /></Text>
                        <Text style={[styles.tdBold, styles.colTotal]}><Currency value={item.total} /></Text>
                    </View>
                ))}

                {/* Totals */}
                <View style={styles.totals}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Subtotal</Text>
                        <Text style={styles.totalValue}><Currency value={totals.subtotal} /></Text>
                    </View>
                    {totals.discountAmount > 0 && (
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Discount</Text>
                            <Text style={[styles.totalValue, { color: '#ef4444' }]}>- <Currency value={totals.discountAmount} /></Text>
                        </View>
                    )}
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>GST</Text>
                        <Text style={styles.totalValue}><Currency value={totals.gstAmount} /></Text>
                    </View>
                    <View style={styles.grandTotal}>
                        <Text style={styles.grandTotalLabel}>Total</Text>
                        <Text style={styles.grandTotalValue}>Rs. <Currency value={totals.grandTotal} /></Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>Thank you for your business!</Text>
                    <Text style={{ marginTop: 4 }}>Terms & Conditions Apply</Text>
                </View>

            </Page>
        </Document>
    );
}
