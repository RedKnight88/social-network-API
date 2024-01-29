// Bring in classes and property types, utilizing the ODM
const { Schema, Types } = require('mongoose');

// Initialize the Schema, setting the properties for the database to store and their attributes
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate // getter function for property
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true // ensures the getter activates when called by API
        },
        id: false,
    }
)

// Each time the data is retrieved, it is formatted into local time and date format
function formatDate(date) {
    return date.toLocaleString();
}

module.exports = reactionSchema;

// This process is followed for the other models