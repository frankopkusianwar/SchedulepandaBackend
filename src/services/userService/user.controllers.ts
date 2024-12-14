import {Request,Response,NextFunction} from "express"
import { prisma } from "../../server"

class UserController {

    public static checkUserRegistrationStatus = async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{
        try {

            const {id} = req.params
            console.log(id,'---------> clerk id')
            //check if user exists
            const user = await prisma.user.findFirst({
                where:{
                    clerkId:id
                }
            })


            console.log(user,'---------> user')

            if(!user){
                const newUser = await prisma.user.create({
                    data:{
                        clerkId:id
                      }
                } )
                
                console.log(newUser,'--------------> new user')
                //TODO handle Errors
                res.status(200).json({
                    message:"user added successfully"
                })

                return
            }



            res.status(200).json({
                 message:"user already exists"
            })
            
        } catch (error) {

         console.log(error,'---------> errorrrr')
          res.status(500).json({
                 message:"error"
            })
        }
    }
}


export default UserController


