const Member = require("../models/Member");
const Subscription = require("../models/Subscription");
const mongoose = require("mongoose");

module.exports = {
  getAllMembersController: async (req, res) => {
    try {
      const members = await Member.find({});

      res.status(200).send(members);
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  },
  getMemberController: async (req, res) => {
    try {
      const { memberId } = req.params;
      const member = await Member.findById(memberId);

      if (!member) {
        return res
          .status(404)
          .json({ message: "No member found with this ID" });
      }

      res.status(200).send(member);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateMemberController: async (req, res) => {
    try {
      const { memberId } = req.params;
      const { member } = req.body;

      const updatedMember = await Member.findByIdAndUpdate(memberId, member, {
        new: true,
      });

      if (!updatedMember) {
        return res.status(404).json({ message: "Member not found" });
      }

      res.status(200).json(updatedMember);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteMemberController: async (req, res) => {
    try {
      const { memberId } = req.params;

      let member = await Member.findByIdAndDelete(memberId);
      if (!member) {
        return res
          .status(404)
          .json({ message: "No member found with this ID" });
      }

      await Subscription.deleteMany({ MemberId: memberId });

      return res.status(200).json({
        message: "Member and related subscriptions deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createMemberController: async (req, res) => {
    try {
      const { member } = req.body;

      const newMember = new Member(member);

      const savedMember = await newMember.save();

      res.status(200).json(savedMember);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  subscribeToMovieController: async (req, res) => {
    try {
      const { subscription } = req.body;

      let subscription1 = await Subscription.findOne({
        MemberId: subscription.MemberId,
      });

      console.log(subscription1);

      if (subscription1) {
        subscription1 = await Subscription.findOneAndUpdate(
          { MemberId: subscription.MemberId },
          {
            $push: {
              Movies: {
                movieId: subscription.movieId,
                date: new Date(subscription.date),
              },
            },
          },
          { new: true }
        );
        res.send({
          success: true,
          message: "Added movie to subscription successfully",
          data: subscription,
        });
      } else {
        subscription1 = new Subscription({
          MemberId: subscription.MemberId,
          Movies: [
            {
              movieId: subscription.movieId,
              date: new Date(subscription.date),
            },
          ],
        });

        const savedSubscription = await subscription1.save();

        res.send({
          success: true,
          message: "Subscribed to movie successfully",
          data: savedSubscription,
        });
      }
    } catch (error) {
      res.send({
        success: false,
        message: "Error in subscribing to movie",
        error,
      });
    }
  },
};
