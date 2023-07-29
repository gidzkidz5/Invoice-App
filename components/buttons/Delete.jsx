import styles from './Delete.module.css'
export default function Delete(){
    return(
        <button className={`${styles.delete} ff-sanserif`}>
        <span>Delete</span></button>
    )
}