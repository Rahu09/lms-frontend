import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BookInfoImg from "./BookInfoImg";
import BookInfoSideInfo from "./BookInfoSideInfo";
import BookInfoMainInfo from "./BookInfoMainInfo";
import { useQuery } from "@tanstack/react-query";
import BookServices from "@/services/BookServices";

const BookInfoBase = () => {
  const { data, status, error } = useQuery({
    queryKey: ["books", 3],
    queryFn: () => BookServices.getBookById(3),
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return <div>An error has occoured {JSON.stringify(error)}</div>;
  console.log(data);

  return (
    <MaxWidthWrapper>
      <div className="flex flex-row bg-slate-200 justify-center align-middle">
        <div className="flex flex-col justify-center align-middle">
          <BookInfoImg imageUrl={data.imageURL} />
          <BookInfoSideInfo
            cost={data.cost}
            bookId={data.id}
            bookCount={data.bookCount}
          />
        </div>

        <BookInfoMainInfo bookdata={data} />
      </div>
    </MaxWidthWrapper>
  );
};

export default BookInfoBase;
