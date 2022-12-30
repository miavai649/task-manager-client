import { Button, Card, Label, Spinner, Textarea, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import TimePicker from 'react-time-picker';

const UpdateMyTask = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [value, onChange] = useState('10:00');
    const router = useParams()
    const { id } = router;
    const [task, setTask] = useState([])
    const navigate = useNavigate()
    const [spinner, setSpinner] = useState(false)
    const [loading, setLoading] = useState(true)
    // console.log(router)

    useEffect(() => {
        fetch(`https://task-manager-server-ruddy.vercel.app/update/${id}`)
        .then(res => res.json())
            .then(data => {
                setTask(data[0])
                setLoading(false)
        })
    },[id])

    // console.log(task)

    const updateTask = (e) => {
        setSpinner(true)
        e.preventDefault()
        const form = e.target
        const updatedTask = {
            title: form.title.value,
            details: form.details.value,
            date: form.date.value,
            time: value
        }

        fetch(`https://task-manager-server-ruddy.vercel.app/mytask/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        })
        .then(res => res.json())
            .then(data => {
            console.log(data)
            navigate('/mytask')
            setSpinner(false)
            toast.success('Task updated successfully')
        })

    }

    return (
        <div className="max-w-xl container mx-auto my-14">
            <h2 className="text-5xl text-center my-7">Update Task</h2>
            <div>
        {loading && (
          <div className="text-center my-8">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        )}
      </div>
      <Card>
        <form onSubmit={updateTask} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text1" value="Title" />
            </div>
            <TextInput
              id="text1"
              type="text"
              name="title"
              defaultValue={task?.title}
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
              defaultValue={task?.details}
              name='details'
              rows={2}
            />
          </div>
          <div className="flex justify-between">
            <div><DatePicker name="date" defaultValue={task?.date} selected={startDate} dateFormat="PP" onChange={(date) => setStartDate(date)} /></div>
            <div><TimePicker onChange={onChange} value={value} /></div>
          </div>
          <div className="w-full">
            {spinner ? (
              <Button className="w-full">
                <div>
                  <Spinner size="sm" light={true} />
                </div>
                Loading ...
              </Button>
            ) : (
              <Button className="w-full" type="submit">
                Update
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
    );
};

export default UpdateMyTask;