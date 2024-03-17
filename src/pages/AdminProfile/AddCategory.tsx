import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import AdminServices, { CategoryResponse } from "@/services/AdminServices";

const AddCategory = () => {
  const queryClient = useQueryClient();
  const [newCategory, setNewCategory] = React.useState("");
  const [categories, setcategories] = useState<CategoryResponse>([]);
  const {
    data: Categorydata,
    status,
    error,
  } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => AdminServices.getCategory(),
  });

  useEffect(() => {
    if (status === "success") setcategories(Categorydata);
  }, [Categorydata]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return <div>An error has occoured {JSON.stringify(error)}</div>;
  console.log(Categorydata);

  // const [categories, setcategories] = useState(Categorydata?.map((category) => category.category) || []);
  // categories = Categorydata?.map((category) => category.category) || [];
  console.log(categories);

  const handleAddCategory = () => {
    try {
      AdminServices.addCategory(newCategory).then((res) => {
        setNewCategory("");
        // setcategories(Categorydata?.map((category) => category.category) || []);
        console.log(res);
        queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      });
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = (id: number) => {
    try {
      AdminServices.deleteCategory(id).then((res) => {
        console.log(res);
        queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      });
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Add Category</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category name"
              className="mb-2 w-full p-2 border rounded"
            />
            <div className="flex justify-center">
              {" "}
              {/* Flex container */}
              <Button className="" onClick={handleAddCategory}>
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {categories.map((category, index) => (
        <Card
          key={index}
          className="w-48 h-48 rounded-lg bg-gray-100 flex flex-col justify-center items-center"
        >
          <CardContent>
            <h2>{category.category}</h2>

            <Button
              onClick={() => {
                handleDeleteCategory(category.id);
              }}
              className="mb-2"
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AddCategory;
