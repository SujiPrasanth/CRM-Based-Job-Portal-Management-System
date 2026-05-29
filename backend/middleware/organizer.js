export const isorganizer = async (req, res, next) => {
    if (!req.session.user) {
        return res.status(404).json({ msg: 'Login Required' })
    }

    if (req.session.user.role !== 'organizer') {
        return res.status(404).json({ msg: 'Only Organizers are Allowed' })
    }
    next()
}