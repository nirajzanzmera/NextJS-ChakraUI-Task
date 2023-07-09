import { getToken } from 'next-auth/jwt'

const secret = process.env.JWT_SECRET!

const jwtHelper = async (req: any, res: any) => {
  const token = await getToken({ req, secret })
  res.end()
}

export default jwtHelper
