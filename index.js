const { DisconnectReason, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const makeWASocket = require("@whiskeysockets/baileys").default;
const xlsx = require("xlsx");

async function connectionLogic(){
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const sock = makeWASocket({
        printQRInTerminal: true,
        auth: state
    });

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, qr } = update || {};

        if (qr) {
            console.log(qr);
        }

        if (connection === "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                connectionLogic();
            }
        }
    });

    async function readExcelAndRemovePeople(filePath) {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        const phoneNumbers = data.map(row => row['PhoneNumber']);

        const participants = phoneNumbers.map(number => `${number}@s.whatsapp.net`);

        await removePeopleFromGroup("abcd-xyz@g.us", participants);
    }

    async function removePeopleFromGroup(groupId, participants) {
        for (const participant of participants) {
            try {
                const response = await sock.groupParticipantsUpdate(
                    groupId,
                    [participant],
                    "remove"
                );
                console.log(`Removed ${participant}: `, response);
            } catch (error) {
                if (error.message.includes('not found')) {
                    console.log(`Participant ${participant} not found in the group.`);
                    continue; 
                } else {
                    console.error("Error removing participant: ", error);
                    continue;
                }
            }
        }
    }

    sock.ev.on("messages.update", (messageInfo) => {
        console.log(messageInfo);
    });

    sock.ev.on("messages.upsert", (messageInfoUpsert) => {
        console.log(messageInfoUpsert);
    });

    sock.ev.on('creds.update', saveCreds);

    await readExcelAndRemovePeople('demo.xlsx');
}

connectionLogic();
