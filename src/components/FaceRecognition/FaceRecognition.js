import React from 'react'

function FaceRecognition({imageUrl}){
    return(
        <div className="center ma">
            <div className='absolute mt2'>
                <img alt="" src={imageUrl} width='400px' height='auto'/>
            </div>
        </div>
    )
}

export default FaceRecognition