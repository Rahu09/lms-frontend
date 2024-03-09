import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BookCard() {
  return (
    <Card className="inline-block mb-8 w-[45vw] max-w-[24rem] lg:w-[24%]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div></div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
