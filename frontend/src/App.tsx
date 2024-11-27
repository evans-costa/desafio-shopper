import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import RideForm from "./components/RideForm";
import Home from "./pages/Home";
import Rides from "./pages/Rides";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index element={<RideForm />} />
        <Route path="rides/:customerId" element={<Rides />} />
      </Routes>
    </BrowserRouter>
  );
}
