import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { bookResponse } from "@/services/BookServices";
type BookCardProps = {
  bookData: bookResponse;
};
export function BookCard({ bookData }: BookCardProps) {
  return (
    <Card className="flex flex-col justify-between mb-8 w-[45vw] max-w-[24rem] lg:w-[24%] lg:h-[29rem] xl:h-[33rem] p-3 bg-transparent">
      <CardContent className="w-full p-0 m-0 hover:p-3 transition-all ease-in-out">
        <div className="w-full flex justify-center">
          <img
            src={"data:image/jpeg;base64," + bookData.imageURL}
            alt="book-img"
            className=" w-full"
          />
        </div>
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
