const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

let downloadCount = 0;

// CORS
app.use(cors({
    origin: ['https://catsdevs.online', 'http://localhost:3000'] 
}));

app.use(express.json());

// Track download
app.post('/api/track-download', (req, res) => {
    downloadCount++;
    console.log(`🐾 Download tracked! Total: ${downloadCount}`);
    res.json({ 
        success: true, 
        downloads: downloadCount
    });
});

// Get stats
app.get('/api/stats', (req, res) => {
    res.json({
        downloads: downloadCount,
        online: Math.floor(downloadCount * 0.1) + 5
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', downloads: downloadCount });
});

app.listen(PORT, () => {
    console.log(`🐾 PawCraft API running on port ${PORT}`);
});
