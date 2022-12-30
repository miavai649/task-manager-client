import { Button, Card, Spinner } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaCalendarCheck, FaClock, FaRegCommentDots, FaTrashAlt, FaWindowClose } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";

const CompletedTask = () => {
  const { user } = useContext(AuthContext);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    fetch(`https://task-manager-server-ruddy.vercel.app/mytask/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCompletedTasks(data);
        setLoading(false);
      });
  }, [refresh, user?.email]);

  const handleDelete = (id) => {
    const proceed = window.confirm("Do you want to delete this review");
    if (proceed) {
      fetch(`https://task-manager-server-ruddy.vercel.app/mytask/${id}`, {
        method: "DELETE"
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            toast.error("Task deleted");
            const remaining = completedTasks.filter((task) => task._id !== id);
            setCompletedTasks(remaining);
          }
        });
    }
  };

  const notCompleted = (id) => {
    const update = {
        status: 'not completed'
    }
    fetch(`https://task-manager-server-ruddy.vercel.app/notcomplete/${id}`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(update)
    })
    .then(res => res.json())
        .then(data => {
            console.log(data)
            setRefresh(!refresh)
        toast.success('Task Completed')

    })
}
    
  return (
    <div>
      <h2 className="text-5xl text-center my-7">Completed Task</h2>
      <div>
        {loading && (
          <div className="text-center my-8">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        )}
      </div>
      <div className="max-w-xl container mx-auto">
        {
                  completedTasks.filter(data => data?.status === 'completed').map(task => (
                    <div key={task._id} className="my-5">
                    <Card
                      horizontal={true}
                      imgSrc={task?.img}
                    >
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {task?.title}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                       {task?.details}
                      </p>
                      <div className='flex justify-between'>
                          <small><FaCalendarCheck></FaCalendarCheck>{task?.date}</small>
                          <small><FaClock></FaClock>{task?.time}</small>
                      </div>
                      <div className='flex gap-3'>
                      <Button onClick={() => handleDelete(task?._id)} title='Delete' size="xs">
                        <FaTrashAlt></FaTrashAlt>
                      </Button>
                      <Button onClick={() => notCompleted(task?._id)} title='Not Completed' size="xs">
                        <FaWindowClose></FaWindowClose>
                      </Button>
                      <Button title='Comments' size="xs">
                        <FaRegCommentDots></FaRegCommentDots>
                      </Button>
                      </div>
                    </Card>
                  </div>
            ))
        }
      </div>
    </div>
  );
};

export default CompletedTask;
