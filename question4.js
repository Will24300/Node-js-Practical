const fs = require('fs/promises');

async function readAndParseJSON(filePath){
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT'){
            throw new Error(`File not found: ${filePath}`)
        }
        if (err instanceof SyntaxError ){
            throw new Error(`Invalid JSON in file: ${filePath}`)
        }
    }
}

async function tester(){
    try {
        const data = await readAndParseJSON('./sample.json');
        console.log(data)
    } catch(err) {
        console.log(err)
    }
}

tester()