"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBot = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
// import { userLogin } from "./auth";
const config_1 = require("./config");
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
        var _a;
        const chatId = msg.chat.id;
        // const userName = msg.from.username;
        console.log(match, "this is match", msg, "this is msg");
        // if (match) {
        //   const referral = match[1];
        //   userLogin({
        //     userEmail: msg.from?.username,
        //     userName: msg.from?.first_name,
        //   });
        // }
        const replyMarkup = {
            inline_keyboard: [
                [{ text: "Open Vegastar", web_app: { url: config_1.WEB_APP_URL } }],
            ],
        };
        bot.sendPhoto(chatId, "https://admin.naijabet.bet/static/media/logo.21c8b3b3.png", {
            caption: `Welcome, @${(_a = msg.from) === null || _a === void 0 ? void 0 : _a.username}, to the NaijaBet!`,
            reply_markup: replyMarkup,
        });
        // bot.sendPhoto(chatId, "https://contents.static-slotcity.com/game_pic/ppc/en/216x160/vs12scode.jpg", { reply_markup: replyMarkup });
        // bot.sendMessage(chatId, `Welcome, ${userName}, to the Vegastar Casino!`, { reply_markup: replyMarkup });
    });
};
exports.runBot = runBot;
(0, exports.runBot)();
