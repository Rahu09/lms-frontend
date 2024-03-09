import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import { Button } from "@/components/ui/button";
import BookServices from "@/services/BookServices";
import { useQuery } from "@tanstack/react-query";
import { BookCard } from "./BookCard";
import { ArrowUpWideNarrow, Filter, X } from "lucide-react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useAuthorization } from "@/context/AuthorizationProvider";
import { Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
import { FilterBox } from "./FilterBox";

export const BookList = () => {
  const { data, status, error } = useQuery({
    queryKey: ["books"],
    queryFn: () => BookServices.getAllBooks(1),
  });

  const [sort, setSort] = useState<string>();
  const [author, setAuthor] = useState<string[]>([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
  ]);
  const [category, setCategory] = useState<string[]>([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
  ]);
  const [language, setLanguage] = useState<string[]>([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
  ]);
  const [selected, setSelected] = useState<
    {
      filter: string;
      state: boolean[];
    }[]
  >([
    { filter: "author", state: [] },
    { filter: "language", state: [] },
    { filter: "category", state: [] },
  ]);
  // const auth = useAuthorization();

  // console.log(data);
  // console.log(auth.getAuthData);
  console.log(selected);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    console.log("selected changed");
  }, [selected, setSelected]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return <div>An error has occoured {JSON.stringify(error)}</div>;
  return (
    <MaxWidthWrapper className=" max-w-[90rem]">
      <div className="flex flex-col">
        <div className=" w-[100%] h-[45vh] bg-[#dbeafe] flex justify-center items-center">
          banner
        </div>
        <div>
          <div>
            <div className=" mt-10 h-28 hidden lg:flex flex-row items-center justify-between pl-[25%]">
              <div className="flex flex-col justify-start items-start h-full w-[70%] pt-4">
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  sx={{
                    color: "#aaacaf",
                    marginY: "-4px",
                  }}
                >
                  Home / Book List
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  sx={{
                    color: "#5b5c5e",
                    display: "inline",
                    marginY: "-4px",
                  }}
                >
                  BookList items -{" "}
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{ color: "#aaacaf", display: "inline" }}
                  >
                    {23}
                  </Typography>
                </Typography>
                <div className="mt-4 flex flex-row flex-wrap ">
                  {selected.map((filter, index) =>
                    filter.state.map(
                      (ele, ind) =>
                        ele && (
                          <div
                            key={ind}
                            className="mr-3 flex flex-row justify-center items-center  rounded-3xl px-3 w-fit h-7 border border-gray-300"
                          >
                            <div>{`${selected[index].filter}:${
                              index === 0
                                ? author[ind]
                                : index === 1
                                ? category[ind]
                                : language[ind]
                            }`}</div>
                            <Button
                              variant="ghost"
                              className="p-0 m-0 pl-2 hover:bg-transparent "
                            >
                              <X size={"16px"} color="gray" />
                            </Button>
                          </div>
                        )
                    )
                  )}
                </div>
              </div>
              <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
                <InputLabel id="demo-select-small-label">
                  Select Sorting Options
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={sort}
                  label="Select Sorting Options"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Alphabetical</MenuItem>
                  <MenuItem value={20}>Popularity</MenuItem>
                  <MenuItem value={30}>Newest</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex flex-row gap-4  mt-4">
              {/* Side bar*/}
              <div className="hidden lg:block w-[24%] border-[1px] border-gray-300 border-l-0 border-b-0 h-fit ml-5">
                <FilterBox
                  filter={author}
                  filterName={"author"}
                  selected={selected}
                  setSelected={setSelected}
                />
                <hr className="mt-5 border-[1px] border-gray-300 mr-3" />
                <FilterBox
                  filter={category}
                  filterName={"category"}
                  selected={selected}
                  setSelected={setSelected}
                />
                <hr className="mt-5 border-[1px] border-gray-300 mr-3" />
                <FilterBox
                  filter={language}
                  filterName={"language"}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
              {/* book container */}
              <div className=" w-full h-fit flex flex-row flex-wrap justify-around gap-0 sm:gap-2 items-center pt-2 border-t-[1px] border-gray-300 ">
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
