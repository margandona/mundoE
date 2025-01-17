const { db } = require('../database/firebaseconfig');

const collection = db.collection('files');

const saveFile = async (fileData) => {
    const docRef = await collection.add(fileData);
    return docRef.id;
};

const getFile = async (id) => {
    const doc = await collection.doc(id).get();
    if (!doc.exists) {
        throw new Error('File not found');
    }
    return doc.data();
};

const getAllFiles = async () => {
    const snapshot = await collection.get();
    const files = [];
    snapshot.forEach(doc => {
        files.push({ id: doc.id, ...doc.data() });
    });
    return files;
};

const updateFile = async (id, updateData) => {
    await collection.doc(id).update(updateData);
};

const deleteFile = async (id) => {
    await collection.doc(id).delete();
};

module.exports = { saveFile, getFile, getAllFiles, updateFile, deleteFile };
