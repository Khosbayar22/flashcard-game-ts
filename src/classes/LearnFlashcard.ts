import { Database } from "./Database.js";

export class LearnFlashcard implements flashcardApp {
  getTitle(): string {
    return "Сурах";
  }
  cards: flashcardData[] = [];

  async startApp() {
    this.cards = Database.flashcards;
    console.log("\nСурах (eng | mng) ----------------");

    this.cards.forEach((item, index) => {
      console.log(`${index + 1}: ${item.question} | ${item.answer}`);
    });
    console.log("** Буцах бол ямар нэгэн товчин дээр дарах **");
  }
}
