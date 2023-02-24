class Flashcard implements flashcardData {
  question: string;
  answer: string;

  constructor(data: flashcardData) {
    this.question = data.question;
    this.answer = data.answer;
  }

  getQuestion(): string {
    return this.question;
  }

  getAnswer(): string {
    return this.answer;
  }
}
