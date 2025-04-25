const logout =(req,res)=>{
    try {
        console.log('at logout')
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
        });
        
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
        });
        
        res.status(200).json({ success:true, message: 'Logged out successfully' });
    } catch (error) {
        console.error('error when logout = ',error)
    }
}

export default logout