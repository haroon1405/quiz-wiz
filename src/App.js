import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home'
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

export default function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navbar />}>
                <Route index element={<Home />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/result" element={<Result />} />
            </Route>
        </Routes>
        </BrowserRouter>
    )
}

