function JsonInputOutput(){
    
    this.JsonInputter = () => {
        
        const fs = require('fs');
        const file = process.argv[2];
        const data = fs.readFileSync(file, 'utf8');
        const json = JSON.parse(data);
        return json;
    }
}
module.exports = JsonInputOutput;