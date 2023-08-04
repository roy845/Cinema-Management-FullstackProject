const Subscription = require("../models/Subscription");

module.exports = {
  getAllSubscriptionsController: async (req, res) => {
    try {
      const subscriptions = await Subscription.find({})
        .populate("MemberId")
        .populate("Movies.movieId");

      res.status(200).send(subscriptions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
