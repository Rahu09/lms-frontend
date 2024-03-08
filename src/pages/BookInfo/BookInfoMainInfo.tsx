import { useQuery } from "@tanstack/react-query";
import BookServices from "@/services/BookServices";
interface BookInfoMainInfoProps {
  bookdata: {
    authorName: string;
    bookCount: number;
    cost: number;
    description: string;
    edition: string;
    id: number;
    imageURL: string;
    isbn: string;
    language: string;
    pages: number;
    publisherName: string;
    title: string;
  };
}
const BookInfoMainInfo = ({ bookdata }: BookInfoMainInfoProps) => {
  console.log(bookdata);
  const bookId = bookdata.id;
  console.log(bookId);

  //get category/genre for book
  const { data, status, error } = useQuery({
    queryKey: ["bookcategory", bookId],
    queryFn: () => BookServices.getCategoryByBookId(bookId),
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return <div>An error has occoured {JSON.stringify(error)}</div>;

  console.log("category log: ", data);

  return (
    <div className="ml-12 p-5 flex flex-col border-black rounded-xl border-4 ">
      <div className="font-bold justify-center align-middle text-4xl">
        {bookdata.title}
      </div>
      <br />
      <br />
      <p>
        <span className="font-bold">Description:</span> {bookdata.description}
      </p>
      <br />
      <p>
        <span className="font-bold">Genre: </span>
        {data.map((cat) => (
          <span className=" inline">{cat + ", "}</span>
        ))}
      </p>
      <br />
      <p>
        <span className="font-bold">Language:</span> {bookdata.language}
      </p>
      <br />
      <p>
        <span className="font-bold">Author: </span>
        {bookdata.authorName}
      </p>
      <br />
      <p>
        <span className="font-bold">Edition:</span> {bookdata.edition}
      </p>
      <br />
      <p>
        <span className="font-bold">Pages:</span> {bookdata.pages}
      </p>
      <br />
      <p>
        <span className="font-bold">Publisher:</span> {bookdata.publisherName}
      </p>
      <br />
      <p>
        <span className="font-bold">ISBN:</span> {bookdata.isbn}
      </p>
      <br />
      {/* add the wikipedia url of book  {data.link} */}
      <p>
        <span className="font-bold">Wiki:</span>
      </p>
      <br />
    </div>
  );
};

export default BookInfoMainInfo;
