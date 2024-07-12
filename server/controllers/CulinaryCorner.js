const CulinaryCorner = require("../models/CulinaryCorner");
exports.getAllCulinaryCorner = async (req, res) => {
    try {
        const allCulinaryCorner = await CulinaryCorner.find();
        return res.status(200).send(allCulinaryCorner);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(400).send({ message: 'Error fetching CulinaryCorner' });
    }
};

exports.createCulinaryCorner = async (req, res) => {
    try {
        const newCulinaryCorner = await CulinaryCorner.create(req.body);
        return res.status(201).send({ newCulinaryCorner });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(400).send({ message: 'Error creating CulinaryCorner' });
    }
};

exports.updateCulinaryCorner = async (req, res) => {
    try {
        const updatedCulinaryCorner = await CulinaryCorner.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCulinaryCorner) {
            return res.status(404).send({ message: 'CulinaryCorner not found' });
        }
        return res.status(200).send({ updatedCulinaryCorner });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(400).send({ message: 'Error updating CulinaryCorner' });
    }
};

exports.deleteCulinaryCorner = async (req, res) => {
    try {
        const deletedCulinaryCorner = await CulinaryCorner.findByIdAndDelete(req.params.id);
        if (!deletedCulinaryCorner) {
            return res.status(404).send({ message: 'CulinaryCorner not found' });
        }
        return res.status(200).send({ deletedCulinaryCorner });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(400).send({ message: 'Error deleting CulinaryCorner' });
    }
};
