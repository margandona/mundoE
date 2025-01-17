const { db } = require('../database/firebaseconfig');

const collection = db.collection('reports');

const saveReport = async (reportData) => {
    const docRef = await collection.add(reportData);
    return docRef.id;
};

const getReport = async (id) => {
    const doc = await collection.doc(id).get();
    if (!doc.exists) {
        throw new Error('Report not found');
    }
    return doc.data();
};

const getAllReports = async () => {
    const snapshot = await collection.get();
    const reports = [];
    snapshot.forEach(doc => {
        reports.push({ id: doc.id, ...doc.data() });
    });
    return reports;
};

const updateReport = async (id, updateData) => {
    await collection.doc(id).update(updateData);
};

const deleteReport = async (id) => {
    await collection.doc(id).delete();
};

// Definir la función getReportByCIOrPassport
const getReportByCIOrPassport = async (CI_or_passport) => {
    const snapshot = await collection.where('CI_or_passport', '==', CI_or_passport).get();
    if (snapshot.empty) {
        throw new Error('Report not found');
    }
    const report = [];
    snapshot.forEach(doc => {
        report.push({ id: doc.id, ...doc.data() });
    });
    return report;
};

module.exports = { saveReport, getReport, getAllReports, updateReport, deleteReport, getReportByCIOrPassport };
