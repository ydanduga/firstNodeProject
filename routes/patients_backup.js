/*
    GET /app/addpatient -> go to addPatient page
*/
router.get('/app/addpatient', (req, res) => {
    res.render('addpatient', {pageTitle: "Add patient"});
});

/*
    POST /addPatient -> add new patient
*/
router.post('/app/addpatient', (req, res) => {
    // receive the diseases from the form in the array PD, each element being a String with the disease name
    var PD = req.body.PD;
    var dateOfBirth = req.body.dateOfBirth;

    // console.log(dateOfBirth);
    // console.log(isValidDate(dateOfBirth));

    if (isEmpty(PD)) {    // check if no disease is selected
        PD = [];
    }

    // Check for empty fields
    if (isEmpty(req.body.firstName) || isEmpty(req.body.lastName) || isEmpty(req.body.hospitalNumber) || !isValidDate(dateOfBirth)) {
        if (isEmpty(req.body.firstName)) req.flash('error_msg', 'Please enter the first name.');
        if (isEmpty(req.body.lastName)) req.flash('error_msg', 'Please enter the last name.');
        if (isEmpty(req.body.hospitalNumber)) req.flash('error_msg', 'Please enter the hospital number.');
        if (!isValidDate(dateOfBirth)) req.flash('error_msg', 'The date is not valid.');

        res.status(400).redirect('/app/addpatient');
    } else {
        // set the sex of the new patient
        var sex = req.body.sex;
        if (sex === "male") {
            sex = true;
        } else {
            sex = false;
        }

        // make a new patient and add it in the database
        var patient = Patient({
            firstName: capitalize(req.body.firstName),
            lastName: capitalize(req.body.lastName),
            sex: sex,
            dateOfBirth: dateOfBirth,
            hospitalNumber: toUpper(req.body.hospitalNumber),
            diseases: PD,
            lastUpdate: (new Date().getTime())
        });

        patient.save().then((patient) => {
            patient.updateScore();
            res.status(200).redirect('/app');
        }).catch((err) => {
            console.log(err);
            res.status(400).redirect('/app');
        });
   }
});

/*
    GET /app/getpatients  -> get a JSON with all patients
*/
router.get('/app/getpatients', (req, res) => {
    Patient.find({}).then((patients) => {
        res.status(200).send(patients);
    }).catch((err) => {
        console.log(err);
        res.status(400).send();
    });
});

/*
    GET one patient data -> for his personal page
*/
router.get('/app/patient/:hospitalNumber', (req, res) => {
    hospitalNumber = req.params.hospitalNumber;
    Patient.findOne({
        hospitalNumber
    }).then((patient) => {
        if (isEmpty(patient)) {
            throw Error('Patient does not exist');
        }
        res.status(200).render('patientPage');
    }).catch((err) => {
        console.log(err);
        res.status(404).redirect('/app');
    });
});

/*
    GET one patient data and return it as JSON
*/
router.get('/app/getpatient/:hospitalNumber', (req, res) => {
    hospitalNumber = req.params.hospitalNumber;
    Patient.findOne({
        hospitalNumber
    }).then((patient) => {
        res.status(200).send(patient);
    }).catch((err) => {
        req.flash('error_msg', 'Please enter the first name.');
        res.status(404).redirect('/app');
    });
});

/*
    POST /app/updatepatient/:hospitalNumber -> update disease & score for patient
                                            -> request made from the patientPage
*/
router.post('/app/updatepatient/:hospitalNumber', (req, res) => {
    hospitalNumber = req.params.hospitalNumber;

    // GET form attributes
    var PD = req.body.PD;
    if (isEmpty(PD)) {
        PD = [];
    }

    Patient.findOneAndUpdate({
        hospitalNumber
    }, {
        "$set": {
            "diseases": PD,
            "lastUpdate": (new Date().getTime())
         }
    },{
        new: true
    }).then((patient) => {
        patient.updateScore();
        res.redirect('/app/patient/' + hospitalNumber);
    }).catch((err) => {
        console.log(err);
        res.redirect('/app/patient/' + hospitalNumber);
    });
});

/*
    POST /app/delete/:hospitalNumber -> detele a patient from the system
*/
router.get('/app/deletepatient/:hospitalNumber', (req, res) => {
    var hospitalNumber = req.params.hospitalNumber;

    Promise.all([Room.find({}), Patient.findOne({hospitalNumber: hospitalNumber})])
        .then((data) => {
            var rooms = data[0];
            var patient = data[1];

            // if the patient is in a room, make the room empty
            if (patient.room !== 'noroom') {
                 for (var i = 0; i < rooms.length; ++i) {
                    if (rooms[i].name === patient.room) {
                         rooms[i].availability = false;
                         rooms[i].save();
                         break;
                    }
                 }
            }

            patient.remove().then((patients) => {
               res.status(200).redirect('/app');
            });
         }).catch((err) => {
            res.status(400).redirect('/app');
         });
});

export default router;