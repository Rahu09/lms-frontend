import { Hero } from "./Hero";
import { CategoryCarosel } from "./CategoryCarosel";

export const Landing = () => {
  return (
    <div className=" bg-red-50 min-h-[92vh] flex flex-col justify-between items-center gap-20 lg:gap-32">
      <Hero />
      <div className="  w-full flex flex-col gap-14">
        {Array.from({ length: 4 }).map((_, index) => (
          <CategoryCarosel key={index} ind={index} />
        ))}
      </div>
    </div>
  );
};
