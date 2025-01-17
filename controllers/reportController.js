const { saveReport, getReport, getAllReports, updateReport, deleteReport } = require('../models/reportModel');

exports.createReport = async (req, res) => {
    const reportData = req.body;
    try {
        const reportId = await saveReport(reportData);
        res.status(201).json({ message: 'Report created successfully.', reportId });
    } catch (err) {
        console.error('Error creating report:', err.message);
        res.status(500).json({ error: `Error creating report: ${err.message}` });
    }
};

exports.getReport = async (req, res) => {
    const reportId = req.params.id;
    try {
        const report = await getReport(reportId);
        res.json(report);
    } catch (err) {
        console.error('Error retrieving report:', err.message);
        res.status(500).json({ error: `Error retrieving report: ${err.message}` });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        const reports = await getAllReports();
        res.json(reports);
    } catch (err) {
        console.error('Error retrieving reports:', err.message);
        res.status(500).json({ error: `Error retrieving reports: ${err.message}` });
    }
};

exports.updateReport = async (req, res) => {
    const reportId = req.params.id;
    const updateData = req.body;
    try {
        await updateReport(reportId, updateData);
        res.json({ message: 'Report updated successfully.' });
    } catch (err) {
        console.error('Error updating report:', err.message);
        res.status(500).json({ error: `Error updating report: ${err.message}` });
    }
};

exports.deleteReport = async (req, res) => {
    const reportId = req.params.id;
    try {
        await deleteReport(reportId);
        res.json({ message: 'Report deleted successfully.' });
    } catch (err) {
        console.error('Error deleting report:', err.message);
        res.status(500).json({ error: `Error deleting report: ${err.message}` });
    }
};

// Definir la función getReportByCIOrPassport
exports.getReportByCIOrPassport = async (req, res) => {
    const CI_or_passport = req.params.CI_or_passport;
    try {
        const report = await getReportByCIOrPassport(CI_or_passport);
        res.json(report);
    } catch (err) {
        console.error('Error retrieving report by CI or passport:', err.message);
        res.status(500).json({ error: `Error retrieving report by CI or passport: ${err.message}` });
    }
};
