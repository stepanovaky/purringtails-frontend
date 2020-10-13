import React, { useState } from 'react';

function FrequencyOfService(props) {
    const [ frequency, setFrequency ] = useState('one-time')

    const changeHandler = (value) => {
        setFrequency(value)
    }
const options = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const checkbox = (option) => {
    return (<label>
        <inpute type="checkbox" id={option} className='switch-checkbox' />
    </label>)

}
    


    return (
        <div className="frequency" >
            <div className="frequency-radio">
            <label>
                
                <input type="radio" value="one-time" onChange={() => changeHandler('one-time')} checked={frequency === 'one-time'} />
                One Time
            </label>
            </div>
            <div className="frequency-radio">
            <label>
                
                <input type="radio" value="weekly" onChange={() => changeHandler('weekly')} checked={frequency === 'weekly'} />
            Weekly
            </label>
            </div>
        </div>
    )
}

export default FrequencyOfService;