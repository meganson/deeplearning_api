/**
 * Created by megan on 2017-11-02.
 */

"use strict";

import mongoose from 'mongoose';

const castSchema = new mongoose.Schema({
    'contentId': { type: String, index: { required: true, unique: true }},
    'cornerId': { type: Number, index: { required: true, unique: true }},
    'cast': Array
});

export default mongoose.model('cast', castSchema);
