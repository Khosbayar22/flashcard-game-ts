import inquirer, { QuestionCollection } from "inquirer";
import { Database } from "./Database.js";

export class EditFlashcard implements flashcardApp {
  getTitle(): string {
    return "Өөрчлөлт оруулах";
  }
  cards: flashcardData[] = [];

  async startApp() {
    this.cards = Database.flashcards;

    let options: QuestionCollection = [
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
    const choices = this.cards.map((item) => {
      return item.question;
    });
    let options: QuestionCollection = [
      {
        type: "list",
        name: "choice",
        message: "Өөрчлөх flashcard -аа сонгоно уу",
        choices: choices,
      },
    ];
    const answers = await inquirer.prompt(options);

    let newOptions: QuestionCollection = [
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
    const newAnswers: flashcardData = await inquirer.prompt(newOptions);

    const updateData = this.cards.filter((item) => {
      return item.question !== answers.choice;
    });
    updateData.push(newAnswers);
    const dataString = JSON.stringify(updateData);
    this.updateDatabase(dataString);
  }

  async deleteFlashcard() {
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
    this.updateDatabase(dataString);
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
    this.cards.push(answers);
    const dataString = JSON.stringify(this.cards);
    this.updateDatabase(dataString);
  }
  private updateDatabase(dataString: string) {
    const database = new Database();
    database.updateDatabase(dataString);
  }
}
