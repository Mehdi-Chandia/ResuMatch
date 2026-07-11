import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnection from "@/app/lib/mongodb";
import UserModel from "@/app/models/user.model";
import bcrypt from "bcrypt";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
            email:{label:"email", type:"email"},
             password:{label:"password", type:"password"}
            },
            async authorize(credentials){
                try {
                    if(!credentials.email || !credentials.password){
                        throw new Error("email and password is required");
                    }

                    await dbConnection();
                    const user=await UserModel.findOne({email:credentials.email.toLowerCase()});
                    if(!user){
                        throw new Error("invalid email or password");
                    }
                    const isValid=await bcrypt.compare(credentials.password, user.password);
                    if(!isValid){
                        throw new Error("invalid email or password");
                    }

                    return {
                        id: user._id.toString(),
                        username: user.username,
                        email: user.email,
                    };
                }catch(error){
                    console.log(error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.email = token.email;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
