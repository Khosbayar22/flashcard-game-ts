import inquirer, { QuestionCollection } from "inquirer";
import { LearnFlashcard } from "./LearnFlashcard.js";
import { EditFlashcard } from "./EditFlashcard.js";
import { PlayFlashcard } from "./PlayFlashcard.js";
import { Database } from "./Database.js";

export class Commander {
  constructor() {
    const database = new Database();
    database.initDatabase();
  }

  sayHello() {
    console.log("\n** Тавтай морил! **\n");
  }

  async startApp() {
    let flag = true;
    let options: QuestionCollection = [];

    let apps = [new PlayFlashcard(), new EditFlashcard(), new LearnFlashcard()];

    while (flag) {
      /* СОНГОЛТ */

      options = [
        {
          type: "list",
          name: "option",
          message: "Та юу хийх вэ?",
          choices: [...apps.map((i) => i.getTitle()), "< Гарах"],
        },
      ];
      const answers = await inquirer.prompt(options);
      const currentIndex = options[0].choices.indexOf(answers.option);
      apps[currentIndex] ? await apps[currentIndex].startApp() : (flag = false);
    }

    console.log("** Баяртай! **");
  }
}
