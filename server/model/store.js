var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var storeSchema = new Schema({
    name:			String,
    url:			String,
    priceSelector:	String,
    enabled:		Boolean
});

module.exports = mongoose.model('Store', storeSchema);