import mongoose from "mongoose";

const Schema = mongoose.Schema

export const NotebookSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    title: {type: String, minLength: 3, maxLength: 25, required: true},
    icon: {
      type: String, required: true, enum: ['mdi-database', 'mdi-cloud', 'mdi-package', 'mdi-palette', 'mdi-home', 'mdi-code-array', 'mdi-xml', 'mdi-cash', 'mdi-food-apple', 'mdi-account', 'mdi-shield', 'mdi-pencil'],
    },
    color: {type: String, minLength: 3, maxLength: 20, required: true},
    coverImg: { type: String, minLength: 1, maxLength: 500, required: true },
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

// TODO Make sure to include the virtual property for entryCount once entry model is created and re-run PostMan tests to make sure property is properly included on the object. 