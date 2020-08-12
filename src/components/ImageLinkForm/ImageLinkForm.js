import React from 'react';
import './ImageLinkForm.css';
function ImageLinkForm({onInputChange, onSubmit}){
    return (<div>
        <p className='f3'>
            {'Find faces in your pictures. Give it a try :)'}
        </p>
        <div className='center'>
            <div className='form center pa4 br3 shadow-1e'>
            <input type="text" className="f4 pa2 w-70 center" onChange={onInputChange}/>
            <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>Detect</button>
            </div>
        </div>
    </div>)
}

export default ImageLinkForm