const { getAllSubscriptions } = require("../Api/serverAPI");

const getAllSubscriptionsController = async (req, res) => {
  try {
    const { data } = await getAllSubscriptions();

    res.status(200).send(data);
  } catch (error) {
    res.send({
      success: false,
      message: "Error in getting all subscriptions",
      error,
    });
  }
};

module.exports = {
  getAllSubscriptionsController,
};
