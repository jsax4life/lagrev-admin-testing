/* This example requires Tailwind CSS v2.0+ */
import { Fragment, Key, useContext, useEffect, useCallback } from 'react'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import {useForm} from 'react-hook-form';
import _ from "lodash";
import { useState, useRef } from "react";
import Button from "../../base-components/Button";
import Alert from "../../base-components/Alert";
import Pagination from "../../base-components/Pagination";
import { FormCheck, FormInput, FormLabel, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";

import { Transition } from "@headlessui/react";
import Tippy from '../../base-components/Tippy';
import { UserContext } from '../../stores/UserContext';
import API from '../../utils/API';
import { Link, useNavigate } from 'react-router-dom';
import LoadingIcon from '../../base-components/LoadingIcon';
import FilterChips from '../../components/FilterChips';
// import FilterModal from './filterModal';
import profile from "../../assets/images/profile.png"
import { debounce } from '../../utils/debounce';


type FilterType = {
  lga: string;
  role: string;
  date?: string; // Make date optional
  status: string;
  startDate?: string;
  endDate?: string;
};

interface Question {
    id: number;
    question: string;
    type: string;
    options?: string[];
  } 



interface Survey {
    id: number;
    name: string;
    description: string;
    responsesCount: number; // Backend API should return the count of responses for each survey
}


export default function Main() {

    const { user } = useContext(UserContext);
    const [surveyName, setSurveyName] = useState('');
    const [description, setDescription] = useState('');
    const [surveyAdded, setSurveyAdded] = useState<boolean>();
    const[successfulMessage, setSuccessfulMessage] = useState('');
    const [addSurveyModal, setAddSurveyModal] = useState(false);
    const [addQuestionsModal, setAddQuestionsModal] = useState(false);

const [isSurvveyMessage, setIsSurveyMessage] = useState(false);
    const [userList, setUserList] = useState<any[]>([]);
    // const [questions, setQuestions] = useState<string[]>(['']);
    const [questions, setQuestions] = useState<any[]>([]);

    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const deleteButtonRef = useRef(null);
    const [dateRange, setDateRange] = useState<string>('');
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const [selectedLGA, setSelectedLGA] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState<"Role"| "LGA" | "Date" | "Status">(
      "LGA"
    );

// const [surveys, setSurveys] = useState([]);
const [surveyRetrieved, setSurveyRetrieved] = useState<any>();
const [selectedSurvey, setSelectedSurvey] = useState(String as any);
const [surveys, setSurveys] = useState<Survey[]>([]);
// const [newQuestion, setNewQuestion] = useState({ text: '', type: 'text', options: '' });
const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [currentType, setCurrentType] = useState<string>('text');
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);

  const { handleSubmit, control } = useForm();
  
    const [filterState, setFilterState] = useState<FilterType>({
      lga: selectedLGA,
      role: selectedRole,
      date: dateRange,
      status: selectedStatus,
      startDate: startDate,
      endDate: endDate,
    });

  const [isLoading, setIsLoading] = useState(false);
const [recentSearches, setRecentSearches] = useState<string[]>([]);

const sendButtonRef = useRef(null);


useEffect(() => {
  // Load recent searches from local storage when the component mounts
  const storedRecentSearches = localStorage.getItem('recentSearches');
  if (storedRecentSearches) {
    setRecentSearches(JSON.parse(storedRecentSearches));
  }
}, []);

// console.log(vehicleList)

const navigate = useNavigate();


  

useEffect(() => {
    API(
        "get",
        'survey/get-surveys',  
        {},
         function (result: any) {
            setSurveys(result);

            console.log(result)
            setIsLoading(false);
            surveyRetrieved(true);
            
          },
          function (error: any) {
            surveyRetrieved(false)
            console.error("Error fetching recent searches:", error);
            setIsLoading(false);
            console.log(error)
          },  user?.token && user.token
          )
      
}, []);

const handleViewResponses = (surveyId: string) => {
    // Logic for viewing responses
    alert(`Viewing responses for survey ID: ${surveyId}`);
    navigate(`/survey-responses/${surveyId}`)
};

const handleDownloadResponses = async (surveyId: number) => {
    API(
        "get",
        `survey/${surveyId}/responses/download`,  
        {},
         function (response: any) {
            console.log(response);
       

                        // Extract the filename from the response headers
                        const filename = `survey_responses_${surveyId}.csv`;

                        // Create a Blob from the CSV data
                        const blob = new Blob([response], { type: 'text/csv;charset=utf-8;' });
            
                        // Create a link element
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
            
                        // Set the download attribute with the filename
                        link.download = filename;
            
                        // Programmatically click the link to trigger the download
                        link.click();
            
                        // Clean up the object URL after download
                        URL.revokeObjectURL(link.href);

            
            
          },
          function (error: any) {
            console.error('Error downloading responses:', error);
            alert('Failed to download responses.');
          },  user?.token && user.token
          )
};

const handleSubmitNewSurvey = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessfulMessage('');
    setIsSurveyMessage(false);


    API(
      "post",
      `survey/add`,
  
      {name: surveyName, description},
      function (result: any) {
        console.log(result)
        setIsLoading(false);
        setSurveyAdded(true);
        setIsSurveyMessage(true);
        setSuccessfulMessage(result?.message);
        
      },
      function (error: any) {
        setSurveyAdded(false)
        console.error("Error fetching recent searches:", error);
        setIsLoading(false);
        setIsSurveyMessage(false);
        setSuccessfulMessage(error);
        console.log(error)
      },
      user?.token && user.token
    );
  };


//   const handleAddQuestion = () => {
//     const formattedQuestion = {
//         ...newQuestion,
//         options: newQuestion.type !== 'text' ? newQuestion.options.split(',').map((opt) => opt.trim()) : null,
//     };
//     setQuestions([...questions, formattedQuestion]);
//     setNewQuestion({ text: '', type: 'text', options: '' });
// };

    // const handleAddQuestion = () => {
    //     setQuestions([...questions, '']);
    // };

    const handleRemoveQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleInputChange = (index: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = value;
        setQuestions(updatedQuestions);
    };

    const handleSubmitAddQuestion = async () => {
if(!selectedSurvey) return alert('no survey selected')
console.log(selectedSurvey)
        API(
            "post",
            `survey/${selectedSurvey}/add-questions`,

        
            {questions},
            function (result: any) {
              console.log(result)
              setIsLoading(false);
              setSurveyAdded(true);
              setIsSurveyMessage(true);
              setSuccessfulMessage(result?.message);
              
            },
            function (error: any) {
              setSurveyAdded(false)
              console.error("Error fetching recent searches:", error);
              setIsLoading(false);
              setIsSurveyMessage(false);
              setSuccessfulMessage(error);
              console.log(error)
            },
            user?.token && user.token
          );
    };

    console.log(selectedSurvey);

    const handleRetrieveQuestions = async (e: React.FormEvent) => {
        e.preventDefault();

        API(
            "post",
            `survey/${selectedSurvey}/questions`,

        
            {},
            function (result: any) {
              console.log(result)
              setIsLoading(false);
              setSurveyAdded(true);
              setIsSurveyMessage(true);
              setSuccessfulMessage(result?.message);
              
            },
            function (error: any) {
              setSurveyAdded(false)
              console.error("Error fetching recent searches:", error);
              setIsLoading(false);
              setIsSurveyMessage(false);
              setSuccessfulMessage(error);
              console.log(error)
            },
            user?.token && user.token
          );
    };




const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

const addQuestion = () => {
    if (!currentQuestion.trim()) return alert('Question text is required.');

    const newQuestion: Question = {
      id: Date.now(),
      question: currentQuestion,
      type: currentType,
      options: currentType !== 'text' ? currentOptions : undefined,
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
    setCurrentType('text');
    setCurrentOptions([]);
  };

// console.log(surveys);

if (loading) {
    return <p>Loading surveys...</p>;
}
  
  return (
    <>
   
  {addSurveyModal &&  <Dialog
                      open={addSurveyModal}
                      onClose={() => {
                        setAddSurveyModal(false);
                      }}
                    //   initialFocus={sendButtonRef}
                    >
                      <Dialog.Panel>
                        <Dialog.Title>
                          <h2 className="mr-auto text-base font-medium">
                            Add New Survey
                          </h2>
                         
                        </Dialog.Title>
                       
                        <form onSubmit={handleSubmitNewSurvey}>

                        <Dialog.Description className="grid grid-cols-12 gap-x-2 gap-y-3">
                        {isSurvveyMessage && (
            <div className="col-span-12  intro-y">
              <Alert
                variant={`${surveyAdded? 'soft-success' : 'danger'}`}
                dismissible
                className=" items-center mb-6  dark:border-darkmode-600"
              >
                {/* {({ dismiss }) => (
                  <>
                    <span>
                      {successfulMessage}
                    
                    </span>
                    <Alert.DismissButton
                      className="text-white"
                      onClick={dismiss}
                    >
                      <Lucide icon="X" className="w-4 h-4" />
                    </Alert.DismissButton>
                  </>
                )} */}
                 <p >
                      {successfulMessage}
                    
                    </p>
              </Alert>
            </div>
          )}
                          <div className="col-span-12 sm:col-span-6">
                            <FormLabel htmlFor="name">Survey Name</FormLabel>

                            <FormInput
                              id="modal-form-1"
                              type="text"
                              placeholder="example@gmail.com"
                              value={surveyName}
                              onChange={(e) => setSurveyName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                           

<label htmlFor="description">Description</label>
                <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                          </div>
                          
                        </Dialog.Description>
                        <Dialog.Footer>
                          <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={() => {
                              setAddSurveyModal(false);
                            }}
                            className="w-20 mr-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            type="submit"
                            className="w-20"
                            ref={sendButtonRef}
                          >
                            Add
                          </Button>
                          
                        </Dialog.Footer>
                        </form>
                      </Dialog.Panel>
                    </Dialog>}

                    {addQuestionsModal &&  <Dialog
                      open={addQuestionsModal}
                      onClose={() => {
                        setAddSurveyModal(false);
                      }}
                      size='lg'
                    //   initialFocus={sendButtonRef}
                    >
                      <Dialog.Panel>
                      <form onSubmit={handleSubmit(handleSubmitAddQuestion)}>
                        <Dialog.Title>
                          <h2 className="mr-auto text-base font-medium">
                            Add Questions to Survey
                          </h2>
                         
                          <div>
                                <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={() => {
                              setAddQuestionsModal(false);
                            }}
                            className="w-20 mr-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            type="submit"
                            className="w-20"
                            ref={sendButtonRef}
                          >
                            Submit
                          </Button>
                            </div>
                        </Dialog.Title>
                       

                          

                        <Dialog.Description className="grid grid-cols-12 gap-x-2 gap-y-3 overflow-y-auto scroll">

                        {isSurvveyMessage && (
            <div className="col-span-12  intro-y">
              <Alert
                variant={`${surveyAdded? 'soft-success' : 'danger'}`}
                dismissible
                className=" items-center mb-6  dark:border-darkmode-600"
              >
             
                 <p >
                      {successfulMessage}
                    
                    </p>
              </Alert>
            </div>
          )}
                          {/* <div className="col-span-12 sm:col-span-6">
                            <FormLabel htmlFor="name">Survey Name</FormLabel>

                            <FormInput
                              id="modal-form-1"
                              type="text"
                              placeholder="example@gmail.com"
                              value={surveyName}
                              onChange={(e) => setSurveyName(e.target.value)}
                              required
                            />
                          </div> */}
                          <div className=" flex justify-between gap-x-8 col-span-12 sm:col-span-6 w-full">
                           <div>
                           <FormLabel htmlFor="surveys">Choose Survey</FormLabel>
                            <FormSelect id="surveys"
                              onChange={(e) =>
                                setSelectedSurvey( e.target.value)
                              }
                              className='w-full'
                             value = {selectedSurvey}
                            >
                             <option disabled value="">--Select Survey--</option> 


                              {surveys?.map((survey: any, index:any) => (
               

<option key={index} value={survey?.id}>{survey?.name}</option> 
                              ))}



                            </FormSelect>
                           </div>
<div className='flex'>


</div>
                          </div>

                          <div className="col-span-12">



                          <div>
                          <FormLabel htmlFor="name">Question Text </FormLabel>
             
                <FormInput
type="text"
                // className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id={`question`}
                    placeholder="Enter your question"

                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    // required
                ></FormInput>


            </div>
            <div className="mt-4">
                <label>Type</label>
                <select
               
                    value={currentType}
                    onChange={(e) => setCurrentType(e.target.value)}
                    className="block w-full mt-2 p-2 border rounded"
                >
                    <option value="text">Text</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                </select>
            </div>
           

            {/* Options Input */}
        {currentType !== 'text' && (
          <div>
            <input
              type="text"
              placeholder="Enter an option"
              value={currentOptions.join(', ')}
              onChange={(e) =>
                setCurrentOptions(e.target.value.split(',').map((opt) => opt.trim()))
              }
              className="block w-full mt-2 p-2 border rounded"

            />
            <small>Separate options with commas.</small>
          </div>
        )}


<div className='mt-4'>
<Button
                            variant="primary"
                            type="button"
                            className="w-full"
                            ref={sendButtonRef}
                            onClick = {addQuestion}
                          >
                            Add Another Question
                          </Button>
</div>

            {/* Questions Preview */}
        <div className='overflow-y-visible	'>
        {questions.length > 0 ? (
            <>
        <h3 className="mt-6">Questions Preview</h3>
         
            <ul>
              {questions.map((q, index) => (
                <li key={q.id} className='flex justify-between'>
                  <div>
                    <strong>
                      {index + 1}. {q.question}
                    </strong>{' '}
                    ({q.type})
                    {q.type !== 'text' && q.options && (
                      <div>
                        Options: {q.options.join(', ')}
                      </div>
                    )}
                  </div>
                  <button
                   className='text-end text-red-500'

                    type="button"
                    onClick={() => removeQuestion(q.id)}
                    
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            </>
          ) : (
            <p>No questions added yet.</p>
          )}
        </div>



</div>
                          
                        </Dialog.Description>
                        <Dialog.Footer>
                          
                        </Dialog.Footer>
                        </form>
                      </Dialog.Panel>
                    </Dialog>}

  
    <div className="max-w-7xl mx-auto pb-12 lg:pb-0  lg:px-0 lg:mx-0 ">
      <div className="bg-white   px-5 py-6 sm:px-6">

        {/* Content Section */}
        <div className="md:flex justify-start items-center">
          <div className='mr-auto'>
            <h2 className="text-lg font-medium text-black intro-y ">Surve and Feedbacks</h2>
            {/* <p className="mt-4 text-xs text-black intro-y">View, Edit and Delete admins</p> */}
          </div>
          <Button onClick={() => {setAddSurveyModal(true)}}  className="mr-2 flex font-medium shadow-sm bg-customColor rounded-lg px-4 py-2 text-white">
            <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add New Surevy
          </Button>
          <Button onClick={() => {setAddQuestionsModal(true)}}   className="mr-2 flex font-medium shadow-sm bg-secondary rounded-lg px-4 py-2 text-customColor">
            <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add Questions to Survey
          </Button>
         
          {/* <Button variant="secondary" className="mr-2 shadow-sm">
            <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export As E
          </Button> */}
        </div>

        <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y text-black mb-8 bg-white p-2 lg:px-0">
          <div className="flex flex-col lg:flex-row w-full gap-y-2 text-primary items-center space-x-3">

          </div>
        </div>

          {/* Data List or Loading Indicator */}
          {loading ? (
            <div className="col-span-12 flex items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center w-full">
                <LoadingIcon icon="bars" className="w-8 h-8" />
                <div className="mt-2 text-xs text-center">Loading data</div>
              </div>
            </div>
          ) : (
            <div className="col-span-12 overflow-auto intro-y 2xl:overflow-visible">
              {/* Your table or data list */}
              {/* Render your vehicleList here */}


              {surveys.length === 0 ? (
                <p>No surveys available.</p>
            ) :

            
             ( <Table className="border-spacing-y-[2px] border-separate -mt-2">
            <Table.Thead className='bg-customColor/5 lg:h-11'>
              <Table.Tr>
                
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  S/N
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  SURVEY NAME
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  FEEDBACK/RESPONSES
                </Table.Th>
            
              
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  ACTION
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  DOWNLOAD
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  DELETE
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody
            // className='overflow-y-scroll h-10'
            >
          
          {
              surveys.map((survey: any, index: any | null | undefined) => (
                <Table.Tr key={survey.id} className="intro-x text-slate-600">
                 
                 <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-1 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    
                    <div className="flex items-center justify-center">
                    
                      {index + 1}
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-1 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                  <div className="flex items-center justify-center">
                      
                      <div className="ml-4">
                        <a href="" className="font-medium whitespace-nowrap">
                        {survey.name}
                        </a>
                        {/* <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                          {vehicle?.rider?.phone}
                        </div> */}
                      </div>
                    </div>
                  </Table.Td>


                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-1 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                  <div className="flex items-center justify-center">

                   {survey.responses_count}

</div>
                  
                  </Table.Td>
                  
           
                 

                  

                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-1 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                      <button
                        className="flex items-center  text-customColor whitespace-nowrap"
                        onClick={() => handleViewResponses(survey.id)}
                      >
                        {/* <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />{" "} */}
                        View Responses
                      </button>
                   
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-1 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                      <button
                        className="flex items-center  text-customColor whitespace-nowrap"
                        onClick={() => handleDownloadResponses(survey.id)}
                      >
                        <Lucide icon="Download" className="w-6 h-6 mr-1" />{" "}
                      </button>
                   
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-1 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                      <button
                        className="flex items-center  text-red-500 whitespace-nowrap"
                        onClick={() => {}}

                      >
                        <Lucide icon="X" className="w-6 h-6 mr-1" />{" "}
                      </button>
                   
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
          

            </Table.Tbody>
          </Table>)}

             

            </div>
          )}

          {/* Pagination */}
         

          {/* Delete Confirmation Modal */}
          <Dialog
            open={deleteConfirmationModal}
            onClose={() => setDeleteConfirmationModal(false)}
            initialFocus={deleteButtonRef}
          >
            {/* Dialog content */}
          </Dialog>
        </div>
      </div>
    </div>



    </>
  )
}
