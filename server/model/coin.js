var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var coinSchema = new Schema({
    name:	String,
    enabled:Boolean,
    imagesDir : String,
    prices:[ {
	    	store: String,//{ type: Schema.Types.ObjectId, ref: 'Store' }, 
	    	years: [
	    		{
	    			price: Number, 
	    			year: Number, 
	    			uri: String,
                    imagesDir : String
	    		}]
    	}
    ],
    weight: String,
    metal: String,
    description:String,
    width:Number,
    thickness:Number,
    titre:Number,
    country: String,
    lastUpdated: Date
});

module.exports = mongoose.model('Coin', coinSchema);