const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {    
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
            // getter method to format timestamp on query?
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

function formatDate(date) {
    return date.toLocaleString();
}

// This creates data shown that is retrieved each time the object is called from the database
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// This initializes the schema as a model and document in the database
const Thought = model('thought', thoughtSchema);

module.exports = Thought;