const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

// Inisialisasi bot Telegram dan Express
const token = '7875929774:AAEf4bLq7yd82OTnf3PPw4wwDIWo_90nDpg'; // Ganti dengan token bot kamu
const bot = new TelegramBot(token, { polling: false }); // Nonaktifkan polling karena kita menggunakan webhook
const app = express();

// URL aplikasi Vercel
const url = 'https://dhnime.vercel.app/'; // Ganti dengan URL Vercel-mu
const port = process.env.PORT || 3000;

// Set webhook
bot.setWebHook(`${url}/bot${token}`);

// Middleware untuk parsing request body sebagai JSON
app.use(express.json());

// Route untuk webhook
app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200); // Mengirim status OK
});

// Pesan selamat datang dan caption utama
const welcomeMessage = "Temukan anime terbaik di ujung jari Anda dengan DHNIME, platform streaming dan download anime yang dirancang khusus untuk para pecinta anime sejati. Nikmati ribuan judul anime dari berbagai genre mulai dari yang klasik hingga rilisan terbaru, semuanya dalam kualitas terbaik dan tersedia kapan saja di mana saja!";
const captionMain = '🚪🚪💎🚪🚪 💎 DHNIME 💎🚪🚪💎🚪🚪';

// Command /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Inline keyboard options
    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "🔥Popular!", callback_data: 'popular' },
                    { text: "🌟 Recommend!", callback_data: 'data2' },
                    { text: "🧊 Completed!", callback_data: 'data3' }
                ],
                [{ text: '⏳ Ongoing!', callback_data: 'popular1' }],
            ]
        }
    };

    const imagePath = path.join(__dirname, 'p1.png'); // Gambar utama (pastikan file p1.png ada di direktori yang benar)

    bot.sendPhoto(chatId, imagePath, {
        caption: captionMain
    }).then(() => {
        bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown', ...options });
    }).catch(err => {
        console.error('Error saat mengirim gambar / pesan:', err);
    });
});

// Handle button presses
bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;

    if (callbackQuery.data === 'popular') {
        const images = [
            'https://dummyimage.com/320x200/000/fff',
            'https://dummyimage.com/320x200/000/fff',
            // Tambahkan lebih banyak gambar sesuai kebutuhan
        ];

        const popularMovieTitles = [
            "Shrouding the Heavens",
            "Perfect World",
            // Tambahkan lebih banyak judul sesuai kebutuhan
        ];

        const inlineKeyboard = images.map((image, index) => ({
            text: popularMovieTitles[index],
            callback_data: `popularimage_${index}`
        }));

        const rows = [];
        for (let i = 0; i < inlineKeyboard.length; i += 2) {
            rows.push(inlineKeyboard.slice(i, i + 2)); // 2 kolom
        }

        // Tombol back
        rows.push([{ text: "⬅️ Back", callback_data: 'back_to_main' }]);

        bot.sendPhoto(chatId, images[0], {
            caption: "🔥 Popular Anime Menu - Click to view images!",
            reply_markup: { inline_keyboard: rows }
        }).catch(err => {
            console.error('Error saat mengirim gambar Popular:', err);
        });
    }

    if (callbackQuery.data.startsWith('popularimage_')) {
        const index = parseInt(callbackQuery.data.split('_')[1]);
        const images = [
            'https://dummyimage.com/320x200/000/fff',
            // Tambahkan lebih banyak gambar sesuai kebutuhan
        ];

        bot.sendPhoto(chatId, images[index], {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🎦 Episode ?', url: 'https://drive.google.com' }],
                    [
                        { text: "◀️ Prev", callback_data: 'popular' },
                        { text: "Next ▶️", callback_data: 'back_to_main' }
                    ],
                    [{ text: '👑 ALL EPS ?', callback_data: 'all_eps' }],
                    [
                        { text: "⬅️ Back", callback_data: 'popular' },
                        { text: "🏠 Home", callback_data: 'back_to_main' }
                    ]
                ]
            }
        }).catch(err => {
            console.error('Error saat mengirim gambar selected:', err);
        });
    }

    if (callbackQuery.data === 'data2') {
        bot.sendMessage(chatId, "🌟 Recommended Anime").catch(err => {
            console.error('Error saat mengirim pesan Recommended:', err);
        });
    }

    if (callbackQuery.data === 'data3') {
        bot.sendMessage(chatId, "🧊 Completed Anime").catch(err => {
            console.error('Error saat mengirim pesan Completed:', err);
        });
    }

    if (callbackQuery.data === 'back_to_main') {
        const mainMenuOptions = {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "🔥Popular!", callback_data: 'popular' },
                        { text: "🌟 Recommend!", callback_data: 'data2' },
                        { text: "🧊 Completed!", callback_data: 'data3' }
                    ],
                    [{ text: '⏳ Ongoing!', callback_data: 'popular1' }]
                ]
            }
        };

        const imagePath = path.join(__dirname, 'p1.png'); // Gambar utama

        bot.sendPhoto(chatId, imagePath, { caption: captionMain }).then(() => {
            bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown', ...mainMenuOptions });
        }).catch(err => {
            console.error('Error saat kembali ke main menu:', err);
        });
    }
});

// Jalankan server di port yang ditentukan
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
