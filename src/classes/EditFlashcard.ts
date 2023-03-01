/* 
    ? Өгөгдлийн сангаас өгөгдлийг уншина.
    ? Өгөгдөл шинэчлэх
    ? Устгах
    ? Үүсгэх
    ? Засах
*/
import * as fs from "fs";
import inquirer, { QuestionCollection } from "inquirer";

export class EditFlashcard implements flashcardApp {
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
  async startApp() {}

  private updateDatabase(dataString: string) {
    return new Promise((resolve, reject) => {
      fs.writeFile("./db.json", dataString, (err) => {
        if (err) {
          console.log("__ Алдаатай __");
          reject(true);
        } else {
          console.log("** Амжилттай! **");
          resolve(true);
        }
      });
    });
  }
  async editFlashcard() {
    this.deleteFlashcard();
    this.addFlashcard();
  }
  async deleteFlashcard() {
    await this.initDatabase();
    const choices = this.cards.map((item) => {
      return item.question;
    });
    let options: QuestionCollection = [
      {
        type: "checkbox",
        name: "choice",
        message: "Устгах flashcard -аа сонгоно уу",
        choices: choices,
      },
    ];
    const answers = await inquirer.prompt(options);
    const deletedData = this.cards.filter(
      (item) => !answers.choice.includes(item.question)
    );
    const dataString = JSON.stringify(deletedData);
    await this.updateDatabase(dataString);
  }
  async addFlashcard() {
    await this.initDatabase();
    let options: QuestionCollection = [
      {
        type: "input",
        name: "question",
        message: "Асуулт: ",
      },
      {
        type: "input",
        name: "answer",
        message: "Хариулт: ",
      },
    ];
    const answers: flashcardData = await inquirer.prompt(options);
    this.cards.push(answers);
    const dataString = JSON.stringify(this.cards);
    await this.updateDatabase(dataString);
  }
}
