import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={24} sm={12} md={6}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
