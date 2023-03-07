import { Database } from "./Database.js";

export class LearnFlashcard implements flashcardApp {
  run(): void {
    const cards: flashcardData[] = Database.flashcards;
    cards.forEach((item, index) => {
      console.log(`${index + 1}: ${item.question} | ${item.answer}`);
    });
    console.log("** Буцах бол ямар нэгэн товчин дээр дарах **");
  }

  async startApp() {
    console.log("\nСурах (eng | mng) ----------------");
    this.run();
  }
}
