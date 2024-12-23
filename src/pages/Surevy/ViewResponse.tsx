import React, { useState, useEffect, useContext } from 'react';
import {  useParams } from "react-router-dom";
import { UserContext } from '../../stores/UserContext';
import API from '../../utils/API';
import Button from '../../base-components/Button';

interface Question {
    id: number;
    question: string;
}

interface Response {
    id: number;
    response: string;
    question: Question;
}



const DisplayResponses = () => {
    const { user } = useContext(UserContext);

    const [responses, setResponses] = useState<{ [questionId: number]: Response[] }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const { surveyId } = useParams<{ surveyId: string }>();


    useEffect(() => {
        setLoading(true);

        API(
            "get",
            `survey/${surveyId}/responses`,  
            {},
             function (data: any) {
                setResponses(data);
    
                console.log(data)
                setLoading(false);
                
              },
              function (error: any) {
                console.error("Error fetching recent searches:", error);
                setLoading(false);
              },  user?.token && user.token
              )
          
    }, []);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const response = await fetch(`/api/admin/surveys/${surveyId}/responses`);
                const data = await response.json();
                setResponses(data);
            } catch (error) {
                console.error('Error fetching responses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResponses();
    }, [surveyId]);

    const handleDownload = () => {
        const csvData = [];
        csvData.push(['Question', 'Response']);

        Object.values(responses).forEach((responseList) => {
            responseList.forEach((response) => {
                csvData.push([response.question.question, response.response]);
            });
        });

        const csvContent = csvData.map((row) => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'survey_responses.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return <p>Loading responses...</p>;
    }

    return (
        <div>
            <h2>Survey Responses</h2>
            {Object.keys(responses).length === 0 ? (
                <p>No responses available.</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Responses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(responses).map(([questionId, responseList]) => (
                                <tr key={questionId}>
                                    <td>{responseList[0]?.question.question}</td>
                                    <td>
                                        <ul>
                                            {responseList.map((response) => (
                                                <li key={response.id}>{response.response}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Button onClick={handleDownload} className='mt-8' variant='primary'>Download Responses</Button>
                </>
            )}
        </div>
    );
};

export default DisplayResponses;
