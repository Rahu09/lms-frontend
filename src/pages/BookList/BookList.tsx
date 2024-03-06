import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import { Button } from "@/components/ui/button";
import BookServices from "@/services/BookServices";
import { useQuery } from "@tanstack/react-query";

export const BookList = () => {
  const { data, status, error } = useQuery({
    queryKey: ["books"],
    queryFn: () => BookServices.getAllBooks(1),
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return <div>An error has occoured {JSON.stringify(error)}</div>;

  return (
    <MaxWidthWrapper className=" max-w-screen-2xl">
      <table className="table table-striped ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Discription</th>
            <th>cost</th>
            <th>isbn</th>
            <th>language</th>
            <th>pages</th>
            <th>author</th>
            <th>publication</th>
            <th>book count</th>
            <th>edition</th>
            <th>update book</th>
            <th>delete book</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, ind) => (
              <tr key={ind}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.cost}</td>
                <td>{item.isbn}</td>
                <td>{item.language}</td>
                <td>{item.pages}</td>
                <td>{item.authorName}</td>
                <td>{item.publisherName}</td>
                <td>{item.bookCount}</td>
                <td>{item.edition}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </MaxWidthWrapper>
  );
};
