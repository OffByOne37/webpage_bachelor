import { MDBIcon } from 'mdbreact';
import CodeEditor from './CodeEditor';
import './editor.css';

const DownloadCodeEditor = ({ firstCode, usedLanguage }) => {

    const handleDownload = () => {
        const fileExtension = usedLanguage === 'python' ? 'py' : 'js';
        const fileName = `code.${fileExtension}`;
        const fileContents = firstCode;
        const fileBlob = new Blob([fileContents], { type: `text/${fileExtension}` });
        const fileURL = URL.createObjectURL(fileBlob);

        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = fileName;
        downloadLink.click();
        URL.revokeObjectURL(fileURL);
    };

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(firstCode);
            alert('Code copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy code to clipboard:', error);
        }
    };

    return (
        <>
            <div className="download-code-editor">
                <div className="download-icons">
                    <div className="download-icon" onClick={handleDownload}>
                        <MDBIcon icon="download" />
                    </div>
                    <div className="copy-icon" onClick={handleCopyCode}>
                        <MDBIcon icon="copy" />
                    </div>
                </div>
            </div>
            <CodeEditor firstCode={firstCode} usedLanguage={usedLanguage} />
        </>

    );
};

export default DownloadCodeEditor;
