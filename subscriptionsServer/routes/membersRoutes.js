const express = require("express");

const router = express.Router();

const {
  getAllMembersController,
  getMemberController,
  deleteMemberController,
  createMemberController,
  updateMemberController,
  subscribeToMovieController,
} = require("../controllers/membersController");

//getAllMembers || METHOD GET
router.get("/getAllMembers", getAllMembersController);

//getMember || METHOD GET
router.get("/getMember/:memberId", getMemberController);

//deleteMember || METHOD DELETE
router.delete("/deleteMember/:memberId", deleteMemberController);

//createMember || METHOD POST
router.post("/createMember", createMemberController);

//updateMember || METHOD PUT
router.put("/updateMember/:memberId", updateMemberController);

//subscribeToMovie || METHOD POST
router.post("/subscribeToMovie", subscribeToMovieController);

module.exports = router;
