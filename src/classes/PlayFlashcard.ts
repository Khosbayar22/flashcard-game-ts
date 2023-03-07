import inquirer, { QuestionCollection } from "inquirer";
import { Database } from "./Database.js";

export class PlayFlashcard implements flashcardApp {
  async startApp() {
    const options = [
      {
        type: "confirm",
        name: "confirmShuffle",
        message: "Асуултуудыг самансаргүй байдлаар холих",
      },
    ];

    await inquirer.prompt(options).then(async (answers) => {
      await this.run(answers?.confirmShuffle);
    });
  }

  async run(shuffle: boolean = false): Promise<void> {
    let cards: flashcardData[] = Database.flashcards;

    if (cards.length > 0) {
      let questions = shuffle ? this.shuffleArray(cards) : cards;
      let sequence: number = 1;
      let correct = 0;
      for (const el of questions) {
        const question: QuestionCollection = {
          type: "input",
          name: "answer",
          message: el.question,
        };
        console.log(`Карт #${sequence} ----------------`);
        await inquirer.prompt(question).then((answers) => {
          if (
            el.answer.toLowerCase() === this.setStringFormat(answers.answer)
          ) {
            console.log("** Зөв! **\n");
            correct += 1;
          } else {
            console.log(`__ Буруу! Зөв хариулт ${el.answer} __\n`);
          }
        });
        sequence += 1;
      }
      console.log(`Нийт: ${questions.length} / ${correct} ----------------`);
    } else {
      console.log("** Хоосон байна! **");
    }
  }

  shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }

  setStringFormat(inputString: string): string {
    const latinToCyrillicMap: { [key: string]: string } = {
      sh: "ш",
      kh: "х",
      ts: "ц",
      ch: "ч",
      zh: "ж",
      h: "х",
      a: "а",
      b: "б",
      v: "в",
      g: "г",
      d: "д",
      ai: "ай",
      ei: "эй",
      oi: "ой",
      ui: "уй",
      yo: "ё",
      z: "з",
      i: "и",
      y: "й",
      k: "к",
      l: "л",
      m: "м",
      n: "н",
      o: "о",
      u: "у",
      p: "п",
      r: "р",
      s: "с",
      t: "т",
      f: "ф",
      e: "э",
      yu: "ю",
      ya: "я",
    };

    let outputString = inputString.trim().toLowerCase();

    for (const cyrillicChar in latinToCyrillicMap) {
      const latinChar = latinToCyrillicMap[cyrillicChar];
      const regex = new RegExp(cyrillicChar, "g");
      outputString = outputString.replace(regex, latinChar);
    }
    return outputString;
  }
}
