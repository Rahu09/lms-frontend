import MaxWidthWrapper from "@/components/MaxWidthWrapper";
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
import { filterOptions } from "@/lib/enums";
import { MobileFilter } from "./MobileFilterBox";
import { cn } from "@/lib/utils";
import { MobileFilterSort } from "./MobileFilterSort";

export const BookList = () => {
  const { data, status, error } = useQuery({
    queryKey: ["books"],
    queryFn: () => BookServices.getAllBooks(1),
  });

  const [sort, setSort] = useState<string>();
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [mobileFilter, setMobileFilter] = useState<filterOptions>(
    filterOptions.AUTHOR
  );
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

  useEffect(() => {
    console.log("hii");
  }, [selected, setSelected]);

  // const auth = useAuthorization();

  // console.log(data);
  // console.log(auth.getAuthData);
  console.log(selected);
  console.log(mobileFilter);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

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
                {Array.from({ length: 20 }).map((_, ind) => (
                  <BookCard key={ind} />
                ))}
              </div>
            </div>
            <MobileFilterSort
              filter={filter}
              setFilter={setFilter}
              selected={selected}
              setSelected={setSelected}
            />
            {/* {openSort && (
              <div className="fixed animate-in slide-in-from-bottom-5 fade-in-20 inset-0 z-0 w-full">
                <ul className="absolute bottom-0 bg-white border-b border-zinc-200 shadaw-xl grid w-full gap-1 pb-20 px-20 pt-8">
                  <li>
                    <Button
                      variant={"link"}
                      className="flex items-center w-full font-semibold  text-lg"
                    >
                      link1
                    </Button>
                  </li>
                  <li className="my-1 h-px w-full bg-gray-300" />
                  <li>
                    <Button
                      variant={"link"}
                      className="flex items-center w-full font-semibold text-lg p-0 m-0 "
                    >
                      link
                    </Button>
                  </li>
                </ul>
              </div>
            )}
            {openFilter && (
              <div className=" flex flex-row fixed bg-white animate-in slide-in-from-bottom-5 fade-in-20 inset-0 z-0 w-full">
                <div className=" w-[35%] bg-slate-200 border-none">
                  <ul className=" shadaw-xl flex flex-col justify-center items-center w-full gap-1 pt-20">
                    {filter.map((ele) => (
                      <>
                        <li className="w-full m-0 p-0">
                          <Button
                            variant={"link"}
                            className={cn(
                              "flex items-center w-full font-semibold text-lg focus:no-underline focus:bg-white rounded-none h-14",
                              {
                                " bg-white": mobileFilter === ele.type,
                              }
                            )}
                            onClick={() => setMobileFilter(ele.type)}
                          >
                            {ele.type}
                          </Button>
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
                <div className="w-[63%] border-none">
                  <div className="h-full pt-20">
                    {mobileFilter === filterOptions.AUTHOR ? (
                      <MobileFilter
                        filter={filter}
                        setFilter={setFilter}
                        filterName={filterOptions.AUTHOR}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    ) : mobileFilter === filterOptions.CATEGORY ? (
                      <MobileFilter
                        filter={filter}
                        setFilter={setFilter}
                        filterName={filterOptions.CATEGORY}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    ) : mobileFilter === filterOptions.LANGUAGE ? (
                      <MobileFilter
                        filter={filter}
                        setFilter={setFilter}
                        filterName={filterOptions.LANGUAGE}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    ) : (
                      <div> NO filter Selected</div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="lg:hidden h-16 w-full bg-white sticky bottom-0 flex flex-row justify-between items-center border-solid border-t-2 text-slate-400">
              <Button
                className="bg-transparent text-black w-[50%] h-full hover:bg-white rounded-none"
                onClick={() => {
                  setOpenFilter((old) => !old);
                  setOpenSort(false);
                }}
              >
                <Filter />
                filter
              </Button>
              <div className="p-0 m-0 text-[3rem]  text-center  text-slate-400">
                |
              </div>
              <Button
                className="bg-transparent text-black w-[50%] h-full hover:bg-white rounded-none"
                onClick={() => {
                  setOpenSort((old) => !old);
                  setOpenFilter(false);
                }}
              >
                <ArrowUpWideNarrow />
                sort
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
