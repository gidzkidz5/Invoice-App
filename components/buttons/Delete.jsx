import styles from './Delete.module.css'
export default function Delete(props){
    return(
        <button className={`${styles.delete} ff-sanserif`} onClick={props.deleteClick}>
        <span>Delete</span></button>
    )
}