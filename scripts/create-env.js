const fs = require('fs'); //filesystem = fs

fs.writeFileSync('./.env', `API=${process.env.API}\n`)