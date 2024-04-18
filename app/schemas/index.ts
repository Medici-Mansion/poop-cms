import * as z from "zod";

export const LoginSchema = z.object({
  id: z.string().min(1, {
    message: "아이디를 입력해주세요",
  }),
  password: z.string().min(1, {
    message: "패스워드를 입력해주세요",
  }),
});
