import { useState, useEffect } from 'react';
import Header from '../Components/Header.jsx';

const PollView = () => {
    const [polls, setPolls] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Flag for loading 
    const [error, setError] = useState(null); // Display errors

    useEffect(() => {
        fetch(`http://localhost:1852/api/polls/`, {})
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status code ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setPolls(data);
                console.log(polls);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
            });
    }, [polls]);


    return (
        <div>
            <Header></Header>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
                {polls &&
                polls.map(poll => (
                    <div key={poll.pollId}>
                        <button
                            onClick={() => (window.location.href = `http://localhost:5173/poll/${poll.pollId}`)}
                        >{poll.pollName}
                        </button>
                    </div>
                    ))
                }
        </div>
);

};

export default PollView;
