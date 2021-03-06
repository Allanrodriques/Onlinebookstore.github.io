import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart, AddshoppingCart } from '@material-ui/icons'

import useStyles from './styles';

const Product = ({ product, onAddtoCart }) => {
    const classes = useStyles();

    // console.log(product)
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name} />
            <CardContent className={classes.CardContent}>
                <Typography variant='h6' gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant='h6' >
                    {product.price.formatted_with_symbol}
                </Typography>
                <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant='body2' color="textSecondary" />
            </CardContent>
            <CardActions disableSpacing className={classes.CardActions}>
                <IconButton aria-label="Add to cart" onClick={() => onAddtoCart(product.id, 1)} >
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
