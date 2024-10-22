import React, { useState, useEffect, useMemo } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdSearch } from 'react-icons/io';
import { FaFilter } from 'react-icons/fa';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

const InterviewQA = ({ toggleInterviewQuestions }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [techOptions] = useState(['Python', 'Java', 'SQL', 'HTML']);
    const [selectedDifficultyOptions, setSelectedDifficultyOptions] = useState([]);
    const [selectedTechOptions, setSelectedTechOptions] = useState([]);
    const [isDifficultyDropdownOpen, setIsDifficultyDropdownOpen] = useState(false);
    const [isTechDropdownOpen, setTechDropdownOpen] = useState(false);

    const allQuestions = useMemo(() => [
        {
            question: "What is Java?",
            answer: "Java is the high-level, object-oriented, robust, secure programming language, platform-independent, high performance, Multithreaded, and portable programming language. It was developed by James Gosling in June 1991. It can also be known as the platform as it provides its own JRE and API.",
            tech: 'Java'
        },
        {
            question: "What gives Java its 'write once and run anywhere' nature?",
            answer: "The bytecode. Java compiler converts the Java programs into the class file (Byte Code) which is the intermediate language between source code and machine code. This bytecode is not platform specific and can be executed on any computer.",
            tech: 'Java'
        },
        {
            question: "What is the default value of byte datatype in Java?",
            answer: "The default value of the byte datatype in Java is 0.",
            tech: 'Java'
        },
        {
            question: "What is the default value of float and double datatype in Java?",
            answer: "The default value of the float is 0.0f and of double is 0.0d in Java.",
            tech: 'Java'
        },
        {
            question: "Difference between JVM, JRE, and JDK.",
            answer: "JVM: JVM also known as Java Virtual Machine is a part of JRE. JVM is a type of interpreter responsible for converting bytecode into machine-readable code. JVM itself is platform dependent but it interprets the bytecode which is the platform-independent reason why Java is platform-independent. JRE: JRE stands for Java Runtime Environment, it is an installation package that provides an environment to run the Java program or application on any machine. JDK: JDK stands for Java Development Kit which provides the environment to develop and execute Java programs. JDK is a package that includes two things Development Tools to provide an environment to develop your Java programs and, JRE to execute Java programs or applications.",
            tech: 'Java'
        },
        {
            question: "What is Python?",
            answer: "Python is a high-level, interpreted programming language.",
            tech: 'Python'
        },
        {
            question: "What is the print function in Python?",
            answer: "The print function is used to output text or values to the screen.",
            tech: 'Python'
        },
        {
            question: "What is a list in Python?",
            answer: "A list is a collection of items that can be of any data type, including strings, integers, and other lists.",
            tech: 'Python'
        },
        {
            question: "What is a dictionary in Python?",
            answer: "A dictionary is a collection of key-value pairs that can be used to store and retrieve data.",
            tech: 'Python'
        },
        {
            question: "What is SQL?",
            answer: "SQL (Structured Query Language) is a programming language designed for managing and manipulating data in relational database management systems.",
            tech: 'SQL'
        },
        {
            question: "What is a database?",
            answer: "A database is a collection of organized data that is stored in a way that allows for efficient retrieval and manipulation.",
            tech: 'SQL'
        },
        {
            question: "What is a table in SQL?",
            answer: "A table is a collection of related data that is organized into rows and columns.",
            tech: 'SQL'
        },
        {
            question: "What is a query in SQL?",
            answer: "A query is a request for specific data or action from a database.",
            tech: 'SQL'
        },
        {
            question: "What is HTML?",
            answer: "HTML (Hypertext Markup Language) is a standard markup language used to create web pages.",
            tech: 'HTML'
        },
        {
            question: "What is a tag in HTML?",
            answer: "A tag is a keyword or phrase surrounded by angle brackets that is used to define an element in HTML.",
            tech: 'HTML'
        },
        {
            question: "What is the purpose of the <head> tag in HTML?",
            answer: "The <head> tag is used to contain metadata about the document, such as the title, charset, and links to external stylesheets or scripts.",
            tech: 'HTML'
        },
        {
            question: "What is the purpose of the <body> tag in HTML?",
            answer: "The <body> tag is used to contain the content of the HTML document.",
            tech: 'HTML'
        }
    ], []);

    const [filteredQuestions, setFilteredQuestions] = useState(allQuestions);
    const difficultyOptions = ['Easy', 'Medium', 'Hard'];

    useEffect(() => {
        if (selectedTechOptions.length > 0) {
            const filtered = allQuestions.filter(question =>
                selectedTechOptions.includes(question.tech)
            );
            setFilteredQuestions(filtered);
        } else {
            setFilteredQuestions(allQuestions);
        }
    }, [selectedTechOptions, allQuestions]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div
            className="absolute bottom-0 right-0 h-full bg-white border-t border-l border-gray-200 shadow-lg flex flex-col overflow-y-scroll"
            style={{ width: '40%' }}
        >
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Interview Questions</h2>
                <button onClick={toggleInterviewQuestions}>
                    <AiOutlineClose className="w-5 h-5" />
                </button>
            </div>
            <div className="relative mb-2 mt-4 ml-3 mr-3 flex justify-between">
                <div className="searchintabs">
                    <button type="submit" className="p-2">
                        <IoMdSearch />
                    </button>
                    <input
                        id="searchInput"
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="pl-10 pr-12"
                    />
                </div>
                <div className="text-xl border-2 border-gray-200 rounded-md p-1">
                    <button type="button" className="p-2" onClick={toggleMenu}>
                        <span>
                            <FaFilter className={`${isMenuOpen ? 'text-blue-500' : ''}`} />
                        </span>
                    </button>
                </div>
            </div>

            <div>
                {selectedTechOptions.length > 0 && (
                    <div className="px-4">
                        <p className='text-lg font-bold text-slate-600'>
                            Questions for {selectedTechOptions.join(', ')}.
                        </p>
                        <ul>
                            {filteredQuestions.map((question, index) => (
                                <li key={index}>
                                    <p className='text-lg text-slate-900 font-medium'>{question.question}</p>
                                    <p className='text-slate-900 font-normal'>{question.answer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {selectedTechOptions.length === 0 && (
                    <div className="px-4">
                        <p className='text-lg font-bold text-slate-600'>All Questions</p>
                        <ul>
                            {filteredQuestions.map((question, index) => (
                                <li key={index}>
                                    <p className='text-lg text-slate-900 font-medium'>{question.question}</p>
                                    <p className='text-slate-900 font-normal'>{question.answer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {isMenuOpen && (
                <div
                    className={`absolute ${isMenuOpen ? 'block' : 'hidden'} bg-white border shadow-lg text-sm z-30 top-36 right-4 w-60 max-h-[calc(100vh-40px)] overflow-y-auto p-3 rounded`}
                >
                    <div className="p-2">
                        <div className="flex justify-between mt-2">
                            <div className="cursor-pointer">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 mb-3"
                                        checked={techOptions.every(option => selectedTechOptions.includes(option))}
                                        onChange={() => {
                                            if (techOptions.every(option => selectedTechOptions.includes(option))) {
                                                setSelectedTechOptions([]);
                                            } else {
                                                setSelectedTechOptions(techOptions);
                                            }
                                        }}
                                    />
                                    <span className="ml-3 mb-3 font-bold">Skill/Technology</span>
                                </label>
                            </div>
                            <div className="cursor-pointer mr-3 text-2xl" onClick={() => setTechDropdownOpen(!isTechDropdownOpen)}>
                                {isTechDropdownOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                            </div>
                        </div>

                        {isTechDropdownOpen && (
                            <div className="bg-white py-2 mt-1">
                                {techOptions.map((option, index) => (
                                    <label key={index} className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5"
                                            checked={selectedTechOptions.includes(option)}
                                            onChange={() => {
                                                const updatedTechOptions = selectedTechOptions.includes(option)
                                                    ? selectedTechOptions.filter(item => item !== option)
                                                    : [...selectedTechOptions, option];
                                                setSelectedTechOptions(updatedTechOptions);
                                            }}
                                        />
                                        <span className="ml-2 w-56">{option}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-between">
                            <div className="cursor-pointer">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5"
                                        checked={selectedDifficultyOptions.length > 0}
                                        onChange={() => {
                                            const updatedDifficultyOptions = selectedDifficultyOptions.length > 0 ? [] : difficultyOptions;
                                            setSelectedDifficultyOptions(updatedDifficultyOptions);
                                        }}
                                    />
                                    <span className="ml-3 font-bold">Difficulty</span>
                                </label>
                            </div>
                            <div className="cursor-pointer mr-3 text-2xl" onClick={() => setIsDifficultyDropdownOpen(!isDifficultyDropdownOpen)}>
                                {isDifficultyDropdownOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                            </div>
                        </div>

                        {isDifficultyDropdownOpen && (
                            <div className="bg-white py-2 mt-1">
                                {difficultyOptions.map((option, index) => (
                                    <label key={index} className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5"
                                            checked={selectedDifficultyOptions.includes(option)}
                                            onChange={() => {
                                                const updatedDifficultyOptions = selectedDifficultyOptions.includes(option)
                                                    ? selectedDifficultyOptions.filter(item => item !== option)
                                                    : [...selectedDifficultyOptions, option];
                                                setSelectedDifficultyOptions(updatedDifficultyOptions);
                                            }}
                                        />
                                        <span className="ml-2 w-56">{option}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterviewQA;
