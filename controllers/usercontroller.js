const User = require('../models/user.js');


module.exports.singupForm = (req, res) => {
    res.render('users/signup.ejs');
};


module.exports.singUp = async (req,res)=>{
        try{
            let {username, email, password} = req.body;
            const newUser = new User({username,email});
            const registeredUser = await User.register(newUser,password);
            console.log(registeredUser);
            req.login(registeredUser,(err)=>{
                if(err){
                    return next(err);
                }
                req.flash('success','Welcome to Wanderlust!');
                res.redirect('/listings');
            })
           
        }catch(e){
            req.flash('error', e.message);
            res.redirect('/signup');
        }
    
};


module.exports.loginForm =  (req, res) => {
    res.render('users/login.ejs');
};


module.exports.login =  async (req,res)=>{
        req.flash('success', 'Welcome back to Wanderlust!');
        
        let redirectUrl = res.locals.redirectUrl || '/listings';

        res.redirect(redirectUrl);           //this middleware saves the redirect URL
};


module.exports.logOut =  (req, res) => {
    req.logout((err) => {
        if(err) {
            req.flash('error', 'Something went wrong while logging out.');
            return next(err);
        }
        req.flash('success', 'you have logged out successfully!');
        res.redirect('/listings');
    });
};