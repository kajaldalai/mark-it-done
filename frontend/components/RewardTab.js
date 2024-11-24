router.get('/api/rewards/:type', async (req, res) => {
    const { type } = req.params;
    const userId = req.user.id; // Assuming you have authentication middleware

    try {
        let query;
        if (type === 'available') {
            query = `
                SELECT r.* 
                FROM rewards r
                LEFT JOIN user_rewards ur ON r.id = ur.reward_id AND ur.user_id = $1
                WHERE ur.id IS NULL
                ORDER BY r.points ASC
            `;
        } else {
            query = `
                SELECT r.*, ur.redeemed_at, ur.expiry_date 
                FROM rewards r
                JOIN user_rewards ur ON r.id = ur.reward_id
                WHERE ur.user_id = $1
                ORDER BY ur.redeemed_at DESC
            `;
        }

        const rewards = await db.query(query, [userId]);
        res.json(rewards.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rewards' });
    }
});
