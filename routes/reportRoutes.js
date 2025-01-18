const express = require('express');
const reportController = require('../controllers/reportController');

const router = express.Router();

router.post('/report', reportController.createReport);
router.get('/report/:id', reportController.getReport);
router.get('/reports', reportController.getAllReports);
router.put('/report/:id', reportController.updateReport);
router.delete('/report/:id', reportController.deleteReport);

// Asegúrate de que la función getReportByCIOrPassport esté definida en el controlador
router.get('/report/CI_or_passport/:CI_or_passport', reportController.getReportByCIOrPassport);

// New routes for searching reports
router.get('/reports/search', reportController.searchReports);

module.exports = router;