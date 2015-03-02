var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var coinSchema = new Schema({
    name:	String,
    enabled:Boolean,
    stores:[{ type: Schema.Types.ObjectId, ref: 'Store' }]
});

module.exports = mongoose.model('Coin', coinSchema);