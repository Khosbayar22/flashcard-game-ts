/* 
    ? Өгөгдлийн сангаас өгөгдлийг зөв хариултын хамт уншина.
*/
import * as fs from "fs";

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
    console.log("\nСурах (eng | mng) ----------------");

    this.cards.forEach((item, index) => {
      console.log(`${index + 1}: ${item.question} | ${item.answer}`);
    });
    console.log("** Буцах бол ямар нэгэн товчин дээр дарах **");
  }
}
