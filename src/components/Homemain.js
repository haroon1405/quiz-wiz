import React from "react";
import { Link } from "react-router-dom";
import { useQuizContext } from "../hooks/useQuizContext";

export default function Homemain() {

    const {state,dispatch} = useQuizContext()

    const [formData, setFormData] = React.useState({
        category:"",
        difficulty:""
    })

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleClick(){
        const api_url = `https://opentdb.com/api.php?amount=10${
            formData.category && `&category=${formData.category}`
        }${
            formData.difficulty && `&difficulty=${formData.difficulty}`
        }&type=multiple`;
        dispatch({type: 'SET_API', payload: api_url})
    }

    return (
        <div className="">
            <div className="d-flex align-items-center flex-column justify-content-center">
                <div className="w-25 mt-5">
                    <p className="p-0 m-0 mb-2 fs-4 ">Choose Category</p>
                    <select name="category" value={formData.category} onChange={handleChange} className="form-select p-2 m-0 ">
                        <option value="any">Any Category</option>
                        <option value="9">General Knowledge</option><option value="10">Entertainment: Books</option><option value="11">Entertainment: Film</option><option value="12">Entertainment: Music</option><option value="13">Entertainment: Musicals &amp; Theatres</option><option value="14">Entertainment: Television</option><option value="15">Entertainment: Video Games</option><option value="16">Entertainment: Board Games</option><option value="17">Science &amp; Nature</option><option value="18">Science: Computers</option><option value="19">Science: Mathematics</option><option value="20">Mythology</option><option value="21">Sports</option><option value="22">Geography</option><option value="23">History</option><option value="24">Politics</option><option value="25">Art</option><option value="26">Celebrities</option><option value="27">Animals</option><option value="28">Vehicles</option><option value="29">Entertainment: Comics</option><option value="30">Science: Gadgets</option><option value="31">Entertainment: Japanese Anime &amp; Manga</option><option value="32">Entertainment: Cartoon &amp; Animations</option>
                    </select>
                </div>
                <div className="w-25 mt-5">
                    <p className="p-0 m-0 mb-2 fs-4 ">Choose Difficulty</p>
                    <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="form-select p-2 m-0 ">
                        <option value="any">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <Link to="quiz" onClick={handleClick} className="all-btns btn btn-primary mt-5 px-4 py-2">Start Quiz</Link>
            </div>
        </div>
    )
}