const errors = require('restify-errors') ;
const Customer = require ('../models/Customer')
module.exports = server => {
  server.get('/customers', async (req,res,next)=> {
    try {
      const customers= await Customer.find({}) ;
        res.send({customers}) ;
        next() ;
    } catch(err) {
      return next(new errors.InvalidContentError(err)) ;
    }

  });
  //Get a single customer
  server.get('/customers/:id', async (req,res,next)=> {
    try {
      const customer= await Customer.findById(req.params.id) ;
        res.send(customer) ;
        next() ;
    } catch(err) {
      return next(new errors.ResourceNotFoundError(`there is no customer with the id of ${req.params.id}`)) ;
    }

  });
  // add a new customer
  server.post('/customers',async(req,res,next)=>{
  // check for json
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expect 'application/json'"))
    }
    const { name ,email , balance } = req.body ;
    const customer = new Customer ({
name ,
email ,
balance
    })
    try {
      const newCustomer = await customer.save() ;
      res.send(201) ;
      next() ;
    }catch(err){
      return next(new errors.InteralError(err.message))
    }
  })
  //update customer
  server.put('/customers/:id',async(req,res,next)=>{
  // check for json
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expect 'application/json'"))
    }
    try {
      const customer = await Customer.findOneAndUpdate(
        {_id:req.params.id},req.body) ;
      res.send(200) ;
      next() ;
    } catch (err) {
      return next(new errors.ResourceNotFoundError(
    `there is no customer with the id of ${req.params.id}`  )) ;
    }
  });
// delete customer
server.del('/customers/:id',async(req,res,next)=> {
  try {
    const customer = await Customer.findOneAndRemove({_id:req.params.id}) ;
    re.send(204) ;
    next() ;
  }catch(err){
    return next(new errors.ResourceNotFoundError(
  `there is no customer with the id of ${req.params.id}`  )) ;
  }
})
} ;
