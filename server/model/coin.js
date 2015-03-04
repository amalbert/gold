var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var coinSchema = new Schema({
    name:	String,
    enabled:Boolean,
    prices:[ {
	    	store: String,//{ type: Schema.Types.ObjectId, ref: 'Store' }, 
	    	years: [
	    		{
	    			price: Number, 
	    			year: Number, 
	    			uri: String
	    		}]
    	}
    ]
});

module.exports = mongoose.model('Coin', coinSchema);