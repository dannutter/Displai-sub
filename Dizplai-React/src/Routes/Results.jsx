import { useState, useEffect } from 'react';
import Header from '../Components/Header.jsx';
import { useParams } from 'react-router-dom';

const ResultView = () => {
    const { id } = useParams(); //id from url
    const [poll, setPoll] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Flag for loading 
    const [error, setError] = useState(null); // Display errors

    useEffect(() => {
        fetch(`http://localhost:1852/api/votes/${id}`, {})
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status code ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!(data.options.length >= 2 && data.options.length <= 5)) {
                    throw new Error(`Request failed, Invalid number of poll options`);
                }
                const totalTally = data.options.reduce((total, option) => total + option.tally, 0);
                if (totalTally == 0) {
                    throw new Error(`No votes for this poll yet`);
                }
                const pollPercentage = data.options.map((option) => ({
                    ...option,
                    percentage: (option.tally / totalTally) * 100,
                })).sort((x, y) => y.percentage - x.percentage);
                setPoll(pollPercentage);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
            });

    }, [id]);

    return (
        <div>
            <Header />
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {poll && (
                <><h1>
                    Thank you for your response
                </h1>
                    <div>
                        {poll.map((option) => (
                            <div className="resultbox" key={option.optionId} >
                            <div
                                style={{
                                    backgroundColor: 'purple',
                                    width: `${option.percentage}%`,
                                }}
                                >
                                     <br></br>
                                </div>
                                <div className="overlaytext">
                                    <p>{option.optionText} ({option.percentage.toFixed(0)}%)</p>
                                </div>
                                
                                
                            </div>
                        ))}
                    </div></>
            )}
        </div>
    );

};

export default ResultView;
