import { createContext, useReducer } from 'react'

export const QuizContext = createContext()

export const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_API':
      return {
        ...state,
        api: action.payload
      }
    case 'SET_QNS':
      return {
        ...state,
        qns: action.payload
      }
    case 'SET_SCORE':
      return {
        ...state,
        score: action.payload
      }
    case 'SET_NEXT_QN':
      return {
        ...state,
        qn_no: state.qn_no + 1,
      }
    case 'SET_PREV_QN':
      return {
        ...state,
        qn_no: state.qn_no - 1,
      }
    case 'SET_CURRENT_QN':
      return {
        ...state,
        next_qn: state.qns[state.qn_no - 1],
      }
    default:
      return state
  }
}

const initialState = {
  api: "",
  qns: [],
  score: 0,
  qn_no: 0,
  next_qn: {},
  selected_option: []
}

export const QuizContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}