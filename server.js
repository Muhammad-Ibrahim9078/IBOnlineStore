const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ibrahimking9078@gmail.com', // Your Gmail address
        pass: 'your-app-password' // You'll need to generate an App Password from your Google Account
    }
});

// Test route to check if server is running
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Route to handle order submission
app.post('/submit-order', async (req, res) => {
    console.log('Received order:', req.body); // Log the received order

    try {
        const { name, phone, address, postalCode, items, total } = req.body;

        // Validate required fields
        if (!name || !phone || !address || !postalCode || !items || !total) {
            console.log('Missing required fields');
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields' 
            });
        }

        // Create email content
        const emailContent = `
            New Order Details:
            
            Customer Information:
            Name: ${name}
            Phone: ${phone}
            Address: ${address}
            Postal Code: ${postalCode}
            
            Order Items:
            ${items.map(item => `
                - ${item.name}
                Price: Rs. ${item.price}
            `).join('\n')}
            
            Total Amount: Rs. ${total}
        `;

        // Email options
        const mailOptions = {
            from: 'ibrahimking9078@gmail.com',
            to: 'ibrahimking9078@gmail.com',
            subject: 'New Order Received',
            text: emailContent
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.json({ 
            success: true, 
            message: 'Order submitted successfully',
            emailInfo: info.response
        });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error submitting order',
            error: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error',
        error: err.message
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test the server at: http://localhost:${PORT}/test`);
}); 