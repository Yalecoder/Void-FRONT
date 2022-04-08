import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../page";
import Create from "../page/create";
import Update from "../page/update";

const Rout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rout;
