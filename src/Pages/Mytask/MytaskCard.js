import { Button, Card } from 'flowbite-react';
import React from 'react';
import { FaArrowAltCircleUp, FaCalendarCheck, FaCheck, FaClock, FaTrashAlt } from 'react-icons/fa';

const MytaskCard = ({task, handleDelete, handleUpdate, completedTask}) => {
    const {title, details, img, time, _id, date} = task
    return (
        <div className="my-5">
  <Card
    horizontal={true}
    imgSrc={img}
  >
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {title}
    </h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">
     {details}
    </p>
    <div className='flex justify-between'>
        <small><FaCalendarCheck></FaCalendarCheck>{date}</small>
        <small><FaClock></FaClock>{time}</small>
    </div>
    <div className='flex gap-3'>
    <Button onClick={() => handleUpdate(_id)} title='Update' size="xs">
      <FaArrowAltCircleUp></FaArrowAltCircleUp>
    </Button>
    <Button title='Delete' onClick={() => handleDelete(_id)} size="xs">
      <FaTrashAlt></FaTrashAlt>
    </Button>
    <Button onClick={() => completedTask(_id)} title='Complete' size="xs">
      <FaCheck></FaCheck>
    </Button>
    </div>
  </Card>
</div>
    );
};

export default MytaskCard;