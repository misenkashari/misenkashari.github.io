// src/components/PdfViewer.tsx
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './PdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfViewerProps {
    pdfPath: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfPath }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const fetchPdfData = async () => {
            try {
                const pdfDoc = await pdfjs.getDocument(pdfPath).promise;
                setNumPages(pdfDoc.numPages);
            } catch (error) {
                console.error('Error loading PDF:', error);
                setNumPages(null);
            }
        };

        fetchPdfData().then(() => {});
    }, [pdfPath]);

    const goToPage = (newPage: number) => {
        setPageNumber(newPage);
    };

    const downloadPdf = () => {
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = `${pdfPath.split('c/')[1]}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="pdf-viewer-container">
            {numPages !== null && (
                <>
                    <Document file={pdfPath} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                        <Page pageNumber={pageNumber} renderTextLayer={false}
                              renderAnnotationLayer={false} />
                    </Document>
                    <div className="pdf-controls">
                        {[...Array(numPages)].map((_, index) => (
                            <button key={index + 1} onClick={() => goToPage(index + 1)}>
                                Page {index + 1}
                            </button>
                        ))}
                        <button onClick={downloadPdf}>Download</button>
                    </div>
                </>
            )}
            {numPages === null && <div className="pdf-error">Failed to load PDF file.</div>}
        </div>
    );
};

export default PdfViewer;

