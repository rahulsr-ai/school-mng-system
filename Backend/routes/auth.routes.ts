import { Router } from "express"
import { loginAdmin, logoutAdmin, verifyAdmin } from "../controllers/auth.controller"

const authRouter = Router()


authRouter.post("/login", loginAdmin)
authRouter.post("/logout", logoutAdmin)
authRouter.get("/verify", verifyAdmin )



export default authRouter