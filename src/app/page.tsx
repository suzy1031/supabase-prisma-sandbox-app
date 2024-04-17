"use client";
import useUser from "@/hooks/useUser";

export default function Home() {
  const { session, user, signOut } = useUser();

  return (
    <main>
      <div>
        <p>Top Page</p>

        {session ? (
          <div>
            <p>ログイン中です {user?.email}</p>
            <div>
              <a href="/post">post一覧</a>
            </div>
            <div>
              <a href="/post/add">post追加</a>
            </div>
            <button onClick={() => signOut()}>ログアウト</button>
          </div>
        ) : (
          <div>
            <p>ログアウト中</p>
            <div>
              <a href="/user/register">新規登録ページ</a>
            </div>
            <div>
              <a href="/user/login">ログインページ</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
