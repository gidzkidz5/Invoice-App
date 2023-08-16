import Delete from "../buttons/Delete";
import { Cancel } from "../buttons/Discard";
import styles from "./ConfirmDelete.module.css"

export default function ConfirmDelete(props) {
    return (
        <>
            <div className={`${styles.main} ff-sanserif`}>
                <h1 className="fs-M black">Confirm Deletion</h1>
                <p className="fs-body">Are you sure you want to delete invoice #XM9141? This action cannot be undone.</p>
                <div className={`${styles.btnContainer}`}>
                    <Cancel
                        Click={props.cancelClick }
                    />
                    <Delete
                        deleteClick={props.deleteClick}
                    />
                </div>
            </div>
        </>
    )
}