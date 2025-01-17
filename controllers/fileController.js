const { saveFile, getFile, getAllFiles, updateFile, deleteFile } = require('../models/fileModel');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');

exports.uploadFile = async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet);

    try {
        for (const row of rows) {
            await saveFile(row);
        }
        res.status(201).send({ message: 'File uploaded and data saved successfully.' });
    } catch (err) {
        res.status(500).send('Error uploading file and saving data.');
    } finally {
        fs.unlinkSync(filePath); // Delete the file after processing
    }
};

exports.getFile = async (req, res) => {
    const fileId = req.params.id;
    try {
        const file = await getFile(fileId);
        res.json(file);
    } catch (err) {
        res.status(500).send('Error retrieving file.');
    }
};

exports.getAllFiles = async (req, res) => {
    try {
        const files = await getAllFiles();
        res.json(files);
    } catch (err) {
        res.status(500).send('Error retrieving files.');
    }
};

exports.updateFile = async (req, res) => {
    const fileId = req.params.id;
    const updateData = req.body;
    try {
        await updateFile(fileId, updateData);
        res.send('File updated successfully.');
    } catch (err) {
        res.status(500).send('Error updating file.');
    }
};

exports.deleteFile = async (req, res) => {
    const fileId = req.params.id;
    try {
        await deleteFile(fileId);
        res.send('File deleted successfully.');
    } catch (err) {
        res.status(500).send('Error deleting file.');
    }
};
