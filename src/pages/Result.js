import React from "react";
import { useQuizContext } from "../hooks/useQuizContext"; 

export default function Quiz(){

    const { state } = useQuizContext()

    return (
        <>
            <h3 className="text-center mt-5">Your Score:</h3>
            <div className="score">
                {state.score}
            </div>
            <div className="container text-center">
                <a href="/" className="all-btns btn btn-primary px-4 py-2">Back Home</a>
            </div>
        </>
    )
}