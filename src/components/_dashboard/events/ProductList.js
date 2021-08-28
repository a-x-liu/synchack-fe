import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
import EventCard from './ProductCard';

// ----------------------------------------------------------------------

EventList.propTypes = {
  events: PropTypes.array.isRequired
};

export default function EventList({ events, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {events.map((event) => (
        <Grid key={event.pk} item xs={12} sm={6} md={3}>
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );
}
