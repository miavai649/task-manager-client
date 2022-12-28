import {
    Button,
    Card,
    FileInput,
    Label,
    Textarea,
    TextInput
} from "flowbite-react";
import React from "react";

const Addtask = () => {
  return (
    <div className="max-w-xl container mx-auto my-14">
      <Card>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text1" value="Title" />
            </div>
            <TextInput
              id="text1"
              type="text"
              placeholder="Task title"
              required={true}
            />
          </div>
          <div id="textarea">
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Details" />
            </div>
            <Textarea
              id="comment"
              placeholder="Task details..."
              required={true}
              rows={2}
            />
          </div>
          <div id="fileUpload">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Photo" />
            </div>
            <FileInput id="file" />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
};

export default Addtask;
