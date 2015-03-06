var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var bourseSchema = new Schema({
    gold: {
	    	current: Number,
	    	lastUpdated: Date
    	},
    silver: {
	    	current: Number,
	    	lastUpdated: Date
    	}
});

module.exports = mongoose.model('Bourse', bourseSchema);