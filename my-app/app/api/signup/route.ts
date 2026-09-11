import { dbConnect } from '@/app/lib/dbConnect'
import { IUser } from "@/app/model/UserSchema";
import bcrypt from 'bcryptjs'



import { sendVerificationEmail } from '@/app/lib/helper/SenderificationCode'
import { is } from 'zod/v4/locales/index.js';
import { success } from 'zod/mini';


export async function POST(request: Request) { 
    await dbConnect()

    try {

        const { email, username, password } = await request.json()
        const exitingUsername = UserModel.findOne({
            username,
            isVerified:true

        })

        if (
            exitingUsername
        ) { 
            return Response.json({
                sucess: false,
                message:"Username is already taken"
            }, {status:400})
        }


        const existingUSerEmail = await UserModel.findOne({ email })
        const verifycode = Math.floor(100000 + Math.random()*9000000).toString
        if (existingUSerEmail) {
            if (existingUSerEmail.isverified) { 
                return Response.json({
            success: false,
            message:"User exis "
        }, {status:200})
            } else{ 

            } const hashPassword = await bcrypt.hash(password, 10)
            existingUSerEmail.password = hashPassword;
            existingUSerEmail.verifyCode = verifycode;
            existingUSerEmail.verifyCodeExpiry = new Date(now() + 360000000)
            await existingUSerEmail.save()
        } 
        else { 
            const hashPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
           const newUser =  new UserModel({
                 email,
                password:hashPassword
                verifyCode?: string;
                verifyCodeExpiry?: Date;

                isVerified: boolean;
                isAcceptingMessages: boolean;
             messages: IMessage[];
           })
            await newUser.save()
        }

       const emailResponse =  await sendVerificationEmail(
           email,
           username,
           verifycode
        )
        if (!emailResponse.success) { 
            return Response.json({
                success: false,
                message:emailResponse.message
            }, {status:500});
        }
        return Response.json({
            success: true,
            message:"User registered successfully. Please verify your email."
        }, {status:200})

        
    } catch (error) {
        console.log('Error registering user', error)
        return Response.json(
            {
                sucess: false,
                message: "Error register user"
            }, {
                status:500
            }
        )
    }
}



