
const {getUser} = require('../Services/auth');

// HandleAuthentication through Cookies

// const handleauth = async (req,res,next) =>{
    
//     const userid = req.cookies?.uid;
//     // const userid = req.headers["authorization"];

//     if(!userid){
//         return res.redirect('/user/login');
//     }

//     // const token = userid.split("Bearer ")[1];

//     const user = await getUser(userid);

//     if(!user){
//        return  res.redirect('/user/login');
//     }

//     req.user = user;

//     next();

// }

// const checkAuth = async (req,res,next) =>{

//     const userid = req.cookies?.uid;
//     // const userid = req.headers["authorization"];

//     if(!userid){

//         return res.redirect('/user/login');
//     }

//     // console.log(userid);
        
//     // const token = userid?.split("Bearer ")[1];

//     const user =  getUser(userid);

//     req.user = user;

//     next();

// }

// For Authentication => {login,password}

const CheckAuthentication = async (req,res,next) =>{

    const isAuthenticateUser  = req.cookies?.token;
    req.user = null;

    if(!isAuthenticateUser){
        return next();
    }

    const token = isAuthenticateUser;
    const user = getUser(token);

    req.user = user;

    next();

}


function RestrictUserOnlyTO(roles = []){

    return  (req,res,next) => {

        const isAutherization = req.user;

        if(!isAutherization){
            return res.redirect('/user/login');
        }

        if(!roles.includes(req.user.role)){
            return res.end('Unauthorized person');
        }

       return next();
    }
}



module.exports = {CheckAuthentication,RestrictUserOnlyTO};