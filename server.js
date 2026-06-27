const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = 8011;

// --- MIDDLEWARE ---
app.use(cors());
// Allow large JSON payloads since Fabric.js canvas exports can be large
app.use(express.json({ limit: '50mb' })); 

// --- SERVE STATIC FRONTEND ---
// This tells Express to serve your index.html and your /assets/ folder
app.use(express.static(path.join(__dirname, 'public')));

// --- API ROUTES ---
// The Endpoint to receive the final design and order data
app.post('/api/save-design', (req, res) => {
    const { orderId, garmentType, designData } = req.body;
    
    console.log(`\n--- 🟢 NEW ORDER RECEIVED ---`);
    console.log(`Order ID: ${orderId}`);
    console.log(`Garment Selected: ${garmentType}`);
    console.log(`Total design elements on shirt: ${designData.objects.length}`);
    
    // In the future, you will connect to MongoDB or MySQL here
    // to save the 'designData' string to your database.

    res.status(200).json({ 
        success: true, 
        message: 'Your custom design has been saved and ordered!',
        orderId: orderId
    });
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`✅ Erfan Project Server is running!`);
    console.log(`👉 Open your browser to: http://localhost:${PORT}`);
});