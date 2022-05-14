import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard(props) {
  const blogLink = `/blog/${props.id}`
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href={blogLink}>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.style}
          </Typography>
          <Typography variant="body1">
            {props.rating}
          </Typography>
          <Typography variant="body1">
            {props.price}
          </Typography>
          <Typography variant="body1">
            {props.service}
          </Typography>
        </CardContent>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
      </CardActionArea>
    </Card>
  );
}