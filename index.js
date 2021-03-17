//Venom - https://github.com/orkestral/venom
//Puppeteer - https://pptr.dev/
const puppeteer = require('puppeteer');
const venom = require('venom-bot');
let whatsapp;

venom.create()
  .then((client) => {
    whatsapp = client;
    start(client)
  })
  .catch((erro) => {
    console.log(erro);
  });

async function start(client) {
  await client.onMessage(async (message) => {
    if (message.body.toLowerCase().includes('view') && message.isGroupMsg === false) {
      let url = message.body.split(" ")[1]
      sendView(message.from, url)
    }
  });
}

async function sendView(phone, link) {
  for (let index = 0; index < 100; index++) {
    const browser = await puppeteer.launch({ headless: true })
    await sendMessage(phone, `🤖 Bot starting`)
    const page = await browser.newPage()
    await page.goto(link)
    await page.waitForSelector(".ytp-play-button")
    await page.click('.ytp-play-button')

    await page.waitForTimeout(35000)

    console.log(index + 1)

    await sendMessage(phone, `🤖 View: ${index + 1}`)

    // await whatsapp.sendImage(
    //   phone,
    //   'example.png',
    //   'Resultado bot',
    //   '🤖 é disso que eu sou capaz.'
    // )

    await browser.close()
  }
}

async function sendMessage(phone, message) {
  await whatsapp.sendText(phone, message)
}