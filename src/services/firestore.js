import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

const INVOICE_COLLECTION = 'invoices';

export const addInvoice = async (invoiceData) => {
    try {
        const docRef = await addDoc(collection(db, INVOICE_COLLECTION), {
            ...invoiceData,
            createdAt: Timestamp.now()
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};

export const getInvoices = async () => {
    try {
        // const q = query(collection(db, INVOICE_COLLECTION), orderBy('createdAt', 'desc'));
        // TEMPORARY FIX: Remove orderBy to check if index is missing
        const q = query(collection(db, INVOICE_COLLECTION));
        const querySnapshot = await getDocs(q);
        const invoices = [];
        querySnapshot.forEach((doc) => {
            invoices.push({ id: doc.id, ...doc.data() });
        });
        return invoices;
    } catch (e) {
        console.error("Error getting documents: ", e);
        throw e;
    }
};
