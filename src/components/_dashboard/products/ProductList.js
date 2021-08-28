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
        <Grid key={product.pk} item xs={24} sm={12} md={6}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
