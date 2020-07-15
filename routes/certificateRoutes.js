const express = require('express'),
    router = express.Router(),
    Certificate = require('../models/certificateModel'),
    http = require('request')


// ========== Router for Certificate ===========

router.put('/:id', (req, res) => {
    const { id } = req.params;

    Certificate.findCertById(id, (err, cert) => {
        if (err)
            throw err;
        
        if (cert.isActive == req.body.isActive) {
            res.json({ success: false, message: 'Error: updated value must be different from previous value' });
        } else {
            cert.isActive = req.body.isActive;
            Certificate.updateCertificate(id, cert, (err, certificate) => {
                if (err)
                    throw err;

                if (!certificate)
                    res.json({ success: false, message: 'Error: certificate not found' });

                http.post("https://eb2f7e405ae3cee6ff0a450282d5ae49.m.pipedream.net", (response) => {
                    res.json({
                        success: true,
                        message: `Certificate has been successfully updated`
                    });
                });
            })
        }
    })

});


module.exports = router;