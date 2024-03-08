import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import { Button } from "@/components/ui/button";
import BookServices from "@/services/BookServices";
import { useQuery } from "@tanstack/react-query";
import { BookCard } from "./BookCard";
import { Button } from "@/components/ui/button";
import { ArrowUpWideNarrow, Filter } from "lucide-react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { useAuthorization } from "@/context/AuthorizationProvider";

export const BookList = () => {
  const { data, status, error } = useQuery({
    queryKey: ["books"],
    queryFn: () => BookServices.getAllBooks(1),
  });

  const [age, setAge] = useState<string>();
  const auth = useAuthorization();
  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return <div>An error has occoured {JSON.stringify(error)}</div>;

  console.log(data);
  console.log(auth.getAuthData);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <MaxWidthWrapper className=" max-w-[90rem]">
      <div className="flex flex-col">
        <div className=" w-[100%] h-[45vh] bg-red-50">banner</div>
        <div>
          <div>
            <div className=" mt-10 h-20 hidden lg:flex flex-row items-center justify-between pl-[25%]">
              <div>
                <p>/info about filter</p>
              </div>
              <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
                <InputLabel id="demo-select-small-label">
                  Select Sorting Options
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={age}
                  label="Select Sorting Options"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex flex-row gap-4 bg-slate-100  mt-10">
              <div className="hidden lg:block w-[24%]">filter</div>
              <div className=" w-full h-fit flex flex-row flex-wrap justify-around gap-0 sm:gap-2 items-center">
                {Array.from({ length: 20 }).map((_, ind) => (
                  <BookCard key={ind} />
                ))}
              </div>
            </div>
            <div className="lg:hidden h-16 w-full bg-white sticky bottom-0 flex flex-row justify-between items-center border-solid border-t-2 text-slate-400">
              <Button className="bg-transparent text-black w-[50%] h-full hover:bg-slate-200 rounded-none">
                <Filter />
                filter
              </Button>
              <div className="p-0 m-0 text-[3rem]  text-center  text-slate-400">
                |
              </div>
              <Button className="bg-transparent text-black w-[50%] h-full hover:bg-slate-200 rounded-none">
                <ArrowUpWideNarrow />
                sort
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

{
  /* <table className="table table-striped ">
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
      </table> */
}
