const express = require('express'),
    Customer = require('../models/customerModel'),
    Certificate = require('../models/certificateModel');
router = express.Router();

// ========== Register Route ==========
router.post('/create', (req, res) => {
    let newCustomer = new Customer({
        name: req.body.name,
        emailaddress: req.body.emailaddress,
        password: req.body.password,
    });

    Customer.addCustomer(newCustomer, (err, customer) => {
        if (err)
            throw err;

        res.json({ success: true, message: 'Customer created', customer: customer });
    });
});

router.delete('/:id', (req, res) => {
    const { customerId } = req.params;

    Customer.deleteCustomer(customerId, (err, customer) => {
        if (err)
            throw err;

        res.json({ success: true, message: 'Customer deleted' });
    });
});

router.post('/:id/certificate', (req, res) => {
    const { id } = req.params;


    if (req.body.isActive == null || req.body.privateKey == null || req.body.body == null) {
        res.json({ success: false, message: 'Missing certificate fields' });
    } else {
        let newCertificate = new Certificate({
            isActive: req.body.isActive,
            privateKey: req.body.privateKey,
            body: req.body.body,
        });

        Customer.findCustomerById(id, (err, customer) => {

            newCertificate.customer = customer;
            newCertificate.save();
    
            customer.certificate.push(newCertificate);
            customer.save();
    
            res.json({ success: true, message: 'Certficate found' });
        });
    }
});


router.get('/:id', (req, res) => {
    const { id } = req.params;

    Customer.getCertificates(id, (err, customer) => {
        if (err)
            throw err;

        res.json(customer)
    })

});




module.exports = router;