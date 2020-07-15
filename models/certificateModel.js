const express = require('express'),
    mongoose = require('mongoose'),
    schema = mongoose.Schema;

// ========== Defining the Certificate Schema ============ 
const CertificateSchema = new schema({
    isActive: {
        type: Boolean,
        required: true
    },
    privateKey: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    customer: {
        type: schema.ObjectId,
        ref: 'Customer',
    }
});

const Certificate = module.exports = mongoose.model('Certificate', CertificateSchema);

// ========== Defining the Certificate Methods ============ 
module.exports.updateCertificate = (certificateId, certificate, callback) => {
    Certificate.findByIdAndUpdate(certificateId, certificate, callback);
};

module.exports.findCertById = (certificateId, callback) => {
    Certificate.findById(certificateId, callback);
};