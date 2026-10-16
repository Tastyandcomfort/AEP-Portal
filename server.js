const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock Dataset directly extracted from the official Indigo AEP Application Form
const employeeDatabase = {
    "IGA72835": {
        id: "IGA72835",
        name: "MUSHTAQ MOHAMMED",
        designation: "EXECUTIVE - SECURITY",
        org: "INTERGLOBE AVIATION LTD",
        avsec: {
            type: "Initial Training",
            date: "2023-08-02",
            location: "BLR - BENGALURU",
            instructor: "ARCHANA DASH / INDIGO ASTI"
        },
        pvc: {
            status: "Cleared",
            certificateNo: "TP 88793",
            courtCase: "No Pending Records",
            address: "H.NO 20-170/1/1, RB NAGAR, RANGAREDDY, TELANGANA - 501218"
        },
        passport: {
            number: "INDIAN PASSPORT", 
            nationality: "INDIAN",
            expiryDate: "2053-09-26",
            email: "MUSHTAQ.ISMAIL@GOINDIGO.IN"
        }
    }
};

// Unified Search Routing Protocol
app.get('/api/search', (req, res) => {
    const { empId, type } = req.query;
    if (!empId) {
        return res.status(400).json({ message: "Employee ID query parameters missing." });
    }

    const employee = employeeDatabase[empId.toUpperCase().trim()];
    if (!employee) {
        return res.status(404).json({ message: "Employee ID configuration profile not found." });
    }

    res.json({
        name: employee.name,
        id: employee.id,
        designation: employee.designation,
        org: employee.org,
        details: employee[type.toLowerCase()]
    });
});

// Fallback Route to serve Frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Apple-Style AEP Engine running state: http://localhost:${PORT}`);
});
