import { useAppSelector } from "../app/hooks";
import PostPage from "./PostPage";

export default function Home() {
  const user = useAppSelector(s => s.auth.user)
  const guest = useAppSelector(s => s.auth.isGuest)
  if (!user && !guest) {
    return <div>Loading…</div>
  }

  return (
    <div>
      <h1>Welcome! {user?.displayName}</h1>
      <PostPage />
    </div>
  );
}
