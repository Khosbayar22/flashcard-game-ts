/* 
    ? Тайлбар
    ? Сонголтууд, төлөв шалгаад ямар байх эсэхийг шийднэ.
*/
import inquirer, { QuestionCollection } from "inquirer";
import { LearnFlashcard } from "./LearnFlashcard.js";
import { EditFlashcard } from "./EditFlashcard.js";
import { PlayFlashcard } from "./PlayFlashcard.js";

export class Commander {
  state: string;

  constructor(state: string = "idle") {
    this.state = state;
  }

  sayHello() {
    console.log("\n****************************");
    console.log(" Тавтай морил !");
    console.log("****************************\n");
  }

  async startApp() {
    let flag: boolean = true;
    let options: QuestionCollection = [];

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
        await inquirer.prompt(options).then((answers) => {
          if (answers.option === "Тоглох") {
            this.state = "play";
          } else if (answers.option === "Засах") {
            this.state = "edit";
          } else if (answers.option === "Сурах") {
            this.state = "learn";
          } else {
            flag = false;
          }
        });
        /* ТОГЛОХ */
      } else if (this.state === "play") {
        const flashcard = new PlayFlashcard();
        options = [
          {
            type: "list",
            name: "option",
            message: "Тоглох",
            choices: ["Асуултыг санамсаргүй бад ", "Засах", "Устгах", "Гарах"],
          },
        ];
        await inquirer.prompt(options).then(async (answers) => {
          await flashcard.startApp();
        });
        this.state = "idle";
        /* ЗАСАХ */
      } else if (this.state === "edit") {
        const flashcard = new EditFlashcard();
        options = [
          {
            type: "list",
            name: "option",
            message: "Засах үйлдэл",
            choices: ["Нэмэх", "Засах", "Устгах", "Гарах"],
          },
        ];
        await inquirer.prompt(options).then(async (answers) => {
          if (answers.option === "Засах") {
            await flashcard.editFlashcard();
          } else if (answers.option === "Устгах") {
            await flashcard.deleteFlashcard();
          } else if (answers.option === "Нэмэх") {
            await flashcard.addFlashcard();
          }
        });
        this.state = "idle";
        /* СУРАХ */
      } else if (this.state === "learn") {
        const flashcard = new LearnFlashcard();
        flashcard.startApp();
        this.state = "idle";
      }
    }
  }
}