"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBot = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
// import { userLogin } from "./auth";
const config_1 = require("./config");
const gamesContent = [
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
const runBot = () => {
    const bot = new node_telegram_bot_api_1.default(config_1.BOT_TOKEN, {
        polling: true,
    });
    bot.on("polling_error", console.log);
    bot.getMe().then(function (info) {
        console.log(`
        ${info.first_name} is ready, the username is @${info.username}
        `);
    });
    bot.onText(/\/start(?:\s+(.*))?/, (msg, match) => {
        const chatId = msg.chat.id;
        // const userName = msg.from.username;
        bot.sendPhoto(chatId, "https://admin.naijabet.bet/static/media/logo.21c8b3b3.png", {
            caption: `Welcome , to the NaijaBet!`,
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Open", web_app: { url: config_1.WEB_APP_URL } }],
                ],
            },
        });
    });
    bot.onText(/\/games(?:\s+(.*))?/, (msg, match) => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    bot.sendMessage("https://t.me/mini_bet_games", `
    \start
    \games
    `);
};
exports.runBot = runBot;
(0, exports.runBot)();
