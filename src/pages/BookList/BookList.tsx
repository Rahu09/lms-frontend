import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BookServices, { Page, bookResponse } from "@/services/BookServices";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BookCard } from "./BookCard";
import { X } from "lucide-react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Typography } from "@mui/material";
import { Button } from "@/components/ui/button";
import { FilterBox } from "./FilterBox";
import { filterOptions, sortOptions } from "@/lib/enums";
import { MobileFilterSort } from "./MobileFilterSort";

export const BookList = () => {
  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<Page, Error>({
    queryKey: ["posts"],
    getNextPageParam: (lastPage: Page) => lastPage.nextPage,
    /**
     * Explaining comment
     *
     * @ts-expect-error */
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      BookServices.getAllBooks(pageParam),
  });
  console.log("bookList", data);

  const [sort, setSort] = useState<sortOptions>(sortOptions.ALPHABETICAL);
  const [filter, setFilter] = useState<
    {
      type: filterOptions;
      filterElement: string[];
    }[]
  >([
    { type: filterOptions.AUTHOR, filterElement: ["a", "b", "c", "d"] },
    { type: filterOptions.CATEGORY, filterElement: ["e", "f", "g", "h"] },
    { type: filterOptions.LANGUAGE, filterElement: ["i", "j", "k", "l"] },
  ]);

  const emptyBooleanArray = (filterType: filterOptions) => {
    let index = 0;
    filter.map((ele, ind) => {
      if (ele.type === filterType) index = ind;
    });
    return [
      ...Array.from({
        length: filter[index].filterElement.length,
      }).map((_) => false),
    ];
  };

  const [selected, setSelected] = useState<
    {
      type: filterOptions;
      state: boolean[];
    }[]
  >([
    {
      type: filterOptions.AUTHOR,
      state: emptyBooleanArray(filterOptions.AUTHOR),
    },
    {
      type: filterOptions.CATEGORY,
      state: emptyBooleanArray(filterOptions.CATEGORY),
    },
    {
      type: filterOptions.LANGUAGE,
      state: emptyBooleanArray(filterOptions.LANGUAGE),
    },
  ]);

  // const auth = useAuthorization();

  console.log(selected);

  const handleChange = (e: SelectChangeEvent) => {
    const selected =
      sortOptions.ALPHABETICAL === e.target.value
        ? sortOptions.ALPHABETICAL
        : sortOptions.NEWEST === e.target.value
        ? sortOptions.NEWEST
        : sortOptions.POPULARITY === e.target.value
        ? sortOptions.POPULARITY
        : sortOptions.PRICE === e.target.value
        ? sortOptions.PRICE
        : sortOptions.ALPHABETICAL;
    setSort(selected);
  };

  const handleRemoveFilter = (index: number, ind: number) => {
    const tempSelected = [...selected];
    tempSelected[index] = {
      ...tempSelected[index],
      state: [...tempSelected[index].state],
    };
    tempSelected[index].state[ind] = false;
    setSelected(tempSelected);
  };

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return <div>An error has occoured {JSON.stringify(error)}</div>;
  return (
    <MaxWidthWrapper className=" max-w-[90rem]">
      <div className="flex flex-col">
        <div className=" w-[100%] h-[45vh] bg-[#dbeafe] flex justify-center items-center">
          banner
          {/* <Test /> */}
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
                  BookList items -
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
                  {selected.map((filterType, index) =>
                    filterType.state.map(
                      (ele, ind) =>
                        ele && (
                          <div
                            key={ind}
                            className="mr-3 flex flex-row justify-center items-center  rounded-3xl px-3 w-fit h-7 border border-gray-300"
                          >
                            <div>{`${selected[index].type}:${filter[index].filterElement[ind]}`}</div>
                            <Button
                              variant="ghost"
                              className="p-0 m-0 pl-2 hover:bg-transparent"
                              onClick={() => handleRemoveFilter(index, ind)}
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
                  <MenuItem value={sortOptions.ALPHABETICAL}>
                    {sortOptions.ALPHABETICAL}
                  </MenuItem>
                  <MenuItem value={sortOptions.POPULARITY}>
                    {sortOptions.POPULARITY}
                  </MenuItem>
                  <MenuItem value={sortOptions.NEWEST}>
                    {sortOptions.NEWEST}
                  </MenuItem>
                  <MenuItem value={sortOptions.PRICE}>
                    {sortOptions.PRICE}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex flex-row gap-4  mt-4">
              {/* Side bar*/}
              <div className="hidden lg:block w-[24%] border-[1px] border-gray-300 border-l-0 border-b-0 h-fit ml-5">
                <FilterBox
                  filter={filter}
                  setFilter={setFilter}
                  filterName={filterOptions.AUTHOR}
                  selected={selected}
                  setSelected={setSelected}
                />
                <hr className="mt-5 border-[1px] border-gray-300 mr-3" />
                <FilterBox
                  filter={filter}
                  setFilter={setFilter}
                  filterName={filterOptions.CATEGORY}
                  selected={selected}
                  setSelected={setSelected}
                />
                <hr className="mt-5 border-[1px] border-gray-300 mr-3" />
                <FilterBox
                  filter={filter}
                  setFilter={setFilter}
                  filterName={filterOptions.LANGUAGE}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
              {/* book container */}
              <div className=" w-full h-fit flex flex-row flex-wrap justify-around gap-0 sm:gap-2 items-center pt-2 border-t-[1px] border-gray-300 ">
                {data &&
                  data.pages.map((page) =>
                    /**
                     * Explaining comment
                     *
                     * @ts-expect-error */
                    page.data.map((book: bookResponse) => (
                      <BookCard key={book.id} bookData={book} />
                    ))
                  )}
                {hasNextPage && (
                  <button
                    disabled={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                  >
                    Load More
                  </button>
                )}
              </div>
            </div>
            <MobileFilterSort
              filter={filter}
              setFilter={setFilter}
              selected={selected}
              setSelected={setSelected}
              setSort={setSort}
              sort={sort}
            />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
