import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList({ products, ...other }) {
  console.log(products)
  const dummy = []
  for(let i = 0; i < products.length; i++){
    if(products[i].is_org){
      dummy.push(products[i]);
    }
  }
  return (
    <Grid container spacing={3} {...other}>
      {dummy.map((product) => (
        <Grid key={product.pk} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
