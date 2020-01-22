import React, { useState, useEffect } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { afishaAPI } from '../../api';

const Afisha = () => {

    const [eventList, setEventList] = useState([]);

    useEffect(
        () => {
            async function getEventsFunc(dateStart) {
                const events = await afishaAPI.getEvents(dateStart);
                setEventList(events.events);
            }
            getEventsFunc();
        }
    )
    return (
        <div className='afisha'>
            {
                eventList.map(event => (
                    <Card className='card'>
                        <CardActionArea>
                            <CardMedia
                                className='media'
                                image={event.imageURL}
                                title={event.title}
                                />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {event.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {event.dateAt}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Купить билет
                            </Button>
                        </CardActions>
                    </Card>
                ))
            }
            
        </div>
    )
}

export default Afisha;