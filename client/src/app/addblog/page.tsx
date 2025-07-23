import React from "react";

const page = () => {
  return (
    <div>
      <form>
        <label htmlFor="email" className="text-gray-300">
          Title
        </label>
        <Input type="text"></Input>
         <label htmlFor="email" className="text-gray-300">
          Blog
        </label>
        <Textarea name="blog" id=""></Textarea>
      </form>
    </div>
  );
};

export default page;
