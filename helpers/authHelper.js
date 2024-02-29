const bcrypt = require('bcrypt')

const hashPwd = async (pwd) => {
    try {
        const saltRounds = 10
        const hashedPwd = await bcrypt.hash(pwd, saltRounds)
        return hashedPwd
    } catch (error) {
        console.log(error)
    }
}

const comparePwd = async (pwd, hashedPwd) => {
    return bcrypt.compare(pwd, hashedPwd)
}

module.exports = { hashPwd, comparePwd}