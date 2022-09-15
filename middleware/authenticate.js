// //auth for login//
// const jwt = require('jsonwebtoken')

// const authUser = (req,res,next)=>{
// 	try{
// 		const token = req.headers.authorization.split(' ')[1]
// 		const decode = jwt.verify(token,"GLhou%)h")
// 		req.user = decode
// 		next()
// 	}
// 	catch(error){
// 		res.json({
// 			message: 'Auth Failed'
// 		})
// 	}
// };

// module.exports = authUser