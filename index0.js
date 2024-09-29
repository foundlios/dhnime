const TelegramBot = require('node-telegram-bot-api');
const token = '7875929774:AAEf4bLq7yd82OTnf3PPw4wwDIWo_90nDpg';  // Token bot Anda
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
          { text: "🔥Popular !", callback_data: 'popular' },
          { text: "🌟 Recommended !", callback_data: 'data2' },
          { text: "🧊 Completed !", callback_data: 'data3' }
        ],
        [{ text: '⏳ Ongoing !', callback_data: 'popular1' }],
      ]
    }
  };

  const imagePath = path.join(__dirname, 'p1.png'); // Gambar utama

  // Send photo with menu options
  bot.sendPhoto(chatId, imagePath, {
    caption: "🚪🚪🚪🚪🚪🚪 WELCOME TO DHNIME 🚪🚪🚪🚪🚪🚪"
  }).then(() => {
    bot.sendMessage(
      chatId,
      "Temukan dunia anime terbaik di ujung jari Anda dengan DHNIME, platform streaming dan download anime yang dirancang khusus untuk para pecinta anime sejati Nikmati ribuan judul anime dari berbagai genre mulai dari yang klasik hingga rilisan terbaru, semuanya dalam kualitas terbaik dan tersedia kapan saja di mana saja!.",
      { parse_mode: 'Markdown', ...options }
    );
  });
});

// Handle button presses
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;

  if (callbackQuery.data === 'popular') {
    // Send images for the Popular section in 2 rows and 5 columns
    const images = [
      'https://picsum.photos/200/300?random=1',
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=3',
      'https://picsum.photos/200/300?random=4',
      'https://picsum.photos/200/300?random=5',
      'https://picsum.photos/200/300?random=6',
      'https://picsum.photos/200/300?random=7',
      'https://picsum.photos/200/300?random=8',
      'https://picsum.photos/200/300?random=9',
      'https://picsum.photos/200/300?random=10'
    ];

    // Create an inline keyboard with image buttons
    const inlineKeyboard = images.map((image, index) => ({
      text: `Image ${index + 1}`, // Button text
      callback_data: `image_${index}` // Callback data for each image
    }));

    const rows = [];
    for (let i = 0; i < inlineKeyboard.length; i += 2) {
      rows.push(inlineKeyboard.slice(i, i + 2)); // Create 2 columns
    }

    // Add a back button to return to the main menu
    rows.push([{ text: "⬅️ Back", callback_data: 'back_to_main' }]);

    // Send the first image along with the inline keyboard
    bot.sendPhoto(chatId, images[0], {
      caption: "🔥 Popular Anime Menu - Click to view images!",
      reply_markup: {
        inline_keyboard: rows
      }
    });
  }

  if (callbackQuery.data.startsWith('image_')) {
    const index = parseInt(callbackQuery.data.split('_')[1]);
    const images = [
      'https://picsum.photos/200/300?random=1',
      'https://picsum.photos/200/300?random=2',
      'https://picsum.photos/200/300?random=3',
      'https://picsum.photos/200/300?random=4',
      'https://picsum.photos/200/300?random=5',
      'https://picsum.photos/200/300?random=6',
      'https://picsum.photos/200/300?random=7',
      'https://picsum.photos/200/300?random=8',
      'https://picsum.photos/200/300?random=9',
      'https://picsum.photos/200/300?random=10'
    ];

    // Resend the selected image
    bot.sendPhoto(chatId, images[index], {
      caption: `Selected Your Popular Movie ${index + 1}`,
      reply_markup: {
        inline_keyboard: [
          [
            { text: "⬅️ Back", callback_data: 'popular' },
            { text: "🏠 Home", callback_data: 'back_to_main' }
          ]
        ]
      }
    });
  }

  if (callbackQuery.data === 'data2') {
    bot.sendMessage(chatId, "🌟 Recommended Anime");
  }

  if (callbackQuery.data === 'data3') {
    bot.sendMessage(chatId, "🧊 Completed Anime");
  }

  if (callbackQuery.data === 'back_to_main') {
    // Return to the main menu and send the image with main menu options
    const mainMenuOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🔥Popular !", callback_data: 'popular' },
            { text: "🌟 Recommended !", callback_data: 'data2' },
            { text: "🧊 Completed !", callback_data: 'data3' }
          ],
          [{ text: '⏳ Ongoing !', callback_data: 'popular1' }]
        ]
      }
    };

    const imagePath = path.join(__dirname, 'p1.png'); // Gambar utama

    // Resend the image and the main menu options
    bot.sendPhoto(chatId, imagePath, {
      caption: "🚪🚪🚪🚪🚪🚪 WELCOME TO DHNIME 🚪🚪🚪🚪🚪🚪"
    }).then(() => {
      bot.sendMessage(
        chatId,
        "Temukan dunia anime terbaik di ujung jari Anda dengan DHNIME, platform streaming dan download anime yang dirancang khusus untuk para pecinta anime sejati Nikmati ribuan judul anime dari berbagai genre mulai dari yang klasik hingga rilisan terbaru, semuanya dalam kualitas terbaik dan tersedia kapan saja di mana saja!.",
        { parse_mode: 'Markdown', ...mainMenuOptions }
      );
    });
  }
});
