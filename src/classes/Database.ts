import { readFile, writeFile } from "fs";

export class Database {
  static flashcards: Flashcard[] = [];

  initDatabase() {
    new Promise((resolve, reject) => {
      readFile("db.json", "utf8", (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        const jsonData = JSON.parse(data);
        Database.flashcards = jsonData;

        resolve(jsonData);
      });
    });
  }

  updateDatabase(dataString: string) {
    new Promise((resolve, reject) => {
      writeFile("./db.json", dataString, (err: any) => {
        if (err) {
          reject(true);
        } else {
          resolve(true);
        }
      });
    })
      .then(() => {
        console.log("** Амжилттай! **");
      })
      .catch(() => {
        console.log("__ Алдаатай __");
      });
    this.initDatabase();
  }
}
