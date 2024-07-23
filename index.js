const xlsx = require('xlsx');
const workbook = xlsx.readFile('Book1.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Parse data from the sheet into JSON format
const data = xlsx.utils.sheet_to_json(sheet);
const phnos= xlsx.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);
// Output the JSON-formatted data
function send(sock){
    t=0
    for (i=0;i<data.length;i++){
console.log('+',phnos[i].phnos)
        const id = `91${phnos[i].PhoneNumber}@s.whatsapp.net`
        console.log(id)
        if(phnos[i].PhoneNumber==undefined)
            continue
        var tex=JSON.stringify( data[i]).replace(/[\{\}\"\']/g, "").replace(/\,/g,'\n')
        tex=`Hi ${phnos[i].Name},\nHere's link to the webverse selection group\nhttps://chat.whatsapp.com/BCaBWCAUQHaKwLbK9Aneqh`
       const text=tex
       setTimeout(() => { sock.sendMessage(id, { text:text}) }, t);
      t+=1000
      
       // console.log(tex)
    }
}





const { DisconnectReason, useMultiFileAuthState,makeInMemoryStore} = require("@whiskeysockets/baileys");
const makeWASocket = require("@whiskeysockets/baileys").default;
//const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
//const genAI = new GoogleGenerativeAI("AIzaSyAI6d1dMA3_TzNrndcy_ReH_omAnGK2Tds");



 // the WhatsApp ID 
// send a simple text!

async function connectionLogic() {

    const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
    const store = makeInMemoryStore({});
    store.readFromFile("./baileys_store.json");
// saves the state to a file every 10s
setInterval(() => {
  store.writeToFile("./baileys_store.json");
}, 10000);
    const sock = makeWASocket({
        printQRInTerminal: true,
       auth:state
    });
    store.bind(sock.ev);
    sock.ev.on("chats.set", () => {
        // can use "store.chats" however you want, even after the socket dies out
        // "chats" => a KeyedDB instance
        console.log("got chats", store.chats.all());
      });
      
      sock.ev.on("contacts.set", () => {
        console.log("got contacts", Object.values(store.contacts));
      });
    sock.ev.on('connection.update', async({ connection, lastDisconnect }) => {
        const status = lastDisconnect?.error?.output?.statusCode
        if (connection === 'close'){
            const reason = Object.entries(DisconnectReason).find(i => i[1] === status)?.[0] || 'unknown'
            console.warn(`[WARN] Closed connection, status: ${reason} (${status})`)
            if (status !== 403 && status === 401 && !status){
                connectionLogic()
            }
        } else if (connection === 'open'){
            send(sock)
            console.log('[INFO] Connected to WhatsApp')
        }
    })
    
    sock.ev.on("auth.info", saveCreds);
    sock.ev.on("auth.failure", async (failure) => {
        //console.error(new Error("[ERROR] Auth failure: " + failure.error));
        if (failure.error === "invalid_session") {
            console.error("[INFO] Invalid session, re-authenticating...");
            await sock.authenticate();
        }
    });

    sock.ev.on("auth.success", async () => {
       

        console.log("[INFO] Authenticated successfully");
    });

   

    sock.ev.on("creds.update", saveCreds);
}

connectionLogic();