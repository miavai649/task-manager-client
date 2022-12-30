import { Spinner } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import MytaskCard from "./MytaskCard";

const Mytask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    fetch(`https://task-manager-server-ruddy.vercel.app/mytask/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  }, [user?.email, refresh]);

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
            const remaining = tasks.filter((task) => task._id !== id);
            setTasks(remaining);
          }
        });
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updatetask/${id}`);
  };

    const completedTask = (id) => {
        const update = {
            status: 'completed'
        }
        fetch(`https://task-manager-server-ruddy.vercel.app/complete/${id}`, {
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
      <h2 className="text-5xl text-center my-7">My Task</h2>
      <div>
        {loading && (
          <div className="text-center my-8">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        )}
      </div>
      <div className="max-w-xl container mx-auto">
        {/* {tasks.map((task) => (
          <MytaskCard
            handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                completedTask={completedTask}
            task={task}
            key={task._id}
          ></MytaskCard>
        ))} */}
        {
          tasks.filter(data => data?.status !== 'completed').map(task => (
            <MytaskCard
            handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                completedTask={completedTask}
            task={task}
            key={task._id}
          ></MytaskCard>
          ))
        }
      </div>
    </div>
  );
};

export default Mytask;
