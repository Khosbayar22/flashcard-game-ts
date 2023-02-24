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
    ? Өгөгдлийн сангаас өгөгдлийг уншина.
    ? Өгөгдөл шинэчлэх
    ? Устгах
    ? Үүсгэх
    ? Засах
*/
import * as fs from "fs";
import inquirer from "inquirer";
export class EditFlashcard {
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
        return __awaiter(this, void 0, void 0, function* () { });
    }
    updateDatabase(dataString) {
        fs.writeFile("./db.json", dataString, (err) => {
            if (err) {
                console.log("Алдаатай", err);
            }
            else {
                console.log("Амжилттай");
            }
        });
    }
    editFlashcard() {
        return __awaiter(this, void 0, void 0, function* () {
            this.deleteFlashcard();
            this.addFlashcard();
        });
    }
    deleteFlashcard() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initDatabase();
            const choices = this.cards.map((item) => {
                return item.question;
            });
            let options = [
                {
                    type: "checkbox",
                    name: "choice",
                    message: "Устгах flashcard -аа сонгоно уу",
                    choices: choices,
                },
            ];
            const answers = yield inquirer.prompt(options);
            const deletedData = this.cards.filter((item) => !answers.choice.includes(item.question));
            const dataString = JSON.stringify(deletedData);
            this.updateDatabase(dataString);
        });
    }
    addFlashcard() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initDatabase();
            let options = [
                {
                    type: "input",
                    name: "question",
                    message: "Асуултаа оруулна уу",
                },
                {
                    type: "input",
                    name: "answer",
                    message: "Хариултаа оруулна уу",
                },
            ];
            const answers = yield inquirer.prompt(options);
            this.cards.push(answers);
            const dataString = JSON.stringify(this.cards);
            this.updateDatabase(dataString);
        });
    }
}
