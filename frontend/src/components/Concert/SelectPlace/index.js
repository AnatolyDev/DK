import React from 'react';

const SelectPlace = () => {
    return (
        <div className='modal-overlay'>
            <div className='modal-window'>
                <div className='modal-body'>
                    Выбор места
                </div>
                <div className='modal-footer'>
                    <button>Ok</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default SelectPlace;