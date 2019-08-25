import User from '../models/User';
import notification from '../schemas/notification';

class NotificationControler {
    
    async index(req, res) {
        
        const chekIsProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!chekIsProvider) {
            return res.status(400).json({ error: 'Only providers can load notifications '});
        }

        const notifications = await notification.find({
            user: req.userId,
        }).sort({ createdAt: 'desc' })
        .limit(20);
        
        return res.json(notifications);
    }
}

export default new NotificationControler();