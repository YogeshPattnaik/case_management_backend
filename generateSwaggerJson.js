// generateSwaggerJson.js
const fs = require('fs');
const swaggerSpec = require('./config/swagger/swaggerSpec'); // adjust the path if needed

fs.writeFileSync('swagger-output.json', JSON.stringify(swaggerSpec, null, 2));
console.log('✅ swagger-output.json generated successfully.');
