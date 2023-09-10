import React from 'react'
import { useSelector } from 'react-redux'

const DashboardLayout = () => {

    const taskCount = useSelector(state => state.tasks.taskCount);


    const formatNumber = (number) => {
        if (number) {

            if (number < 10) {
                return "0" + number;
            } else {
                return number;
            }
        } else {
            return "00";
        }
    }
    return (
        <div className="container mx-auto mt-2">
            <div className="grid grid-cols-12 gap-4">
                <div className="sm:mx-1 xs:mx-1 cursor-pointer  bg-blue-500 text-white p-4 rounded-lg shadow-md col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4 border-4 border-blue-500">
                    <div className="text-4xl font-bold ">{formatNumber(taskCount.total)}</div>
                    <div className="mt-4 text-lg font-semibold">All</div>
                </div>

                <div className="sm:mx-1 xs:mx-1 cursor-pointer  bg-red-500 text-white p-4 rounded-lg shadow-md col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4 border-4 border-red-500">
                    <div className="text-4xl font-bold ">{formatNumber(taskCount.pending)}</div>
                    <div className="mt-4 text-lg font-semibold">Pending</div>
                </div>

                <div className="sm:mx-1 xs:mx-1 cursor-pointer bg-green-500 text-white p-4 rounded-lg shadow-md col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4 border-4 border-green-500">
                    <div className="text-4xl font-bold ">{formatNumber(taskCount.completed)}</div>
                    <div className="mt-4 text-lg font-semibold">Completed</div>
                </div>


            </div>
        </div>

    )
}

export default DashboardLayout