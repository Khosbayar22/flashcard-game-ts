"use strict";
class Flashcard {
    constructor(data) {
        this.question = data.question;
        this.answer = data.answer;
    }
    getQuestion() {
        return this.question;
    }
    getAnswer() {
        return this.answer;
    }
}
