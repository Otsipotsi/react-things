import React from 'react';
import { Button, Grid, Col, Row, Thumbnail } from 'react-bootstrap';

const Images = (props) => {
  /*const images = props.images.map((image, i) => 
    {
      <Col xs={6} md={4} key={i} >
        <Thumbnail src={image} alt="242x200">
        <h3 style={{overflow: 'hidden'}} >{image}</h3>
        <p>Description</p>
        <Button bsStyle="primary">Like</Button>
        </Thumbnail>
      </Col>
    }
    
  );*/
  console.log('Image component' + props)
  return (
    <Grid>
      Images here
    </Grid>
  );
}

export default Images;