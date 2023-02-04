import * as React from 'react';

export interface IDropZoneProps {
}

export default function DropZone(props: IDropZoneProps) {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [dragActive, setDragActive] = React.useState(false);


    const handleDrag = (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // handleFiles(e.target.files);
        }
    }



    const handleDrop = (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // handleFiles(e.dataTransfer.files);
        }
    }


    const onButtonClick = () => {
        console.log(inputRef.current)
        if (inputRef.current != null) {
            inputRef.current.click();
        }
    };
    return (
        <div>
            <form id="form-file-upload" onDragEnter={(e) => handleDrag(e)} onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={(e) => handleChange(e)} />
                <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                    <div>
                        <p>Drag and drop your file here or</p>
                        <button className="upload-button" onClick={() => onButtonClick()}>Upload a file</button>
                    </div>
                </label>
                {dragActive && <div id="drag-file-element" onDragEnter={(e) => handleDrag(e)} onDragLeave={(e) => handleDrag(e)} onDragOver={(e) => handleDrag(e)} onDrop={(e) => handleDrop(e)}></div>}
            </form>
        </div>
    );
}
