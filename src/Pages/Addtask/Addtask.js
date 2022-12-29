import {
    Button,
    Card,
    FileInput,
    Label,
    Textarea,
    TextInput
} from "flowbite-react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';

const Addtask = () => {

    const imgHostKey = process.env.REACT_APP_imagebb_key;
    const [startDate, setStartDate] = useState(new Date())
    const [value, onChange] = useState('10:00');

    // console.log(startDate)

    const handleAddTask = e => {
        e.preventDefault()
        const form = e.target;
        const title = form.title.value
        const image = form.image.files[0]
        const details = form.details.value
        const date = startDate
        const time = value

        const formData = new FormData() 
   formData.append('image', image)

    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => console.log(data.data.url))
        .catch(err => console.log(err))
        
        console.log(title, details, date, time, image)
    }

  return (
    <div className="max-w-xl container mx-auto my-14">
      <Card>
        <form onSubmit={handleAddTask} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text1" value="Title" />
            </div>
            <TextInput
              id="text1"
              type="text"
              name="title"
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
              name='details'
              rows={2}
            />
          </div>
          <div id="fileUpload">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Photo" />
            </div>
            <FileInput name="image" id="file" />
          </div>
          <div className="flex justify-between">
            <div><DatePicker selected={startDate} dateFormat="PP" onChange={(date) => setStartDate(date)} /></div>
            <div><TimePicker onChange={onChange} value={value} /></div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
};

export default Addtask;
