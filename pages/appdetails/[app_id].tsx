import AppDetail from "components/appDetails/details";
import { useRouter } from "next/router";

export default function AppDetails(props: any) {
  const router = useRouter();
  return (
    <div>
      <AppDetail app={router.query} />
    </div>
  );
}
