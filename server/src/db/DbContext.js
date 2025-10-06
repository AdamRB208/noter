import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { ValueSchema } from '../models/Value.js'
import { NotebookSchema } from '../models/Notebook.js';
import { EntrySchema } from '../models/Entry.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Notebook = mongoose.model('Notebook', NotebookSchema);
  Entry = mongoose.model('Entry', EntrySchema);
}

export const dbContext = new DbContext()
