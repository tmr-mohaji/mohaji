const express = require("express");
const router = express.Router();
const user = require("../controller/UserController");

// 회원가입
router.post("/signup", user.postSignup);
// 아이디 중복확인
router.post("/idCheck", user.idCheck);
// 이메일 중복확인
router.post("/emailCheck", user.emailCheck);
// 아이디 찾기
router.post("/findId", user.findId);
// 비밀번호 재설정
router.post("/resetPW", user.resetPW);
// 로그인
router.post("/login", user.postLogin);

module.exports = router;