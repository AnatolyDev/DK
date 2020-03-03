import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { afishaAPI } from '../../api';

const Concert = (props) => {

    const concertID = props.match.params.id;

    const [ev, setEv] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            async function getEventFunc(id) {
                setLoading(true);
                const eventConcert = await afishaAPI.getEvent(id);
                setEv(eventConcert.event);
                setLoading(false);
            }
            getEventFunc(concertID);
        },
        []
    )

    return (
        <>
            {loading &&
                <CircularProgress />
            }

            {!loading &&
                <Container maxWidth='sm'>
                    <h2>{ev.title}</h2>
                    <div className='concert-img'>
                        <img src={ev.imageURL} alt='Нет изображения' />
                    </div>
                    <p>
                        {ev.description}
                    </p>
                    <p>
                        Дата : {ev.dateAt}
                    </p>
                    <button>
                        Выбрать место
                    </button>
                </Container>
            }
            
        </>
    )
}

export default Concert;