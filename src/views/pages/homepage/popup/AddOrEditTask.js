import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup';
import { VALIDATION_MESSAGES } from '../../../../configs/Contants';
import moment from 'moment';
import { isEmpty } from '../../../../configs/Funtions';
const AddOrEditTask = ({ show, handleCancel, handleSubmit, data }) => {

    /* Formik */
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: (!isEmpty(data) && !isEmpty(data.title)) ? data.title : '',
            description: (!isEmpty(data) && !isEmpty(data.description)) ? data.description : '',
            dueDate: (!isEmpty(data) && !isEmpty(data.description)) ? moment(data.dueDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') : '',
            priority: (!isEmpty(data) && !isEmpty(data.priority)) ? data.priority : 'low',
        },
        validationSchema: Yup.object({
            title: Yup.string().max(100, 'Must be 100 characters or less').min(5, 'Must be 5 characters or more').required(VALIDATION_MESSAGES.required),
            description: Yup.string().max(500, 'Must be 500 characters or less').min(5, 'Must be 5 characters or more').required(VALIDATION_MESSAGES.required),
            dueDate: Yup.date().min(moment().subtract(1, 'day'), 'Due Date cannot be earlier than today').required(VALIDATION_MESSAGES.required),
            priority: Yup.string().required(VALIDATION_MESSAGES.required),
        }),
        onSubmit: values => {
            handleSubmit(values);
        }
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="modal-container bg-white w-full sm:w-full md:w-2/3 lg:w-2/3 p-6 rounded-lg shadow-lg z-50">
                <h2 className="text-xl font-semibold mb-4">{
                    !isEmpty(data) ? 'Edit Task' : 'Add Task'
                }</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label for="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="title" name="title" className={`w-full mt-1 p-2 border-2 rounded-md ${(formik.errors.title && formik.touched.title) ? 'border-red-500' : 'border-gray-300'}`} value={formik.values.title} onChange={formik.handleChange}/>
                        {formik.errors.title && formik.touched.title && <p className="text-red-500 text-xs italic">{formik.errors.title}</p>}
                    </div>

                    <div className="mb-4">
                        <label for="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" name="description" rows="3" className={`w-full mt-1 p-2 border-2 rounded-md ${(formik.errors.description && formik.touched.description) ? 'border-red-500' : 'border-gray-300'}`} value={formik.values.description} onChange={formik.handleChange}></textarea>
                        {formik.errors.description && formik.touched.description && <p className="text-red-500 text-xs italic">{formik.errors.description}</p>}
                    </div>

                    <div className="mb-4">
                        <label for="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                        <input type="date" id="dueDate" min={moment()} name="dueDate" className={`w-full mt-1 p-2 border-2 rounded-md ${(formik.errors.dueDate && formik.touched.dueDate) ? 'border-red-500' : 'border-gray-300'}`} value={formik.values.dueDate} onChange={formik.handleChange}/>
                        {formik.errors.dueDate && formik.touched.dueDate && <p className="text-red-500 text-xs italic">{formik.errors.dueDate}</p>}
                    </div>

                    <div className="mb-4">
                        <label for="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                        <select id="priority" name="priority" className="w-full mt-1 p-2 border border-gray-300 rounded-md" value={formik.values.priority} onChange={formik.handleChange}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        {formik.errors.priority && formik.touched.priority && <p className="text-red-500 text-xs italic">{formik.errors.priority}</p>}
                    </div>


                    <div className="text-right">
                        
                        <button onClick={handleCancel} type="button" className="px-4 py-2  bg-gray-400 text-white rounded hover:bg-gray-500" onclick="closeModal()">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 ml-2 text-white rounded hover:bg-blue-600">
                            {
                                !isEmpty(data) ? 'Update' : 'Create'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>)


}
export default AddOrEditTask
