import { useState} from 'react';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';


interface DeleteDashboard{
    metricId: string;
    openCloseModal: Function;
    openModal: boolean;
}

const DeleteDashboardItem: React.FC<DeleteDashboard> = ({metricId, openCloseModal, openModal}) => {
    const { deleteMetrics } = useActions();  

    const toggleModal = () => {
        if(!openModal){
           return openCloseModal(true)
        } else {
            return openCloseModal(false)
        }
    }

    const deleteToggle = (metricId: any) => {
        openCloseModal(false)
        deleteMetrics(metricId)
    }

    const modalStyle = openModal ? 'block' : 'none';

    console.log(openModal)
    return(
        <div>
        {createPortal(
            <div onClick={(e) => e.stopPropagation()} className="modal" style={{display: `${modalStyle}`, backgroundColor: 'rgba(128,128,128,0.75)' }}>
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Dashboard Item</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleModal}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this dashboard?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={() => {deleteToggle(metricId)}}>Save changes</button>
                        <button className="btn btn-secondary" onClick={toggleModal}>Close</button>
                    </div>
                    </div>
                </div>
            </div>,
            document.body
        )}
        </div>
    )
}

export default DeleteDashboardItem;