var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var bourseSchema = new Schema({
	lastUpdated: Date,
    gold: {
	    	current: Number,
	    	historic: [{date:Date, price:Number}]
    	},
    silver: {
	    	current: Number,
	    	historic: [{date:Date, price:Number}]
    	}
});

module.exports = mongoose.model('Bourse', bourseSchema);