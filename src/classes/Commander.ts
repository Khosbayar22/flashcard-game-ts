import inquirer, { QuestionCollection } from "inquirer";
import { LearnFlashcard } from "./LearnFlashcard.js";
import { EditFlashcard } from "./EditFlashcard.js";
import { PlayFlashcard } from "./PlayFlashcard.js";
import { Database } from "./Database.js";

export class Commander {
  state: string;

  constructor(state: string = "idle") {
    this.state = state;
  }

  sayHello() {
    console.log("\n** Тавтай морил! **\n");
  }

  async startApp() {
    let flag: boolean = true;
    let options: QuestionCollection = [];

    const database = new Database();
    database.initDatabase();
    let apps = {
      play: new PlayFlashcard(),
      learn: new LearnFlashcard(),
      edit: new EditFlashcard(),
    };

    while (flag) {
      /* СОНГОЛТ */
      if (this.state === "idle") {
        options = [
          {
            type: "list",
            name: "option",
            message: "Та юу хийх вэ?",
            choices: ["Тоглох", "Өөрчлөлт оруулах", "Сурах", "< Гарах"],
          },
        ];
        await inquirer.prompt(options).then((answers) => {
          if (answers.option === "Тоглох") {
            this.state = "play";
          } else if (answers.option === "Өөрчлөлт оруулах") {
            this.state = "edit";
          } else if (answers.option === "Сурах") {
            this.state = "learn";
          } else if (answers.option === "< Гарах") {
            flag = false;
          } else {
            console.log("** Та доорх сонголтоос сонгоно уу! **");
          }
        });
      } else if (this.state === "play") {
        await apps[this.state].startApp();
        this.state = "idle";
      } else if (this.state === "edit") {
        await apps[this.state].startApp();
        this.state = "idle";
      } else if (this.state === "learn") {
        await apps[this.state].startApp();
        this.state = "idle";
      }
    }
    console.log("** Баяртай! **");
  }
}
