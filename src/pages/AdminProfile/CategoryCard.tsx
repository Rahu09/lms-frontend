import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export function CategoryCard() {
  return (
    
    {categories.map((category, index) => (
        <Card
          key={index}
          className="w-48 h-48 rounded-lg bg-gray-100 flex flex-col justify-center items-center"
        >
          <CardContent>
            <h2>{category}</h2>
          </CardContent>
        </Card>
      ))}
  );
}
