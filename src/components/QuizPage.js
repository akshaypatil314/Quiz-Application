import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import UserHeaderNav from "./UserHeaderNav";
import "../App.css"

const QuizPage = () => {

    const [quizList, setQuizList] = useState([]);
    const [selectedTechnology, setSelectedTechnology] = useState("");
    const [selectedQuiz, setSelectedQuiz] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState("");
    const [quizQuest, setQuizQuest] = useState([]);
    const [totalMarks, setTotalMarks] = useState(0);

    const location = useLocation();
    const username = location.state;

    useEffect(() => {
        fetchQuizList();
    }, []);

    useEffect(() => {
        // console.log("Selected Quiz:", selectedQuiz);
        if (selectedQuiz) {
            fetchQuizQuest(selectedQuiz);
        }
    }, [selectedQuiz]);

    useEffect(() => {
        console.log("Selected Marks Ussefeffect:", totalMarks);
    }, [totalMarks]);



    const fetchQuizList = async () => {
        try {
            const response = await axios.get("http://localhost:8081/api/quizzes");
            setQuizList(response.data);
        } catch (error) {
            setError("Failed to fetch quiz list");
        }
    };

    console.log(quizList)

    const fetchQuizQuest = async (quizId) => {
        try {
            const response = await axios.get(
                `http://localhost:8081/api/quizzes/getQuizQuestById/${quizId}`
            );
            setQuizQuest(response.data);
            setSelectedOptions([]);
        } catch (error) {
            setError("Failed to fetch quiz questions");
        }
    };

    const handleTechnologyChange = (e) => {
        setSelectedTechnology(e.target.value);
        setSelectedQuiz("");
        setQuizQuest([]);
    };

    console.log(quizQuest)

    const handleQuizChange = (e) => {
        setSelectedQuiz(e.target.value);
    };

    const handleOptionChange = (questionId, optionNumber) => {
        setSelectedOptions((prevSelectedOptions) => {
            const updatedOptions = [...prevSelectedOptions];
            const questionIndex = updatedOptions.findIndex(
                (option) => option.questionId === questionId
            );

            if (questionIndex !== -1) {
                // Question already exists in selectedOptions, update the option
                updatedOptions[questionIndex] = { questionId, optionNumber };
            } else {
                // Add the question and option to selectedOptions
                updatedOptions.push({ questionId, optionNumber });
            }

            return updatedOptions;
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let marks = 0; // Variable to store the total marks

            // Send each user answer individually to the backend for saving
            for (const userAnswer of selectedOptions) {
                const { questionId, optionNumber } = userAnswer;

                const userAnswers = {
                    userId: 1, // Replace with the actual user ID
                    questionId: questionId,
                    selectedOption: optionNumber,
                };


                const response = await axios.post(
                    "http://localhost:8081/api/user-answers",
                    userAnswers
                );

                const selectedQuestion = quizQuest.find(
                    (question) => question.id === questionId
                );


                console.log("Quest id", questionId);
                console.log("Correct id", selectedQuestion.correctOption);
                console.log("Quest id", selectedQuestion);
                if (selectedQuestion.correctOption === optionNumber) {
                    marks += 1;
                    console.log(marks)
                }
            }



            setTotalMarks(marks); // Update the total marks state
        } catch (error) {
            setError("Failed to submit quiz");
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    const distinctTechnologies = [
        ...new Set(quizList.map((quiz) => quiz.technology)),
    ];

    let mystyle = {
        backgroundColor: '#010b1c',
        color: 'white',
    }

    let mystyle1 = {
        backgroundColor: '#010b1c',
        color: 'white',
        border: 'none'
    }

    return (
        <div>
            <UserHeaderNav username={username} />
            <div>
                <div className="container">
                    <h1 className="p-3 text-center">Select Quiz </h1>
                    <form className="mt-3">
                        <div className="card-custom1">
                            <div className="card" style={mystyle}>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Select Technology:</label>
                                        <select
                                            style={mystyle}
                                            className="form-select"
                                            value={selectedTechnology}
                                            onChange={handleTechnologyChange}
                                        >
                                            <option value="">Select</option>
                                            {distinctTechnologies.map((technology) => (
                                                <option key={technology} value={technology}>
                                                    {technology}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {selectedTechnology && (
                                        <div className="mb-3">
                                            <label className="form-label">Select Quiz:</label>
                                            <select
                                                style={mystyle}
                                                className="form-select"
                                                value={selectedQuiz}
                                                onChange={handleQuizChange}
                                            >
                                                <option value="">Select</option>
                                                {quizList
                                                    .filter((quiz) => quiz.technology === selectedTechnology)
                                                    .map((quiz) => (
                                                        <option key={quiz.id} value={quiz.id}>
                                                            {quiz.quizName}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        {selectedQuiz && quizQuest.length > 0 && (
                            <div>
                                <h2 className="mt-5 mb-5 text-center">Quiz Questions:</h2>
                                {quizQuest.map((question) => (
                                    <div key={question.id} className="mb-3" >

                                        <h4>Q. {question.questionText}</h4>

                                        <ul className="list-group" >
                                            <li className="list-group-item" style={mystyle1}>
                                                <label className="form-check-label">
                                                    <input
                                                        style={mystyle}
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        value={1}
                                                        checked={
                                                            selectedOptions.find(
                                                                (selectedOption) =>
                                                                    selectedOption.questionId === question.id &&
                                                                    selectedOption.optionNumber === 1
                                                            ) !== undefined
                                                        }
                                                        onChange={() => handleOptionChange(question.id, 1)}
                                                        className="form-check-input me-2"
                                                    />
                                                    {question.option1}
                                                </label>
                                            </li>
                                            <li className="list-group-item" style={mystyle1}>
                                                <label className="form-check-label">
                                                    <input
                                                        style={mystyle}
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        value={2}
                                                        checked={
                                                            selectedOptions.find(
                                                                (selectedOption) =>
                                                                    selectedOption.questionId === question.id &&
                                                                    selectedOption.optionNumber === 2
                                                            ) !== undefined
                                                        }
                                                        onChange={() => handleOptionChange(question.id, 2)}
                                                        className="form-check-input me-2"
                                                    />
                                                    {question.option2}
                                                </label>
                                            </li>
                                            <li className="list-group-item" style={mystyle1}>
                                                <label className="form-check-label">
                                                    <input
                                                        style={mystyle}
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        value={3}
                                                        checked={
                                                            selectedOptions.find(
                                                                (selectedOption) =>
                                                                    selectedOption.questionId === question.id &&
                                                                    selectedOption.optionNumber === 3
                                                            ) !== undefined
                                                        }
                                                        onChange={() => handleOptionChange(question.id, 3)}
                                                        className="form-check-input me-2"
                                                    />
                                                    {question.option3}
                                                </label>
                                            </li>
                                            <li className="list-group-item" style={mystyle1}>
                                                <label className="form-check-label">
                                                    <input
                                                        style={mystyle}
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        value={4}
                                                        checked={
                                                            selectedOptions.find(
                                                                (selectedOption) =>
                                                                    selectedOption.questionId === question.id &&
                                                                    selectedOption.optionNumber === 4
                                                            ) !== undefined
                                                        }
                                                        onChange={() => handleOptionChange(question.id, 4)}
                                                        className="form-check-input me-2"
                                                    />
                                                    {question.option4}
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                ))}

                                {totalMarks > 0 && (
                                    <div className="mt-3 mb-5">
                                        <div className="card card-custom" style={mystyle}>
                                            <div className="card-body">
                                                <h4 className="text-center">Your Score : {totalMarks}</h4>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary mb-5"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div >

        </div >
    );
};

export default QuizPage;
