import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BookInfoImg from "./BookInfoImg";
import BookInfoMainInfo from "./BookInfoMainInfo";
import { useQuery } from "@tanstack/react-query";
import BookServices from "@/services/BookServices";
import { useAuthorization } from "@/context/AuthorizationProvider";
import { CategoryCarosel } from "../Landing/CategoryCarosel";
// import { useEffect, useState } from "react";

const BookInfoBase = () => {
  const { data, status, error } = useQuery({
    queryKey: ["books", 3],
    queryFn: () => BookServices.getBookById(3),
  });

  //getting user context
  const auth = useAuthorization();
  console.log(auth.getAuthData?.id);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return <div>An error has occoured {JSON.stringify(error)}</div>;
  return (
    <MaxWidthWrapper>
      <div>
        <div className="flex flex-row justify-center border bg-white w-full min-h-screen">
          <div className="flex flex-col justify-center align-middle w-[49%]">
            <BookInfoImg imageUrl={"data:image/jpeg;base64," + data.imageURL} />
          </div>
          <div className="w-[49%]">
            <BookInfoMainInfo bookdata={data} />
          </div>
        </div>
        <div>
          <CategoryCarosel ind={5} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default BookInfoBase;
