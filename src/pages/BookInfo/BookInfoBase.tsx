import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BookInfoImg from "./BookInfoImg";
import BookInfoMainInfo from "./BookInfoMainInfo";
import { useQuery } from "@tanstack/react-query";
import BookServices from "@/services/BookServices";
import { useAuthorization } from "@/context/AuthorizationProvider";
import { CategoryCarosel } from "../Landing/CategoryCarosel";
import { useParams } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { ErrorPage } from "@/components/ErrorPage";
// import { useEffect, useState } from "react";

const BookInfoBase = () => {
  const { bookId } = useParams();
  const id = bookId ? bookId : "1";
  const { data, status, error } = useQuery({
    queryKey: ["books", bookId],
    queryFn: () => BookServices.getBookById(parseInt(id)),
  });

  //getting user context
  const auth = useAuthorization();
  console.log(auth.getAuthData?.id);

  if (status === "pending") return <Loading />;
  if (status === "error") return <ErrorPage />;
  return (
    <MaxWidthWrapper>
      <div>
        <div className="flex flex-row justify-center border bg-white w-full min-h-screen">
          <div className="flex flex-col justify-start pt-4 w-[49%]">
            <BookInfoImg imageUrl={"data:image/jpeg;base64," + data.imageURL} />
          </div>
          <div className="w-[49%]">
            <BookInfoMainInfo bookdata={data} />
          </div>
        </div>
        <div>{/* <CategoryCarosel ind={5} /> */}</div>
      </div>
    </MaxWidthWrapper>
  );
};

export default BookInfoBase;
