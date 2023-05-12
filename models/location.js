import { Schema, model, models } from 'mongoose';

const LocationSchema = new Schema({
  map: {
    type: Schema.Types.ObjectId,
    ref: 'Map',
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  lat: {
    type: String,
    required: [true, 'Latitude is required'],
  },
  lng: {
    type: String,
    required: [true, 'Longitude is required'],
  },
  layer: {
    type: String,
    required: [true, 'Layer is required'],
  }
});

const Location = models.Location || model("Location", LocationSchema);

export default Location;