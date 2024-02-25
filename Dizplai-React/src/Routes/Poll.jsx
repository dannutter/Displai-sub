import { useState, useEffect } from 'react';
import Header from '../Components/Header.jsx';
import SelectButton from '../Components/SelectButton.jsx';
import { useParams } from 'react-router-dom';

const PollView = () => {
    const { id } = useParams(); //id from url
    const [selectedButton, setSelectedButton] = useState(null);
    const [poll, setPoll] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Flag for loading 
    const [error, setError] = useState(null); // Display errors

    useEffect(() => {
        fetch(`http://localhost:1852/api/polls/${id}`, {})
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
                setPoll(data);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
            });
    }, [id]);


    // Selection
    const handleClick = (text) => {
        setSelectedButton(text);
    }

    // Submission
    const handleSubmit = async () => {
        if (selectedButton == null) {
            return;
        }
        const response = await fetch(`http://localhost:1852/api/votes/${id}`, {
            method: 'POST',
            body: JSON.stringify({ optionId: selectedButton+1 }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            console.error('Voting failed', response.status);
        }
        const data = await response.json();
        console.log('Vote recorded', data);
        window.location.href = `http://localhost:5173/result/${id}`;

    };

   return (
    <div>
        <Header />
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
           {poll && (
            <><h1>
                   {poll.question}
               </h1>
                   <div>
                       {poll.options.map((option, index) => (
                           <div key={index}>
                               <SelectButton
                                   text={option.optionText}
                                   onClick={() => handleClick(index)}
                                   isSelected={selectedButton === index} />
                           </div>
                       ))}
                       <button onClick={handleSubmit}>Submit</button>
                       {selectedButton==null && <p>SELECT AN OPTION</p>}
                   </div></>
        )}
    </div>
);

};

export default PollView;
