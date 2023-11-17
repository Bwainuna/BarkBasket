const {User, Product} = require("../models");
const { findOne } = require("../models/Product");
const {signToken, AuthenticationError} = require("../utils/auth")

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id}).populate("cart");
            }
            throw AuthenticationError;
        },
        products: async () =>{
            return Product.find();
        },
        product: async (parent, {productId}) =>{
            return Product.findOne({_id: productId});
        }
    },

    Mutation: {
        addUser: async (parent, {username, email, password}) =>{
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, {email, password}) =>{
            const user = await findOne({email});

            if(!user){
                throw AuthenticationError;
            }

            const correctPassword = await user.isCorrectPassword(password);

            if(!correctPassword){
                throw AuthenticationError;
            }

            const token = signToken(user);

            return {token, user};
        }
    }
}