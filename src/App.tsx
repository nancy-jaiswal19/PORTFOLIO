import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ResumePreview from "./pages/ResumePreview.tsx";

const App = () => (
  <BrowserRouter future={{ v7_relativeSplatPath: true }}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/resume-preview" element={<ResumePreview />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
