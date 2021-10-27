import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IProduct } from 'types';

interface IProps {
    product: IProduct;
}

const CardItem = ({ product }: IProps) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt={product.title}
                height="200"
                image={`https://dynobd-ecommerce.herokuapp.com/${product.image1}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.shortDescription}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add To Cart</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default CardItem;
