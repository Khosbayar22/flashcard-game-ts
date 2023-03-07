/* 
    ? Тайлбар
    ? Сонголтууд, төлөв шалгаад ямар байх эсэхийг шийднэ.
*/
import inquirer from "inquirer";
import { LearnFlashcard } from "./LearnFlashcard.js";
import { EditFlashcard } from "./EditFlashcard.js";
import { PlayFlashcard } from "./PlayFlashcard.js";
import { Database } from "./Database.js";
import * as readline from "readline";

export class Commander {
  private applications: flashcardApp[] = [];

  constructor() {
    const database = new Database();
    database.initDatabase();

    const playFlashcard = new PlayFlashcard();
    const learnFlashcard = new LearnFlashcard();
    const editFlashcard = new EditFlashcard();

    this.applications.push(playFlashcard, learnFlashcard, editFlashcard);
    this.listenBackEvent();
  }

  sayHello() {
    console.log("\n** Тавтай морил! **\n");
  }

  async startApp() {
    let flag = true;

    while (flag) {
      const options = [
        {
          type: "list",
          name: "option",
          message: "Та юу хийх вэ?",
          choices: ["Тоглох", "Өөрчлөлт оруулах", "Сурах", "< Гарах"],
        },
      ];

      const { option } = await inquirer.prompt(options);

      switch (option) {
        case "Тоглох":
          await this.applications[0].startApp();
          break;
        case "Сурах":
          await this.applications[1].startApp();
          break;
        case "Өөрчлөлт оруулах":
          await this.applications[2].startApp();
          break;
        default:
          flag = false;
          break;
      }
    }
    console.log("** Баяртай! **");
  }

  private listenBackEvent() {
    process.on("disconnect", () => {
      console.log(`About to exit with code: `);
    });
  }
}
