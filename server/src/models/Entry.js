import mongoose from "mongoose";

const Schema = mongoose.Schema

export const EntrySchema = new Schema({
    description: {type: String, minLength: 0, maxLength: 2000, required: true},
    img: {type: String, minLength: 0, maxLength: 500},
    creatorId: {type: Schema.ObjectId, required: true},
    notebookId: {type: Schema.ObjectId},
  },
  {
    timestamps: true,
    toJSON: {virtuals: true},
  },
)

EntrySchema.virtual('notebook', {
  ref: 'Notebook',
  localField: 'notebookId',
  foreignField: '_id',
  justOne: true
})