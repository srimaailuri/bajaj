import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [inputData, setInputData] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3002/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: JSON.parse(inputData) })
            });

            const result = await response.json();
            setResponseData(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOptions(
            selectedOptions.includes(value)
                ? selectedOptions.filter(option => option !== value)
                : [...selectedOptions, value]
        );
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Data Processing Application</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputData">Input Data (JSON format):</label>
                            <textarea
                                id="inputData"
                                className="form-control"
                                value={inputData}
                                onChange={(e) => setInputData(e.target.value)}
                                rows="4"
                                placeholder='Enter JSON e.g. ["A","C","z","1","2","3"]'
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </form>
                    <div className="mt-4">
                        <h5>Select Data to Display:</h5>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                value="Alphabets"
                                onChange={handleOptionChange}
                            />
                            <label className="form-check-label">Alphabets</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                value="Numbers"
                                onChange={handleOptionChange}
                            />
                            <label className="form-check-label">Numbers</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                value="Highest alphabet"
                                onChange={handleOptionChange}
                            />
                            <label className="form-check-label">Highest Alphabet</label>
                        </div>
                    </div>
                    {responseData && (
                        <div className="mt-4">
                            {selectedOptions.includes('Alphabets') && responseData.alphabets && (
                                <div>
                                    <h5>Alphabets:</h5>
                                    <pre className="bg-light p-3">{JSON.stringify(responseData.alphabets, null, 2)}</pre>
                                </div>
                            )}
                            {selectedOptions.includes('Numbers') && responseData.numbers && (
                                <div>
                                    <h5>Numbers:</h5>
                                    <pre className="bg-light p-3">{JSON.stringify(responseData.numbers, null, 2)}</pre>
                                </div>
                            )}
                            {selectedOptions.includes('Highest alphabet') && responseData.highest_alphabet && (
                                <div>
                                    <h5>Highest Alphabet:</h5>
                                    <pre className="bg-light p-3">{JSON.stringify(responseData.highest_alphabet, null, 2)}</pre>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;


