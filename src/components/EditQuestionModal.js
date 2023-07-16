import React, { useState } from "react";

const EditQuestionModal = ({ question, onUpdateQuestion, onClose }) => {
    const [editedQuestion, setEditedQuestion] = useState(question);

    const handleChange = (e) => {
        setEditedQuestion((prevQuestion) => ({
            ...prevQuestion,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateQuestion(editedQuestion);
    };

    let mystyle = {
        backgroundColor: '#010b1c',
        color: 'white',
    }

    return (
        <div className="modal-overlay">
            <div className="modal-dialog modal-dialog-centered card-custom mb-2">
                <div className="modal-content p-4">
                    <div className="modal-header">
                        <h3 className="modal-title mb-3">Edit Question</h3>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Question:</label>
                                <input
                                    style={mystyle}
                                    type="text"
                                    name="questionText"
                                    value={editedQuestion.questionText}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            {/* Add input fields for other question properties (options, correct solution, etc.) */}
                            {/* For example: */}
                            <div className="form-group">
                                <label>Option 1:</label>
                                <input
                                    style={mystyle}
                                    type="text"
                                    name="option1"
                                    value={editedQuestion.option1}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Option 2:</label>
                                <input
                                    style={mystyle}
                                    type="text"
                                    name="option2"
                                    value={editedQuestion.option2}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Option 3:</label>
                                <input
                                    style={mystyle}
                                    type="text"
                                    name="option3"
                                    value={editedQuestion.option3}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Option 4:</label>
                                <input
                                    style={mystyle}
                                    type="text"
                                    name="option4"
                                    value={editedQuestion.option4}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            {/* Add more option fields as needed */}
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary me-2 mt-3">
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary me-2 mt-3"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditQuestionModal;
