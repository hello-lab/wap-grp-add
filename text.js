const xlsx = require('xlsx');
const workbook = xlsx.readFile('webdevresponses.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Parse data from the sheet into JSON format
const data = xlsx.utils.sheet_to_json(sheet);
const phnos= xlsx.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[3]]);
// Output the JSON-formatted data
t=0
function send(){
    for (i=0;i<data.length;i++){
console.log('+',phnos[i].PhoneNumber)
        var id = `91${phnos[0].PhoneNumber}@s.whatsapp.net`
        console.log(id)
        
        var tex=JSON.stringify( data[i]).replace(/[\{\}\"\']/g, "").replace(/\,/g,'\n')
        tex=tex
        dek=""
    
      // const sentMsg  = sock.sendMessage(id, { text:tex})
      setTimeout(() => {  'heyyyyyy',console.log(tex); }, t);
      t+=1000
    }
}
    send()