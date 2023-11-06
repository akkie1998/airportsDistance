import React from 'react'
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';

function LocalInfo({ distanceInMiles }) {
    return (
        <CardMedia style={{ textAlign: 'center', marginTop: '7%', marginBottom: '7%' }}>
            <Typography variant="h3" gutterBottom>
                Distance
            </Typography>
            <Typography variant="h5" gutterBottom>
                {distanceInMiles}
            </Typography>
        </CardMedia>
    )
}

export default LocalInfo
