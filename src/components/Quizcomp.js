import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../hooks/useQuizContext";

export default function Quizcomp() {
    const { state, dispatch } = useQuizContext()

    const navigate = useNavigate()

    const [buttons, setButtons] = React.useState([
        { name: "a", selected: false },
        { name: "b", selected: false },
        { name: "c", selected: false },
        { name: "d", selected: false }
    ]);


    const handleOptionClick = (name,value) => {
        
        state.next_qn = {
            ...state.next_qn,
            selected: value
        }
        
        const updatedButtons = buttons.map((button,ind) => {
            return { ...button, selected: state.next_qn.options[ind]===state.next_qn.selected };
        });
        setButtons(updatedButtons);

        // setButtons((prev)=>{
        //    return prev.map((item,ind)=>{
        //         return {...item,selected:state.next_qn.options[ind]===state.next_qn.selected}
        //     })
        // })
        function selectedList(newObj) {
            const index = state.selected_option.findIndex(obj => obj.question === newObj.question);
            if (index !== -1) {
                state.selected_option.splice(index, 1);
            }
            state.selected_option.push(newObj);
        }
        selectedList(state.next_qn)
    };

    const qns = React.useEffect(() => {
        async function getQns() {
            const response = await fetch(state.api)
            const data = await response.json()
            const modifiedData = data.results.map(item => {
                const options = [item.correct_answer, ...item.incorrect_answers].sort(() => Math.random() - 0.5).slice(0, 4);
                return { ...item, options };
            });

            dispatch({ type: 'SET_QNS', payload: modifiedData })
            dispatch({ type: 'SET_NEXT_QN' })
            dispatch({ type: 'SET_CURRENT_QN' })
        }
        getQns()
    }, [])

    function handleNextClick() {
        if(state.qn_no!==10){
        dispatch({ type: 'SET_NEXT_QN' })
        dispatch({ type: 'SET_CURRENT_QN' })
        setButtons([
            { name: "a", selected: false },
            { name: "b", selected: false },
            { name: "c", selected: false },
            { name: "d", selected: false }
        ])
    } else{
            let score = 0;
            state.selected_option.map((item)=>{
                if(item.selected === item.correct_answer){
                    score+=1
                }
            })
            dispatch({ type: 'SET_SCORE', payload: score })
            console.log(state.selected_option, state.score)
            navigate('/result')
        }
    }

    function handlePrevClick() {
        dispatch({ type: 'SET_PREV_QN' })
        dispatch({ type: 'SET_CURRENT_QN' })
    }

    return (
        <>
            {(state.next_qn && state.qn_no) ? 
            (<>
            <div id="question-block" className="container rounded-3 px-4 py-2 mt-5">
            <p className="fs-2 py-3" dangerouslySetInnerHTML={{ __html: `${state.qn_no}) ${state.next_qn.question}` }}></p>
                <div className="d-flex flex-column">
                    <button
                        onClick={() => handleOptionClick("a",state.next_qn.options[0])}
                        name="a"
                        value={state.next_qn.options[0]}
                        className={`btn option-btns fs-4 py-3 my-1 ${buttons[0].selected ? "selected" : ""}`}
                        // className={`btn option-btns fs-4 py-3 my-1 ${(state.next_qn.options[0]===state.next_qn.selected) ? "selected" : ""}`}
                        >
                        {state.next_qn.options[0]}
                    </button>
                    <button
                        onClick={() => handleOptionClick("b",state.next_qn.options[1])}
                        name="b"
                        value={state.next_qn.options[1]}
                        className={`btn option-btns fs-4 py-3 my-1 ${buttons[1].selected ? "selected" : ""}`}
                        // className={`btn option-btns fs-4 py-3 my-1 ${(state.next_qn.options[1]===state.next_qn.selected) ? "selected" : ""}`}
                        >
                        {state.next_qn.options[1]}
                    </button>
                    <button
                        onClick={() => handleOptionClick("c",state.next_qn.options[2])}
                        name="c"
                        value={state.next_qn.options[2]}
                        className={`btn option-btns fs-4 py-3 my-1 ${buttons[2].selected ? "selected" : ""}`}
                        // className={`btn option-btns fs-4 py-3 my-1 ${(state.next_qn.options[2]===state.next_qn.selected) ? "selected" : ""}`}
                        >
                        {state.next_qn.options[2]}
                    </button>
                    <button
                        onClick={() => handleOptionClick("d",state.next_qn.options[3])}
                        name="d"
                        value={state.next_qn.options[3]}
                        className={`btn option-btns fs-4 py-3 my-1 ${buttons[3].selected ? "selected" : ""}`}
                        // className={`btn option-btns fs-4 py-3 my-1 ${(state.next_qn.options[3]===state.next_qn.selected) ? "selected" : ""}`}
                        >
                        {state.next_qn.options[3]}
                    </button>
                </div>
            </div>
            <div id="buttons" className="container d-flex mt-5">
                <a href="/" type="button" class="all-btns btn btn-primary me-auto mx-3 px-4 py-2">Quit</a>
                {(!(state.qn_no===1)) && <button onClick={handlePrevClick} type="button" class="all-btns btn btn-primary mx-3 px-4 py-2">Previous</button>}
                <button onClick={handleNextClick} type="button" class="all-btns btn btn-primary mx-3 px-4 py-2">{(state.qn_no===10) ? "Finish Quiz" : "Next"}</button>
            </div>
            </>)
                : (<h2 className="mt-5 text-center">Loading...</h2>)}
        </>)
}