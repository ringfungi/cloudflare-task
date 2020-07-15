const express = require('express'),
    mongoose = require('mongoose'),
    bcryptjs = require('bcryptjs'),
    schema = mongoose.Schema;

// ========== Defining the Customer Schema ==========
const CustomerSchema = new schema({
    name: {
        type: String,
        required: true
    },
    emailaddress: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    certificate: [{
        type: schema.ObjectId,
        ref: 'Certificate'
    }]
});

const Customer = module.exports = mongoose.model('Customer', CustomerSchema);

// ========== Defining the Customer Methods ==========
module.exports.addCustomer = (customer, callback) => {
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(customer.password, salt, (err, hash) => {
            customer.password = hash;
            Customer.create(customer, callback)
        });
    });
};

module.exports.findCustomerById = (customerId, callback) => {
    Customer.findById(customerId, callback);
};

module.exports.addCertificate = (customer, callback) => {
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(customer.password, salt, (err, hash) => {
            customer.password = hash;
            Customer.create(customer, callback)
        });
    });
};

module.exports.getCertificates = (customerId, callback) => {
    const customer = Customer.findById(customerId, callback).populate({ path: 'certificate', match: { isActive: true } });
}

module.exports.deleteCustomer = (customerId, callback) => {
    Customer.findByIdAndRemove(customerId, callback);
};