import fs from "fs";

const handler = async (m, { conn, isAdmin, isBotAdmin }) => {
  if (!m.isGroup) return global.dfail?.('group', m, conn)
  if (!isAdmin) return global.dfail?.('admin', m, conn)
  if (!isBotAdmin) return global.dfail?.('botAdmin', m, conn)

  const target = (m.mentionedJid && m.mentionedJid.length)
    ? m.mentionedJid[0]
    : m.quoted?.sender

  const thumbPath = './src/img/catalogo.jpg'
  const thumb = fs.existsSync(thumbPath) ? fs.readFileSync(thumbPath) : null

  if (!target) {
    const aviso = '*🗡️ 𝙼𝚎𝚗𝚌𝚒𝚘𝚗𝚊 𝚘 𝚛𝚎𝚜𝚙𝚘𝚗𝚍𝚎 𝙰𝚕 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚚𝚞𝚎 𝙳𝚎𝚜𝚎𝚊𝚜 𝙴𝚕𝚒𝚖𝚒𝚗𝚊𝚛*'
    return conn.sendMessage(m.chat, {
      text: aviso,
      contextInfo: {
        externalAdReply: {
          title: "𝙱𝙰𝙺𝙸 - 𝙱𝙾𝚃",
          body: "",
          thumbnail: thumb,
          sourceUrl: ""
        }
      }
    }, { quoted: m })
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove')
    await conn.sendMessage(m.chat, {
      text: '*🗡️ 𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝙴𝙻𝙸𝙼𝙸𝙽𝙰𝙳𝙾*',
      contextInfo: {
        externalAdReply: {
          title: "𝙱𝙰𝙺𝙸 - 𝙱𝙾𝚃",
          body: "",
          thumbnail: thumb,
          sourceUrl: ""
        }
      }
    }, { quoted: m })
  } catch {
    return global.dfail?.('botAdmin', m, conn)
  }
}

handler.customPrefix = /^(?:\.?kick)(?:\s+|$)/i
handler.command = new RegExp()
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler