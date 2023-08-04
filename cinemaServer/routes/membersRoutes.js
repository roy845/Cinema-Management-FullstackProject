const express = require("express");
const {
  getAllMembersController,
  getMemberController,
  deleteMemberController,
  updateMemberController,
  subscribeToMovieController,
  createMemberController,
} = require("../controllers/membersController");

const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routing

//GetAllMembers || METHOD GET
router.get("/getAllMembers", requireSignIn, getAllMembersController);

//GetMember || METHOD GET
router.get("/getMember/:memberId", requireSignIn, getMemberController);

//deleteMember || METHOD DELETE
router.delete("/deleteMember/:memberId", requireSignIn, deleteMemberController);

//createMember || METHOD POST
router.post("/createMember", requireSignIn, createMemberController);

//updateMember || METHOD PUT
router.put("/updateMember/:memberId", requireSignIn, updateMemberController);

//subscribeToMovie || METHOD POST
router.post("/subscribeToMovie", requireSignIn, subscribeToMovieController);

module.exports = router;
