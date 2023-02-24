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
    ? Тайлбар
    ? Сонголтууд, төлөв шалгаад ямар байх эсэхийг шийднэ.
*/
import inquirer from "inquirer";
import { LearnFlashcard } from "./LearnFlashcard.js";
import { EditFlashcard } from "./EditFlashcard.js";
import { PlayFlashcard } from "./PlayFlashcard.js";
export class Commander {
    constructor(state = "idle") {
        this.state = state;
    }
    sayHello() {
        console.log("\n****************************");
        console.log(" Тавтай морил !");
        console.log("****************************\n");
    }
    startApp() {
        return __awaiter(this, void 0, void 0, function* () {
            let flag = true;
            let options = [];
            while (flag) {
                /* СОНГОЛТ */
                if (this.state === "idle") {
                    options = [
                        {
                            type: "list",
                            name: "option",
                            message: "Та юу хийх вэ?",
                            choices: ["Тоглох", "Засах", "Сурах", "Гарах"],
                        },
                    ];
                    yield inquirer.prompt(options).then((answers) => {
                        if (answers.option === "Тоглох") {
                            this.state = "play";
                        }
                        else if (answers.option === "Засах") {
                            this.state = "edit";
                        }
                        else if (answers.option === "Сурах") {
                            this.state = "learn";
                        }
                        else {
                            flag = false;
                        }
                    });
                    /* ТОГЛОХ */
                }
                else if (this.state === "play") {
                    const flashcard = new PlayFlashcard();
                    options = [
                        {
                            type: "list",
                            name: "option",
                            message: "Тоглох",
                            choices: ["Асуултыг санамсаргүй бад ", "Засах", "Устгах", "Гарах"],
                        },
                    ];
                    yield inquirer.prompt(options).then((answers) => __awaiter(this, void 0, void 0, function* () {
                        yield flashcard.startApp();
                    }));
                    this.state = "idle";
                    /* ЗАСАХ */
                }
                else if (this.state === "edit") {
                    const flashcard = new EditFlashcard();
                    options = [
                        {
                            type: "list",
                            name: "option",
                            message: "Засах үйлдэл",
                            choices: ["Нэмэх", "Засах", "Устгах", "Гарах"],
                        },
                    ];
                    yield inquirer.prompt(options).then((answers) => __awaiter(this, void 0, void 0, function* () {
                        if (answers.option === "Засах") {
                            yield flashcard.editFlashcard();
                        }
                        else if (answers.option === "Устгах") {
                            yield flashcard.deleteFlashcard();
                        }
                        else if (answers.option === "Нэмэх") {
                            yield flashcard.addFlashcard();
                        }
                    }));
                    this.state = "idle";
                    /* СУРАХ */
                }
                else if (this.state === "learn") {
                    const flashcard = new LearnFlashcard();
                    flashcard.startApp();
                    this.state = "idle";
                }
            }
        });
    }
}
