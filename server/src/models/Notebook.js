import mongoose from "mongoose";

const Schema = mongoose.Schema

export const NotebookSchema = new Schema(
  {
    title: {type: String, minLength: 3, maxLength: 25, required: true},
    icon: {type: String, minLength: 3, maxLength: 25, required: true},
    color: {type: String, minLength: 3, maxLength: 20, required: true},
    coverImg: {type: String, minLength: 1, maxLength: 500, required: true},
    creatorId: {type: Schema.ObjectId, required: true, ref: 'Account'},
  },
  {
    timestamps: true,
    toJSON: {virtuals: true}
  }
)

NotebookSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true
})