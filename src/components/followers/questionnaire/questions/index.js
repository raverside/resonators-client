import React from "react";

import BooleanQuestion from "./BooleanQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

function Question({ question, onAnswer }) {
    switch (question.type) {
        case "numeric":
            return (
                <MultipleChoiceQuestion
                    question={question.body}
                    options={question.options}
                    chosen={question.answer}
                    handleAnswer={onAnswer}
                />
            );
        case "boolean":
            return (
                <BooleanQuestion
                    question={question.body}
                    yes={question.options[0]}
                    no={question.options[1]}
                    chosen={question.answer}
                    handleAnswer={onAnswer}
                />
            );
        default:
            return null;
    }
}

export { BooleanQuestion, MultipleChoiceQuestion };
export default Question;
