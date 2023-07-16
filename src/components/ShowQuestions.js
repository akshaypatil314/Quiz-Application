import React, { useEffect, useState } from "react";
import axios from "axios";
import { HeaderNav } from "./HeaderNav";
import EditQuestionModal from "./EditQuestionModal";

export const ShowQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState("");
    const [editedQuestion, setEditedQuestion] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8081/api/questions/getAllQuestion"
            );
            setQuestions(response.data);
        } catch (error) {
            setError("Failed to fetch questions");
        }
    };

    const handleDeleteQuestion = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/questions/${id}`);
            fetchQuestions(); // Refresh the question list
        } catch (error) {
            setError("Failed to delete question");
        }
    };

    const handleEditQuestion = (question) => {
        setEditedQuestion(question);
        setShowEditModal(true);
    };

    const handleUpdateQuestion = async (updatedQuestion) => {
        try {
            await axios.put(
                `http://localhost:8081/api/questions/${updatedQuestion.id}`,
                updatedQuestion
            );
            fetchQuestions(); // Refresh the question list
            setShowEditModal(false); // Close the edit modal
        } catch (error) {
            setError("Failed to update question");
        }
    };


    return (
        <div>
            <HeaderNav />
            <div className="container">
                <h2 className="mt-4 mb-3">Show Questions</h2>
                {questions.length > 0 ? (
                    <table className="custom-table mb-5">
                        <thead>
                            <tr className="custom-table">
                                <th className="custom-table">Question</th>
                                <th className="custom-table">Option1</th>
                                <th className="custom-table">Option2</th>
                                <th className="custom-table">Option3</th>
                                <th className="custom-table">Option4</th>
                                <th className="custom-table">Correct Solution</th>
                                <th className="custom-table">Technology</th>
                                <th className="custom-table">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question) => (
                                <tr key={question.id} className="custom-table">
                                    <td className="custom-table">{question.questionText}</td>
                                    <td className="custom-table">{question.option1}</td>
                                    <td className="custom-table">{question.option2}</td>
                                    <td className="custom-table">{question.option3}</td>
                                    <td className="custom-table">{question.option4}</td>
                                    <td className="custom-table">{question.correctOption}</td>
                                    <td className="custom-table">{question.technology}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteQuestion(question.id)}
                                        >
                                            Delete
                                        </button>{" "}
                                        <button
                                            className="btn btn-primary btn-sm mt-1"
                                            onClick={() => handleEditQuestion(question)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No questions found</p>
                )}
                {showEditModal && (
                    <EditQuestionModal
                        question={editedQuestion}
                        onUpdateQuestion={handleUpdateQuestion}
                        onClose={() => setShowEditModal(false)}
                    />
                )}
                {error && <div className="text-danger mt-2">{error}</div>}
            </div>
        </div>
    );
};

export default ShowQuestions;
