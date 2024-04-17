"use client";
import { useState } from "react";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signUp } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const doRegister: SubmitHandler<{ email: string; password: string }> = async (
    formData
  ) => {
    setLoading(true);
    await signUp({ email: formData.email, password: formData.password });
    setLoading(false);
    router.push("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(doRegister)}>
        <div>
          <input
            id="email"
            placeholder="メールアドレス"
            {...register("email", {
              required: {
                value: true,
                message: "メールアドレスを入力してください",
              },
              pattern: {
                value:
                  /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
                message: "有効なメールアドレスを入力してください",
              },
            })}
          />
          {errors.email && <div>{errors.email.message}</div>}
        </div>

        <div>
          <input
            id="password"
            type="password"
            placeholder="パスワード"
            {...register("password", {
              required: {
                value: true,
                message: "パスワードを入力してください",
              },
              minLength: {
                value: 6,
                message: "パスワードは6文字以上にしてください",
              },
            })}
          />
          {errors.password && <div>{errors.password.message}</div>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "登録中..." : "新規アカウント作成"}
        </button>
      </form>
    </div>
  );
};

export default Register;
