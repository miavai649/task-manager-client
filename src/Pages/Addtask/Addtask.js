import {
  Button,
  Card,
  FileInput,
  Label,
  Spinner,
  Textarea,
  TextInput
} from "flowbite-react";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import TimePicker from 'react-time-picker';
import { AuthContext } from "../../Context/AuthContext";

const Addtask = () => {

    const imgHostKey = process.env.REACT_APP_imagebb_key;
    const [startDate, setStartDate] = useState(new Date())
    const [value, onChange] = useState('10:00');
  const { user } = useContext(AuthContext);
  const [spiner, setSpiner] = useState(false)

    // console.log(startDate)

  const handleAddTask = e => {
      setSpiner(true)
        e.preventDefault()
        const form = e.target;
        const image = form.image.files[0]

        const formData = new FormData() 
        formData.append('image', image)

    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
          .then(imgData => {
            const task = {
              img: imgData.data.url,
              title: form.title.value,
              details: form.details.value,
              email: user?.email,
              date: form.date.value,
              time: value
            }
            fetch('https://task-manager-server-ruddy.vercel.app/task', {
              method: 'POST',
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(task)
            })
            .then(res => res.json())
              .then(data => {
                console.log(data)
                setSpiner(false)
              toast.success('Task added successfully')
              form.reset()
            })
        })
        .catch(err => console.log(err))
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
            <div><DatePicker name="date" selected={startDate} dateFormat="PP" onChange={(date) => setStartDate(date)} /></div>
            <div><TimePicker onChange={onChange} value={value} /></div>
          </div>
          <div className="w-full">
            {spiner ? (
              <Button className="w-full">
                <div>
                  <Spinner size="sm" light={true} />
                </div>
                Loading ...
              </Button>
            ) : (
              <Button className="w-full" type="submit">
                Add task
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Addtask;
