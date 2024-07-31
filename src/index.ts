import TelegramBot, { Message } from "node-telegram-bot-api";
// import { userLogin } from "./auth";
import { BOT_TOKEN, WEB_APP_URL } from "./config";

const gamesContent: any[] = [
  {
    id: "game_1",
    title: "PLAY",
    description: "This is a game about breaking rocks.",
    iconPath: "https://naijabet.com/icon-256.png",
    url: "https://naijabet.com/games/smash_the_rock",
  },
  {
    id: "game_2",
    title: "PLAY",
    description: "This is an archer game.",
    iconPath: "https://naijabet.com/games/small_archer/icons/icon-256.png",
    url: "https://naijabet.com/games/small_archer",
  },
];

export const runBot = () => {
  const bot = new TelegramBot(BOT_TOKEN as string, {
    polling: true,
  });

  bot.on("polling_error", console.log);

  bot.getMe().then(function (info) {
    console.log(`
        ${info.first_name} is ready, the username is @${info.username}
        `);
  });

  bot.onText(
    /\/start(?:\s+(.*))?/,
    (msg: Message, match: RegExpExecArray | null) => {
      const chatId = msg.chat.id;
      // const userName = msg.from.username;
      bot.sendPhoto(
        chatId,
        "https://admin.naijabet.bet/static/media/logo.21c8b3b3.png",
        {
          caption: `Welcome , to the NaijaBet!`,
          reply_markup: {
            inline_keyboard: [
              [{ text: "Open", web_app: { url: WEB_APP_URL as string } }],
            ],
          },
        }
      );
    }
  );

  bot.onText(
    /\/games(?:\s+(.*))?/,
    async (msg: Message, match: RegExpExecArray | null) => {
      const chatId = msg.chat.id;
      gamesContent.forEach((game) => {
        bot.sendPhoto(chatId, game.iconPath, {
          caption: game.description,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: game.title,
                  web_app: { url: game.url },
                },
              ],
            ],
          },
        });
      });
    }
  );

  bot.sendMessage(
    "https://t.me/mini_bet_games",
    `
    \start
    \games
    `
  );
};

runBot();
