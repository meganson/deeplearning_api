/**
 * Created by megan on 2017-11-02.
 */

"use strict";

import mongoose from 'mongoose';

let Schema = mongoose.Schema;
const genreSchema = Schema({
    'contentId': { type: String, index: { required: true, unique: true }},
    'cornerId': { type: Number, index: { required: true, unique: true }},
    'genre': Array
});

export default mongoose.model('genre', genreSchema);