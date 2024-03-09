import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

type FilterBoxProps = {
  filter: string[];
  filterName: string;
  selected: {
    filter: string;
    state: boolean[];
  }[];
  setSelected: React.Dispatch<
    React.SetStateAction<
      {
        filter: string;
        state: boolean[];
      }[]
    >
  >;
};

export const FilterBox = ({
  filter,
  filterName,
  selected,
  setSelected,
}: FilterBoxProps) => {
  let filterIndex = -1;
  for (let i = 0; i < selected.length; i++) {
    const element = selected[i];
    if (element.filter === filterName) {
      filterIndex = i;
      break;
    }
  }

  useEffect(() => {
    console.log("selected changed");
  }, [selected]);

  if (filterIndex === undefined) return <div>filter index not found</div>;

  const handleChecked = (ind: number) => {
    const temp = [...selected];
    temp[filterIndex] = {
      ...temp[filterIndex],
      state: [...temp[filterIndex].state],
    };
    temp[filterIndex].state[ind] = !temp[filterIndex].state[ind];
    setSelected(temp);
  };

  return (
    <div className="mt-2 mr-2">
      <p className=" text-md text-gray-600 font-bold ">PRODUCTS</p>
      <div className="flex flex-row gap-2 mt-4">
        <Input
          type="email"
          placeholder="Type to Add Filter"
          className=" bg-indigo-50 border-gray-300"
        />
        <Button>Add</Button>
      </div>
      <div className="mt-5">
        {filter.map((ele, ind) => (
          <div key={ind} className=" flex space-x-2 mt-3">
            <Checkbox
              id={ind.toString()}
              checked={selected[filterIndex].state[ind]}
              onCheckedChange={() => handleChecked(ind)}
            />
            <label
              htmlFor="terms1"
              className="text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {ele}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
