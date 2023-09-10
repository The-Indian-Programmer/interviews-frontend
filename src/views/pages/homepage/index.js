import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleCreateTask, handleDeleteTask, handleGetAllTasks, handleUpdateTask, handleUpdateTaskStatus } from "./store/index";
import DataTable, { createTheme } from 'react-data-table-component';
import '../../../styles/react-data-table.css';
import moment from "moment";
import AddOrEditTask from "./popup/AddOrEditTask.js";
import ToastContent from "../../../common-components/Toast";
import { Slide, toast } from "react-toastify";
import { isEmpty } from "../../../configs/Funtions";
import ConfirmationModal from "../../../common-components/ConfirmationModal";
const HomePage = () => {
  // Redux vars
  const userData = useSelector((state) => state.auth.userData);
  const {
    currentPage,
    perPageItem,
    searchTerm,
    selectedTask,
    allTasks,
    filter,
    order,
    orderBy,
  } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();



  /** State Vars */
  const [showAddTask, setShowAddTasks] = React.useState(false);
  const [editTaskInfo, setEditTaskInfo] = React.useState(null);
  const [deleteTaskInfo, setDeleteTaskInfo] = React.useState(null);
  const [markAsCompleteTaskInfo, setMarkAsCompleteTaskInfo] = React.useState(null);

  /* Function to get all task lists */
  const getAllTasks = async () => {
    const bodyData = {
      page: currentPage,
      perPageItem,
      searchTerm,
      filter,
      order: order,
      orderBy: orderBy,
    };
    const response = await dispatch(handleGetAllTasks(bodyData));

    if (!response.payload.status) {
      console.log("Error in getting all tasks");
    }
  };

  /* Function to get data on mount */
  React.useEffect(() => {
    getAllTasks();
  }, []);

  // Function to handle on page changes
  const handlePagination = (page) => {
    const bodyData = {
      page: page,
      perPageItem,
      searchTerm,
      filter,
      order: order,
      orderBy: orderBy,
    };
    dispatch(handleGetAllTasks(bodyData));
  };

  // function to handle data on rowsperpage changes
  const handleRowsPerPageChange = (row) => {
    const bodyData = {
      page: currentPage,
      perPageItem: row,
      searchTerm,
      filter,
      order: order,
      orderBy: orderBy,
    };
    dispatch(handleGetAllTasks(bodyData));
  };

  // function to handle sort
  const handleSort = (column, sortDirection) => {
    const bodyData = {
      page: currentPage,
      perPageItem,
      searchTerm,
      filter,
      order: sortDirection,
      orderBy: column.selector,
    };
    dispatch(handleGetAllTasks(bodyData));
  };


  /* Function to get priority tag */
  const PriorityTag = ({ priority }) => {
    switch (priority) {
      case "low":
        return <span className="px-2 py-1 bg-green-500 text-white rounded-md">Low</span>;
      case "medium":
        return <span className="px-2 py-1 bg-yellow-500 text-white rounded-md">Medium</span>;
      case "high":
        return <span className="px-2 py-1 bg-red-500 text-white rounded-md">High</span>;
      default:
        return <span className="px-2 py-1 bg-green-500 text-white rounded-md">Low</span>;
    }
  }

  /* Function to get status tag */
  const StatusTag = ({ status }) => {
    switch (status) {
      case "completed":
        return <span className="px-2 py-1 bg-green-500 text-white rounded-md">Completed</span>;
      case "deleted":
        return <span className="px-2 py-1 bg-red-500 text-white rounded-md">Deleted</span>;
      default:
        return <span className="px-2 py-1 bg-yellow-500 text-white rounded-md">Pending</span>;
    }
  }



  const NoDataComponent = () => {
    return (
      <div className="text-center h-96 flex items-center justify-between">
        <h4 className="text-cstm">No Tasks found</h4>
      </div>
    );
  }

  const customStyles = {
    headRow: {
      style: {
        borderTop: "1px solid #e0e0e0",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#c2c0bc",
        fontFamily: "Roboto",
      }
    },
    headCells: {
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "center",
      }
    },
    cells: {
      style: {
        fontSize: "16px",
        textAlign: "center",
        color: '#000000',
        borderBottom: "1px solid #e0e0e0",
      }
    },
    pagination: {
      style: {
        borderTop: "1px solid #e0e0e0",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#c2c0bc",
        fontFamily: "Roboto",
        fontSize: "16px",
        width: "100%",
      }
    },
    table: {
      style: {
        minHeight: "500px",
        maxWidth: "100%",
      }
    }
  }

  const handleClose = () => {
    setShowAddTasks(false);
    setEditTaskInfo(null);
  }

  const handleTaskEdit = (row) => {
    setShowAddTasks(true);
    setEditTaskInfo(row);
  }


  /* Function to handle task edit or created */
  const handleTaskSubmit = async (data) => {
    let bodyData = data
    if ((!isEmpty(editTaskInfo))) {
      bodyData = { ...bodyData, taskID: editTaskInfo.taskId }
    }

    const apiRes = !isEmpty(editTaskInfo) ? await dispatch(handleUpdateTask(bodyData)) : await dispatch(handleCreateTask(bodyData));


    if (apiRes.payload.status) {
      toast.success(
        <ToastContent status="Success" message={apiRes.payload.message} />,
        {
          transition: Slide,
          closeButton: true,
          autoClose: 2000,
        }
      );
      setShowAddTasks(false);
      setEditTaskInfo(null);
      getAllTasks();
    }
  }

  /* Function to handle taks detet */
  const handleDelete = async () => {
    const bodyData = {
      taskID: deleteTaskInfo.taskId
    }
    const apiRes = await dispatch(handleDeleteTask(bodyData));

    if (apiRes.payload.status) {
      toast.success(
        <ToastContent status="Success" message={apiRes.payload.message} />,
        {
          transition: Slide,
          closeButton: true,
          autoClose: 2000,
        }
      );
      setDeleteTaskInfo(null);
      getAllTasks();
    }
  }
  /* Function to handle mark as complete */
  const handleMarkAsComplete = async () => {
    const bodyData = {
      taskID: markAsCompleteTaskInfo.taskId,
      status: 'completed'
    }
    const apiRes = await dispatch(handleUpdateTaskStatus(bodyData));

    if (apiRes.payload.status) {
      toast.success(
        <ToastContent status="Success" message={apiRes.payload.message} />,
        {
          transition: Slide,
          closeButton: true,
          autoClose: 2000,
        }
      );
      setMarkAsCompleteTaskInfo(null);
      getAllTasks();
    }
  }

  /* Function to handle priority change */
  const handlePriorityChange = (e) => {
    const value = e.target.value;
    const bodyData = {
      page: currentPage,
      perPageItem,
      searchTerm,
      filter: { ...filter, priority: value },
      order: order,
      orderBy: orderBy,
    };
    dispatch(handleGetAllTasks(bodyData));
  }


  /* Function to handle status change */
  const handleStatusChange = (e) => {
    const value = e.target.value;
    const bodyData = {
      page: currentPage,
      perPageItem,
      searchTerm,
      filter: { ...filter, status: value },
      order: order,
      orderBy: orderBy,
    };
    dispatch(handleGetAllTasks(bodyData));
  }

  const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: true,
      left: true,
      sortField: "title",
      allowOverflow: false,
      cell: (row) => <span title={row.title}>{row.title.length > 50 ? row.title.substring(0, 55) + '...' : row.title}</span>,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
      left: true,
      sortField: "description",
      allowOverflow: false,
      cell: (row) => <span title={row.description}>{row.description.length > 50 ? row.description.substring(0, 55) + '...' : row.title}</span>,

    },
    {
      name: "Due Date",
      selector: "dueDate",
      sortable: true,
      left: true,
      sortField: "dueDate",
      allowOverflow: false,
      cell: (row) => <span>{row.dueDate ? moment(row.dueDate, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY') : ''}</span>,
    },
    {
      name: "Priority",
      selector: "priority",
      sortable: true,
      left: true,
      sortField: "priority",
      allowOverflow: false,
      cell: (row) => <PriorityTag priority={row.priority} />,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      left: true,
      sortField: "status",
      allowOverflow: false,
      cell: (row) => <StatusTag status={row.status} />,
    },
    {
      name: "Actions",
      selector: "",
      sortable: false,
      center: true,
      allowOverflow: false,
      cell: (row) => (
        <div className="d-flex align-items-center w-100 justify-content-center">
          {row.status != 'completed' && <button title="Mark as complete" onClick={() => setMarkAsCompleteTaskInfo(row)}>
            <i className="fas fa-check"></i>
          </button>}
          <button title="Edit" onClick={() => handleTaskEdit(row)}>
            <i className="fas fa-edit ml-3 text-blue-600"></i>
          </button>
          <button title="Delete" onClick={() => setDeleteTaskInfo(row)}>
            <i className="fas fa-trash ml-3 text-red-600"></i>
          </button>
        </div>
      ),
    },
  ];




  return (
    <React.Fragment>
      <div className="homepage mt-28 w-full w-100 h-full container mx-auto">
        <div className="px-0 h-full">
          <div className="flex items-center w-100 justify-between mt-5">
            <h5 className="text-xl font-bold ">Task List</h5>
            <button onClick={() => setShowAddTasks(true)} className="border-4 border-gray-600 px-3 py-2 rounded-xl">
              Add New
              <i className="fas fa-plus ml-3"></i>
            </button>
          </div>

          {/* Filter */}
          <div className="container mt-10 flex items-center justify-around">
            <div class="relative flex items-center justify-start">
              <label className="mr-3 font-semibold">Priority : </label>
              <select class="block appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200" value={filter.priority} onChange={handlePriorityChange}>
                <option value=''>All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div class="relative flex items-center justify-start">
              <label className="mr-3 font-semibold">Status : </label>
              <select class="block appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200" value={filter.status} onChange={handleStatusChange}>
                <option value=''>All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <DataTable
            className="table table-responsive data-table-wrapper filter-tablecss border-2 border-gray-400 mt-5 rounded-lg min-h-full"
            columns={columns}
            data={allTasks.data}
            persistTableHead={true}
            noHeader={true}
            responsive={true}
            keyField="taskID"
            sortIcon={<i className="fas fa-arrow-down ml-3"></i>}
            pagination={true}
            sortServer={true}
            paginationServer={true}
            paginationTotalRows={allTasks.count}
            onSort={handleSort}
            onChangePage={handlePagination}
            onChangeRowsPerPage={handleRowsPerPageChange}
            paginationPerPage={perPageItem}
            noDataComponent={<NoDataComponent />}
            // progressPending={this.state.isLoading}
            customStyles={customStyles}
            progressComponent={
              <span className="text-center text-cstm">Loading....</span>
            }
          />
        </div>
      </div>
      {showAddTask && <AddOrEditTask data={editTaskInfo} handleSubmit={handleTaskSubmit} handleCancel={handleClose} />}

      {deleteTaskInfo && <ConfirmationModal isOpen={!isEmpty(deleteTaskInfo)} title='Sure, you want to delete it ?' onSubmit={handleDelete} onCancel={() => setDeleteTaskInfo(null)} buttonText='Delete' />}
      {markAsCompleteTaskInfo && <ConfirmationModal isOpen={!isEmpty(markAsCompleteTaskInfo)} title='Sure, you want to mark it completed ?' onSubmit={handleMarkAsComplete} onCancel={() => setMarkAsCompleteTaskInfo(null)} buttonText='Yes' />}
    </React.Fragment>
  );
};

export default HomePage;
