import React, { useEffect, useState } from "react";
import axios from "axios";
import { HeaderNav } from "./HeaderNav";

const QuizGenerator = () => {
    const [questions, setQuestions] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [selectedTechnology, setSelectedTechnology] = useState("");
    const [quizName, setQuizName] = useState("");
    const [quiz, setQuiz] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8081/api/questions/getAllQuestion"
            );
            setQuestions(response.data);

            //If any question is duplicate then it will be consider only once
            const distinctTechnologies = [
                ...new Set(response.data.map((question) => question.technology)),
            ];
            setTechnologies(distinctTechnologies);
        } catch (error) {
            setError("Failed to fetch questions");
        }
    };

    const handleTechnologyChange = (e) => {
        setSelectedTechnology(e.target.value);
    };


    const handleGenerateQuiz = () => {
        const filteredQuestions = questions.filter(
            (question) => question.technology === selectedTechnology
        );
        const selectedQuestions =
            filteredQuestions.length > 5
                ? getRandomItemsFromArray(filteredQuestions, 5)
                : filteredQuestions;

        setQuiz(selectedQuestions);

        const quizData = {
            quizName: quizName,
            technology: selectedTechnology,
            quizQuestions: selectedQuestions.map((question) => ({
                question: question,
                quiz: null, // Set the quiz property to null initially
            })),
        };


        axios
            .post(`http://localhost:8081/api/quizzes?title=${quizName}&technology=${selectedTechnology}`, quizData)
            .then((response) => {
                console.log("Quiz generated successfully:", response.data);
            })
            .catch((error) => {
                console.error("Failed to generate quiz:", error);
            });
    };

    const getRandomItemsFromArray = (array, count) => {
        const shuffledArray = array.sort(() => Math.random() - 0.5);
        return shuffledArray.slice(0, count);
    };

    let mystyle = {
        backgroundColor: '#010b1c',
        color: 'white',
    }

    return (
        <div>
            <HeaderNav />
            <div className="container">
                <div className="card card-custom mt-3" style={mystyle}>
                    <div className="card-body">
                        <h2 className="mt-3">Quiz Generator</h2>
                        <div className="form-group">
                            <label htmlFor="quizName">Quiz Name:</label>
                            <input
                                style={mystyle}
                                type="text"
                                className="form-control"
                                id="quizName"
                                value={quizName}
                                onChange={(e) => setQuizName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="selectedTechnology">Select Technology:</label>
                            <select
                                style={mystyle}
                                className="form-control"
                                id="selectedTechnology"
                                value={selectedTechnology}
                                onChange={handleTechnologyChange}
                            >
                                <option value="">Select</option>
                                {technologies.map((technology) => (
                                    <option value={technology} key={technology}>
                                        {technology}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="btn btn-primary mt-3"
                            onClick={handleGenerateQuiz}
                            disabled={!selectedTechnology || !quizName}
                        >
                            Generate Quiz
                        </button>
                    </div>
                </div>

                {quiz.length > 0 && (
                    <div>
                        <h3 className="m-3">Quiz Questions</h3>
                        <ul className="list-group" >
                            {quiz.map((question) => (
                                <li className="list-group-item" style={mystyle} key={question.id}>
                                    Q. {question.questionText}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {error && <div className="text-danger mt-3">{error}</div>}
            </div>
        </div>
    );
};

export default QuizGenerator;
