import {Slide, toast} from "react-toastify";
import {AlertTriangle, Check, X} from "react-feather";
import React, {Fragment} from "react";
import "toastr/build/toastr.min.css"
import 'react-toastify/dist/ReactToastify.css';

const ToastContent = ({title, body, assets}) => (
    <Fragment>
        <div className='toastify-header w-auto'>
            <div className='title-wrapper'>
                {/*<image size='sm' className={assets.color} icon={assets.icon}/>*/}
                <h6 className='toast-title fw-bolder custom-font-toast'>{title}</h6>
            </div>
        </div>
        {body && (
            <div className='toastify-body  w-100'>
                <span role='img' aria-label='toast-text'>{body}</span>
            </div>
        )}
    </Fragment>
)
export const dismissPreviousToastMsgHandler = () => {
    toast.dismiss();
}
export const notifyMessage = (msg, type, duration) => {
    dismissPreviousToastMsgHandler();
    let msgType = "info"
    let assets = {
        color: "bg-info",
        icon: <AlertTriangle size={15}/>
    }

    if (type === 2) {
        msgType = "info"
        assets = {
            color: "bg-info",
            icon: <AlertTriangle size={15}/>
        }
    } else if (type === 0) {
        msgType = "error"
        assets = {
            color: "bg-danger",
            icon: <X size={15}/>
        }
    } else if (type === 1) {
        msgType = "success"
        assets = {
            color: "bg-success",
            icon: <Check size={15}/>
        }
    }

    toast[msgType](
        <ToastContent title={msgType} body={msg} assets={assets}/>,
        {
            con: false,
            transition: Slide,
            hideProgressBar: false,
            autoClose: 5000,
            position: "top-right"
        }
    )

};