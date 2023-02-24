var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
    ? Өгөгдлийн сангаас өгөгдлийг зөв хариултын хамт уншина.
*/
import * as fs from "fs";
import inquirer from "inquirer";
export class LearnFlashcard {
    constructor() {
        this.cards = [];
    }
    initDatabase() {
        return new Promise((resolve, reject) => {
            fs.readFile("db.json", "utf8", (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                const jsonData = JSON.parse(data);
                this.cards = jsonData;
                resolve(this.cards);
            });
        });
    }
    startApp() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initDatabase();
            console.log("\n\n****************************");
            console.log(" Сурах");
            const ui = new inquirer.ui.BottomBar();
            this.cards.forEach((item) => {
                ui.log.write(`${item.question} - ${item.answer}`);
            });
        });
    }
}
