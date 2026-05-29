import User from '../models/user.js'
import Nuser from '../models/nuser.js'
import Organizeruser from '../models/organizer.js'


export const registeruser = async (req, res) => {
    try {

        const { email, password, companyname, fullname, role } = req.body

        if (!email || !password || !role) {
            return res.status(400).json({ msg: "All fields required" });
        }

        const alreadyuser = await User.findOne({ email })

        if (alreadyuser) {
            return res.status(400).json({ msg: 'User Already Exist' })
        }

        const user = await User.create({ email, password, role, fullname })

        if (role === 'user') {
            await Nuser.create({
                userid: user._id,

            })
        } else if (role === 'organizer') {
            await Organizeruser.create({
                userid: user._id,
                companyname
            })
        }

        return res.status(201).json({ msg: "user created successfully", user })
    } catch (err) {
        console.log({ msg: err.message })
        return res.status(500).json({ msg: err.message })
    }

}

export const checkuser = async (req, res) => {
    try {
        const { email, password } = req.body
        const finduser = await User.findOne({ email })
        if (!finduser) {
            return res.status(404).json({ msg: "User is Not Found" })
        }

        if (finduser.password !== password) {
            return res.status(404).json({ msg: 'Password is Incorrect' })
        }

        console.log(finduser)
        req.session.user = { id: finduser._id, role: finduser.role }
        return res.status(200).json({ msg: 'Login Successfull', user: req.session.user })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}


export const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ msg: "Logout Failed" })
            }
            res.clearCookie("connect.sid")
            return res.status(200).json({ msg: "Logout Successfully" })
        })
    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}