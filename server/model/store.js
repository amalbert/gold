var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var storeSchema = new Schema({
    name:			String,
    url:			String,
    priceSelector:	String,
    enabled:		Boolean,
    coins: 			[{ type: Schema.Types.ObjectId, ref: 'Coin' }]
});

module.exports = mongoose.model('Store', storeSchema);