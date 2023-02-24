/* 
    ? Өгөгдлийн сангаас өгөгдлийг зөв хариултын хамт уншина.
*/
import * as fs from "fs";
import inquirer, { QuestionCollection } from "inquirer";

export class LearnFlashcard implements flashcardApp {
  cards: flashcardData[] = [];

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
  async startApp() {
    await this.initDatabase();
    console.log("\n\n****************************");
    console.log(" Сурах");
    const ui = new inquirer.ui.BottomBar();

    this.cards.forEach((item) => {
      ui.log.write(`${item.question} - ${item.answer}`);
    });
  }
}
