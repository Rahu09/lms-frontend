import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { bookResponse } from "@/services/BookServices";
import { useNavigate } from "react-router-dom";
type BookCardProps = {
  bookData: bookResponse;
};
export function BookCard({ bookData }: BookCardProps) {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/bookinfo/${bookData.id}`);
  };
  return (
    <Card
      onClick={handleSubmit}
      className="flex flex-col h-[30rem] w-[15rem] justify-between border-0 mb-3 mx-1"
    >
      <CardContent className="w-full p-0 m-0  transition-all ease-in-out overflow-hidden group rounded-lg">
        <img
          className="transition-transform duration-700 transform group-hover:scale-[1.2]"
          src={"data:image/jpeg;base64," + bookData.imageURL}
          alt="book-img"
        />
      </CardContent>
      <CardFooter className="flex flex-col p-2">
        <CardTitle className="text-md flex flex-row w-full justify-between align-top">
          <p className=" text-gray-500">{bookData.title}</p>
          <p className="text-gray-700 lg:hidden">${bookData.cost}</p>
        </CardTitle>

        <div className="hidden lg:block w-full border-b-2 pt-2 border-gray-200"></div>
        <CardDescription className="p-0 pt-2 m-0 w-full flex flex-row justify-between">
          <div>
            <p>fantsy, horror</p>
            <p className="hidden pt-2 text-gray-700 lg:inline-block font-semibold">
              ${bookData.cost}
            </p>
          </div>
          <p className=" font-medium">{bookData.language}</p>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
