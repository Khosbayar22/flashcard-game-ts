import * as fs from "fs";

export class Database {
  static flashcards: flashcardData[] = [];

  initDatabase() {
    return new Promise((resolve, reject) => {
      fs.readFile("db.json", "utf8", (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const flashcardsData = JSON.parse(data);
        Database.flashcards = flashcardsData;
        resolve(flashcardsData);
      });
    });
  }

  updateDatabase(dataString: string) {
    return new Promise((resolve, reject) => {
      fs.writeFile("./db.json", dataString, (err) => {
        if (err) {
          console.log("__ Алдаатай __");
          reject(true);
        } else {
          console.log("** Амжилттай! **");
          this.initDatabase();
          resolve(true);
        }
      });
    });
  }
}
