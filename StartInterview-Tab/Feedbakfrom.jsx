import React, { useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosStar } from "react-icons/io";

const Feedbakfrom = ({toggleFeedback}) => {
    const [apexRating, setApexRating] = useState(0);
    const [lightningRating, setLightningRating] = useState(0);
    const [soqlRating, setSoqlRating] = useState(0);
    const [apiRating, setApiRating] = useState(0);
    const [jsRating, setJsRating] = useState(0);
    const [mobileRating, setMobileRating] = useState(0);
    const [htmlRating, setHtmlRating] = useState(0);
    const [cpqRating, setCpqRating] = useState(0);
    const [codingRating, setCodingRating] = useState(0);
    const [problemSolvingRating, setProblemSolvingRating] = useState(0);
    const [communicationRating, setCommunicationRating] = useState(0);
    const [teamworkRating, setTeamworkRating] = useState(0);
    const [overallRating, setOverallRating] = useState(0);
    const [comments, setComments] = useState("");
    const [optionalComments, setOptionalComments] = useState("");
    const [technicalComments, setTechnicalComments] = useState("");
    const [softSkillsComments, setSoftSkillsComments] = useState("");
    const [additionalComments, setAdditionalComments] = useState("");

    const renderStars = (rating, setRating) =>
        [...Array(5)].map((_, index) => (
            <IoIosStar
                key={index}
                onClick={() => setRating(index + 1)}
                color={index < rating ? "#FFD700" : "#C4C4C4"}
                style={{ cursor: "pointer" }}
            />
        ));

    const handleCommentsChange = (e, setCommentState, maxLength) => {
        if (e.target.value.length <= maxLength) {
            setCommentState(e.target.value);
        }
    };

    return (
        <div className="absolute bottom-0 right-0 h-full bg-white border-t border-l border-gray-200 shadow-lg flex flex-col overflow-y-scroll"
            style={{ width: "40%" }}>
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold"> Interview Feedback</h2>
                <button onClick={toggleFeedback}>
                    <AiOutlineClose className="w-5 h-5" />
                </button>
            </div>
            <div className="mx-5 mt-5 grid grid-cols-2 scrollbar-hide">
                <div className="col-span-2">
                    <div className="text-xl mb-3">Candidate Information:</div>
                    {/* candidate name */}
                    <div className="flex gap-5 mb-3">
                        <div>
                            <label
                                htmlFor="firstname"
                                className="block text-sm font-medium leading-6 text-gray-400 w-40"
                            >
                                Candidate Name
                            </label>
                        </div>
                        <div className="flex-grow text-sm">
                            <p className="">Jyothi</p>
                        </div>
                    </div>
                    {/* interviewers */}
                    <div className="flex gap-5 mb-3">
                        <div>
                            <label
                                htmlFor="firstname"
                                className="block text-sm font-medium leading-6 text-gray-400 w-40"
                            >
                                Interviewers
                            </label>
                        </div>
                        <div className="flex-grow text-sm">
                            <p className="">Raju, Ravi, Uma</p>
                        </div>
                    </div>
                    {/* interview type */}
                    <div className="flex gap-5 mb-3">
                        <div>
                            <label
                                htmlFor="firstname"
                                className="block text-sm font-medium leading-6 text-gray-400 w-40"
                            >
                                Interview Type
                            </label>
                        </div>
                        <div className="flex-grow text-sm">
                            <p className="">Virtual</p>
                        </div>
                    </div>
                    <div className="flex gap-5 mb-3">
                        <div>
                            <label
                                htmlFor="firstname"
                                className="block text-sm font-medium leading-6 text-gray-400 w-40"
                            >
                                Position
                            </label>
                        </div>
                        <div className="flex-grow text-sm">
                            <p className="">Salesforce Developer</p>
                        </div>
                    </div>
                    <div className="flex gap-5 mb-3">
                        <div>
                            <label
                                htmlFor="firstname"
                                className="block text-sm font-medium leading-6 text-gray-400 w-40"
                            >
                                Interview date
                            </label>
                        </div>
                        <div className="flex-grow text-sm">
                            <p className="">13/06/2024</p>
                        </div>
                    </div>
                    {/* feedback sections */}
                    <div className="text-xl mb-3">Feedback Sections:</div>
                    <div className="text-base mb-3 font-medium">
                        Mandatory Skills:
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="col-span-2">
                            <div className="flex gap-5 mb-3">
                                <div>
                                    <label
                                        htmlFor="firstname"
                                        className="block text-sm font-medium leading-6 w-40"
                                    >
                                        Apex Programming
                                    </label>
                                </div>
                                <div className="flex-grow text-2xl text-gray-400">
                                    <p className="flex gap-2">
                                        {renderStars(apexRating, setApexRating)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5 mb-3">
                                <div>
                                    <label
                                        htmlFor="firstname"
                                        className="block text-sm font-medium leading-6 w-40"
                                    >
                                        Lightning Components
                                    </label>
                                </div>
                                <div className="flex-grow text-2xl text-gray-400">
                                    <p className="flex gap-2">
                                        {renderStars(lightningRating, setLightningRating)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5 mb-3">
                                <div>
                                    <label
                                        htmlFor="firstname"
                                        className="block text-sm font-medium leading-6 w-40"
                                    >
                                        SOQL/SOSL
                                    </label>
                                </div>
                                <div className="flex-grow text-2xl text-gray-400">
                                    <p className="flex gap-2">
                                        {renderStars(soqlRating, setSoqlRating)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5 mb-3">
                                <div>
                                    <label
                                        htmlFor="firstname"
                                        className="block text-sm font-medium leading-6 w-40"
                                    >
                                        API Integration
                                    </label>
                                </div>
                                <div className="flex-grow text-2xl text-gray-400">
                                    <p className="flex gap-2">
                                        {renderStars(apiRating, setApiRating)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 mb-3">
                        <div>
                            <label
                                htmlFor="comments"
                                className="block text-sm font-medium leading-6 w-40"
                            >
                                Comments
                            </label>
                        </div>
                        <div className="flex-grow">
                            <input
                                type="text"
                                autoComplete="given-name"
                                className="border-b border-gray-300 focus:border-black focus:outline-none mb-5 w-full"
                                id="comments"
                                value={comments}
                                onChange={(e) => handleCommentsChange(e, setComments, 500)}
                            />
                            <p className="text-sm text-gray-500">{comments.length}/500</p>
                        </div>
                    </div>
                    <div className="text-base mb-3 font-medium">Optional Skills:</div>
                    <div className="grid grid-cols-2">
                        <div className="col-span-2">
                            <div className="flex gap-5 mb-3">
                                <div>
                                    <label
                                        htmlFor="optionalComments"
                                        className="block text-sm font-medium leading-6 w-40"
                                    >
                                        JavaScript
                                    </label>
                                </div>
                                <div className="flex-grow text-2xl text-gray-400">
                                    <p className="flex gap-2">
                                        {renderStars(jsRating, setJsRating)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5 mb-3">
                                <div>
                                    <label
                                        htmlFor="optionalComments"
                                        className="block text-sm font-medium leading-6 w-40"
                                    >
                                        Mobile Development
                                    </label>
                                </div>
                                <div className="flex-grow text-2xl text-gray-400">
                                    <p className="flex gap-2">
                                        {renderStars(mobileRating, setMobileRating)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5 mb-3">
                                <div>
                                    <label
                                        htmlFor="optionalComments"
                                        className="block text-sm font-medium leading-6 w-40"
                                    >
                                        HTML
                                    </label>
                                </div>
                                <div className="flex-grow text-2xl text-gray-400">
                                    <p className="flex gap-2">
                                        {renderStars(htmlRating, setHtmlRating)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-5 mb-3">
                                <div>
                                    <label
                                        htmlFor="optionalComments"
                                        className="block text-sm font-medium leading-6 w-40"
                                    >
                                        Salesforce CPQ
                                    </label>
                                </div>
                                <div className="flex-grow text-2xl text-gray-400">
                                    <p className="flex gap-2">
                                        {renderStars(cpqRating, setCpqRating)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 mb-3">
                        <div>
                            <label
                                htmlFor="optionalComments"
                                className="block text-sm font-medium leading-6 w-40"
                            >
                                Comments
                            </label>
                        </div>
                        <div className="flex-grow">
                            <input
                                type="text"
                                autoComplete="given-name"
                                className="border-b border-gray-300 focus:border-black focus:outline-none mb-5 w-full"
                                id="optionalComments"
                                value={optionalComments}
                                onChange={(e) => handleCommentsChange(e, setOptionalComments, 500)}
                            />
                            <p className="text-sm text-gray-500">{optionalComments.length}/500</p>

                        </div>
                    </div>
                    <div className="text-base mb-3 font-medium">
                        Technical Skills:
                    </div>
                    <div className="grid grid-cols-2 ">
                        <div className="col-span-2">
                            <div className="flex gap-10">
                                <div className="flex gap-5 mb-3">
                                    <div>
                                        <label
                                            htmlFor="technicalComments"
                                            className="block text-sm font-medium leading-6 w-40"
                                        >
                                            Coding
                                        </label>
                                    </div>
                                    <div className="flex-grow text-2xl text-gray-400">
                                        <p className="flex gap-2">
                                            {renderStars(codingRating, setCodingRating)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-10">
                                <div className="flex gap-5 mb-3">
                                    <div>
                                        <label
                                            htmlFor="technicalComments"
                                            className="block text-sm font-medium leading-6 w-40"
                                        >
                                            Problem-Solving
                                        </label>
                                    </div>
                                    <div className="flex-grow text-2xl text-gray-400">
                                        <p className="flex gap-2">
                                            {renderStars(
                                                problemSolvingRating,
                                                setProblemSolvingRating
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 mb-3">
                        <div>
                            <label
                                htmlFor="technicalComments"
                                className="block text-sm font-medium leading-6 w-40"
                            >
                                Comments
                            </label>
                        </div>
                        <div className="flex-grow">
                            <input
                                type="text"
                                autoComplete="given-name"
                                className="border-b border-gray-300 focus:border-black focus:outline-none mb-5 w-full"
                                id="technicalComments"
                                value={technicalComments}
                                onChange={(e) => handleCommentsChange(e, setTechnicalComments, 500)}
                            />
                            <p className="text-sm text-gray-500">{technicalComments.length}/500</p>

                        </div>
                    </div>
                    <div className="text-base mb-3 font-medium">Soft Skills:</div>
                    <div className="grid grid-cols-2">
                        <div className="col-span-2">
                            <div className="flex gap-10">
                                <div className="flex gap-5 mb-3">
                                    <div>
                                        <label
                                            htmlFor="softSkillsComments"
                                            className="block text-sm font-medium leading-6 w-40"
                                        >
                                            Communication
                                        </label>
                                    </div>
                                    <div className="flex-grow text-2xl text-gray-400">
                                        <p className="flex gap-2">
                                            {renderStars(
                                                communicationRating,
                                                setCommunicationRating
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-10">
                                <div className="flex gap-5 mb-3">
                                    <div>
                                        <label
                                            htmlFor="softSkillsComments"
                                            className="block text-sm font-medium leading-6 w-40"
                                        >
                                            Teamwork
                                        </label>
                                    </div>
                                    <div className="flex-grow text-2xl text-gray-400">
                                        <p className="flex gap-2">
                                            {renderStars(teamworkRating, setTeamworkRating)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 mb-3">
                        <div>
                            <label
                                htmlFor="softSkillsComments"
                                className="block text-sm font-medium leading-6 w-40"
                            >
                                Comments
                            </label>
                        </div>
                        <div className="flex-grow">
                            <input
                                type="text"
                                autoComplete="given-name"
                                className="border-b border-gray-300 focus:border-black focus:outline-none mb-5 w-full"
                                id="softSkillsComments"
                                value={softSkillsComments}
                                onChange={(e) => handleCommentsChange(e, setSoftSkillsComments, 500)}
                            />
                            <p className="text-sm text-gray-500">{softSkillsComments.length}/500</p>

                        </div>
                    </div>
                    <div className="text-base mb-3 font-medium">
                        Overall Impression:
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="col-span-2">
                            <div className="flex gap-10">
                                <div className="flex gap-5 mb-3">
                                    <div>
                                        <label
                                            htmlFor="overallComments"
                                            className="block text-sm font-medium leading-6 w-40"
                                        >
                                            Overall Rating
                                        </label>
                                    </div>
                                    <div className="flex-grow text-2xl text-gray-400">
                                        <p className="flex gap-2">
                                            {renderStars(overallRating, setOverallRating)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-10">
                                <div className="flex gap-5 mb-3">
                                    <div>
                                        <label
                                            htmlFor="overallComments"
                                            className="block text-sm font-medium leading-6 w-40"
                                        >
                                            Recommendation
                                        </label>
                                    </div>
                                    <div className="flex-grow text-lg text-gray-400">
                                        <div className="flex gap-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="recommendation"
                                                    value="hire"
                                                    className="mr-2 text-black"
                                                />
                                                <span className="text-black">Hire</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="recommendation"
                                                    value="no-hire"
                                                    className="mr-2 text-black"
                                                />
                                                <span className="text-black">No-Hire</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="recommendation"
                                                    value="maybe"
                                                    className="mr-2 text-black"
                                                />
                                                <span className="text-black">Maybe</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-5 mb-3">
                        <div>
                            <label
                                htmlFor="additionalComments"
                                className="block text-sm font-medium leading-6 w-40"
                            >
                                Additional Comments
                            </label>
                        </div>
                        <div className="flex-grow">
                            <input
                                type="text"
                                autoComplete="given-name"
                                className="border-b border-gray-300 focus:border-black focus:outline-none mb-5 w-full"
                                id="additionalComments"
                                value={additionalComments}
                                onChange={(e) => handleCommentsChange(e, setAdditionalComments, 1000)}
                            />
                            <p className="text-sm text-gray-500">{additionalComments.length}/1000</p>

                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mb-5">
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="bg-gray-300 text-black px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedbakfrom; 