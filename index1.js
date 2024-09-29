const TelegramBot = require('node-telegram-bot-api');
const sharp = require('sharp');
const token = '7875929774:AAEf4bLq7yd82OTnf3PPw4wwDIWo_90nDpg';
const bot = new TelegramBot(token, { polling: true });
const path = require('path');

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Inline keyboard options
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🔥Popular !", callback_data: 'data1' },
          { text: "🌟 Recommended !", callback_data: 'data2' },
          { text: "🧊 Completed !", callback_data: 'data2' },

    
        ],
        [{ text: '⏳ Ongoing !', callback_data: 'data11' }],
      ]
    }
  };

  const imagePath = path.join(__dirname, 'p1.png'); // Assuming image.png is in the same directory

  bot.sendPhoto(chatId, imagePath, {caption: "🚪🚪🚪🚪🚪🚪 WELCOME TO DHNIME 🚪🚪🚪🚪🚪🚪"}).then(() => {
  bot.sendMessage(
    chatId,
    // "🚀 *Welcome to HOT Wallet* - the next generation Telegram wallet.\n" +
    // "Create an account to use crypto and earn $HOT.\n\n" +
    // "🔐 *Is it a real wallet?*\n" +
    // "Absolutely! Creating an account means you're setting up an account on the TON, Solana, BSC, and other blockchains. It's fully functional, allowing you to store, send tokens, or export your account to any wallet.\n\n" +
    // "🔥 *What's HOT?*\n" +
    "Temukan dunia anime terbaik di ujung jari Anda dengan DHNIME, platform streaming dan download anime yang dirancang khusus untuk para pecinta anime sejati Nikmati ribuan judul anime dari berbagai genre  mulai dari yang klasik hingga rilisan terbaru, semuanya dalam kualitas terbaik dan tersedia kapan saja di mana saja!.",
    { parse_mode: 'Markdown', ...options }
);
});
});

// Handle button presses
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;

  if (callbackQuery.data === 'data1') {
    bot.sendMessage(chatId, "data1");
  }
  if (callbackQuery.data === 'data2') {
    bot.sendMessage(chatId, "data2");
  }
  if (callbackQuery.data === 'data3') {
    bot.sendMessage(chatId, "data3");
  }
});
