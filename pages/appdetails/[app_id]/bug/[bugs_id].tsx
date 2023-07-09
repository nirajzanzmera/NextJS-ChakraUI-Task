import AppDetail from "components/appDetails/details";
import BugsComment from "components/bugsComment/BugsComment";
import { useRouter } from "next/router";

export default function AppDetails(props: any) {
  const router = useRouter();
  return (
    <div>
      <BugsComment app={router.query} />
    </div>
  );
}
