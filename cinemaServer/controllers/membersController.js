const {
  getAllMembers,
  subscribeToMovie,
  getMember,
  updateMember,
  createMember,
  deleteMember,
} = require("../Api/serverAPI");

const getAllMembersController = async (req, res) => {
  try {
    const { data } = await getAllMembers();

    res.status(200).send(data);
  } catch (error) {
    res.send({
      success: false,
      message: "Error in getting all members",
      error,
    });
  }
};

const getMemberController = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { data } = await getMember(memberId);

    res.status(200).send(data);
  } catch (error) {
    res.send({
      success: false,
      message: "Error in getting all members",
      error,
    });
  }
};

const deleteMemberController = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { data } = await deleteMember(memberId);

    res.status(200).send(data);
  } catch (error) {
    res.send({
      success: false,
      message: "Error in deleting member",
      error,
    });
  }
};

const updateMemberController = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { member } = req.body;

    const { data } = await updateMember(memberId, member);

    res.status(200).send(data);
  } catch (error) {
    res.send({
      success: false,
      message: "Error in updating member",
      error,
    });
  }
};

const createMemberController = async (req, res) => {
  try {
    const { member } = req.body;

    const { data } = await createMember(member);

    res.status(200).send(data);
  } catch (error) {
    res.send({
      success: false,
      message: "Error in creating member",
      error,
    });
  }
};

const subscribeToMovieController = async (req, res) => {
  try {
    const { subscription } = req.body;

    const { data } = await subscribeToMovie(subscription);

    res.status(200).send(data);
  } catch (error) {
    res.send({
      success: false,
      message: "Error in subscribing to movie",
      error,
    });
  }
};

module.exports = {
  getAllMembersController,
  getMemberController,
  deleteMemberController,
  createMemberController,
  updateMemberController,
  subscribeToMovieController,
};
