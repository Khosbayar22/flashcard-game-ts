import inquirer, { QuestionCollection } from "inquirer";
import { Database } from "./Database.js";

export class EditFlashcard implements flashcardApp {
  run(): void {}

  async startApp() {
    const options = [
      {
        type: "list",
        name: "option",
        message: "Засах үйлдэл",
        choices: ["+ Нэмэх", "Засах", "Устгах", "< Буцах"],
      },
    ];
    await inquirer.prompt(options).then(async (answers) => {
      if (answers.option === "Засах") {
        await this.editFlashcard();
      } else if (answers.option === "Устгах") {
        await this.deleteFlashcard();
      } else if (answers.option === "+ Нэмэх") {
        await this.addFlashcard();
      }
    });
  }

  async editFlashcard() {
    this.deleteFlashcard();
    this.addFlashcard();
  }

  async deleteFlashcard() {
    let cards: flashcardData[] = Database.flashcards;
    const choices = cards.map((item) => {
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
    const deletedData = cards.filter(
      (item) => !answers.choice.includes(item.question)
    );
    const dataString = JSON.stringify(deletedData);
    await this.updateDatabase(dataString);
  }

  async addFlashcard() {
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
    let cards: flashcardData[] = Database.flashcards;
    const answers: flashcardData = await inquirer.prompt(options);
    cards.push(answers);
    const dataString = JSON.stringify(cards);
    this.updateDatabase(dataString);
  }

  updateDatabase(dataString: string) {
    const database = new Database();
    database.updateDatabase(dataString);
  }
}
