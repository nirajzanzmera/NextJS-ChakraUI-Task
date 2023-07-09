import AppDetail from "components/appDetails/details";
import ReviewsComment from "components/reviewsComment/ReviewsComment";
import { useRouter } from "next/router";

export default function AppDetails(props: any) {
  const router = useRouter();
  return (
    <div>
      <ReviewsComment app={router.query} />
    </div>
  );
}
