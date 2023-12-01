import './App.css'
import PdfViewer from "./components/PdfViewer.tsx";
import pdf from "../public/Misen Kashari.pdf";

function App() {
  return (
    <>
        <PdfViewer pdfPath={pdf} />
    </>
  )
}

export default App
