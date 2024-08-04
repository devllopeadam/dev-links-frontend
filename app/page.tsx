import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

export default function Home() {
  return (
    <>
      <Input
        className="w-[500px] my-6 mx-auto focus:shadow-md focus:shadow-blue-200"
        placeholder="Enter your email"
      />
      <Button>Adam Jeniah </Button>
    </>
  );
}
