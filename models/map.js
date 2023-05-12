import { Schema, model, models } from 'mongoose';

const MapSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  tags: {
    type: [String],
    required: [true, 'Tags are required.'],
  },
});

const Map = models.Map || model("Map", MapSchema);

export default Map;